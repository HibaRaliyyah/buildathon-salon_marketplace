"use server";

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getDb } from "../lib/mongodb";
import { ObjectId } from "mongodb";

interface ChatMessage {
  role: string;
  text: string;
  timestamp: Date;
}

interface ChatDoc {
  _id?: ObjectId;
  sessionId: string;
  userId: string | null;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const SendMessageSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string(),
  message: z.string().min(1),
  attachment: z.string().optional(),
});

const GetHistorySchema = z.object({
  sessionId: z.string(),
});

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";

async function generateOpenRouterReply(userMessage: string, attachment?: string, history: ChatMessage[] = []): Promise<string> {
  const systemPrompt = `You are GlowAI, a personal beauty assistant for Bengaluru. 
  You help users with beauty recommendations, skin plans, hair styling, and salon bookings in Bengaluru.
  Keep responses concise, helpful, and friendly. 
  IMPORTANT: Do NOT use markdown asterisks like **bold** in your responses. Use plain text.
  IMPORTANT: When recommending a salon, ALWAYS provide a direct booking link using the markdown link format: [Book Now](/salons/salon-id). 
  The ONLY valid salon-ids are: 
  - atelier-rose (Atelier Rose, Indiranagar)
  - luna-artistry (Luna Artistry, Koramangala)
  - gloss-studio (Gloss Studio, Jayanagar)
  - velvet-co (Velvet & Co, Whitefield)
  - the-old-soul (The Old Soul, HSR Layout)
  - maison-bridal (Maison Bridal, Malleshwaram)
  
  Example: "I recommend Luna Artistry for that. [Book Now](/salons/luna-artistry)"
  
  If they upload a photo (image attachment), analyze their face shape, skin tone, or hair based on what is visible, and give tailored advice linking to the appropriate salon above.`;

  const messages: any[] = [
    { role: "system", content: systemPrompt }
  ];

  // Add history (limit to last 5 messages)
  for (const msg of history.slice(-5)) {
    messages.push({
      role: msg.role === "you" ? "user" : "assistant",
      content: msg.text
    });
  }

  // Add current message
  const currentContent: any[] = [{ type: "text", text: userMessage }];
  if (attachment) {
    currentContent.push({
      type: "image_url",
      image_url: { url: attachment }
    });
  }

  messages.push({
    role: "user",
    content: currentContent
  });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: messages
      })
    });

    if (!response.ok) {
      console.error("OpenRouter Error:", await response.text());
      return "I'm having trouble connecting to my AI brain right now. Please try again.";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";
  } catch (err) {
    console.error("OpenRouter Error:", err);
    return "I encountered an error connecting to my AI services.";
  }
}

export const sendChatMessage = createServerFn({ method: "POST" })
  .validator(SendMessageSchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const chats = db.collection<ChatDoc>("chats");

    const existingChat = await chats.findOne({ sessionId: data.sessionId });
    const history = existingChat?.messages ?? [];

    const aiReply = await generateOpenRouterReply(data.message, data.attachment, history);
    const now = new Date();

    const userMsg: ChatMessage = { role: "you", text: data.message, timestamp: now };
    const aiMsg: ChatMessage = { role: "ai", text: aiReply, timestamp: new Date(now.getTime() + 500) };

    await chats.updateOne(
      { sessionId: data.sessionId },
      {
        $push: { messages: { $each: [userMsg, aiMsg] } } as never,
        $set: { userId: data.userId ?? null, updatedAt: now },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true },
    );

    return { userMsg, aiMsg };
  });

export const getChatHistory = createServerFn({ method: "POST" })
  .validator(GetHistorySchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const chats = db.collection<ChatDoc>("chats");

    const doc = await chats.findOne({ sessionId: data.sessionId });
    if (!doc) {
      return [{ role: "ai", text: "Hi, I'm GlowAI. Tell me about your event, mood, or what you'd like to change today.", timestamp: new Date() }];
    }

    return doc.messages ?? [];
  });
