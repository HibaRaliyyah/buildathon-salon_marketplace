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
});

const GetHistorySchema = z.object({
  sessionId: z.string(),
});

function generateAIReply(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes("bridal") || msg.includes("wedding")) {
    return "For your bridal look, I recommend soft curls and nude makeup that complements Bengaluru's warm lighting. Maison Bridal in Malleshwaram and Atelier Rose in Indiranagar have excellent bridal packages starting from ₹8,000. Shall I check their availability?";
  }
  if (msg.includes("hair") && (msg.includes("cut") || msg.includes("haircut"))) {
    return "Based on your profile, a layered cut or bob would suit your face shape beautifully. Luna Artistry in Koramangala (₹1,200+) and Atelier Rose in Indiranagar (₹2,500+) are top-rated for hair services. Want me to book an appointment?";
  }
  if (msg.includes("nail") || msg.includes("manicure")) {
    return "For nails, Gloss Studio in Jayanagar is our top pick — they specialize in gel manicures, nail art and extensions. Prices start from ₹600. They're open now and have slots available this week!";
  }
  if (msg.includes("skin") || msg.includes("facial") || msg.includes("glow")) {
    return "For glowing skin, I recommend a Korean glass-skin facial at Luna Artistry (₹2,800) or a hydra facial at Velvet & Co. in Whitefield. Based on your combination skin type, these treatments will work wonderfully!";
  }
  if (msg.includes("budget") || msg.includes("cheap") || msg.includes("affordable")) {
    return "For budget-friendly options, The Old Soul (HSR Layout) and Gloss Studio (Jayanagar) offer premium services under ₹1,500. Luna Artistry in Koramangala also has great mid-range packages (₹1,200–₹3,000).";
  }
  if (msg.includes("indiranagar")) {
    return "Near Indiranagar, Atelier Rose is our #1 pick (98% AI match, 4.9⭐). They offer hair, skin, and spa services. Gloss Studio is also nearby for nail services. Both are open now!";
  }
  if (msg.includes("koramangala")) {
    return "In Koramangala, Luna Artistry is your best bet — 95% AI match, specializing in K-Beauty. They offer glass hair, glass skin, and trending Korean beauty looks starting from ₹1,200.";
  }
  if (msg.includes("spa") || msg.includes("massage") || msg.includes("relax")) {
    return "For a relaxing spa experience, Velvet & Co. in Whitefield is exceptional — Ayurvedic treatments, deep tissue massages and luxury facials. Perfect for unwinding after a long week!";
  }
  if (msg.includes("selfie") || msg.includes("analysis") || msg.includes("face")) {
    return "Upload your selfie using the camera button and I'll analyze your face shape, skin tone, and hair texture to give you personalized beauty recommendations tailored just for you! 📸";
  }
  if (msg.includes("skin plan")) {
    return "Based on combination skin types common in Bengaluru's climate, I recommend: Morning — vitamin C serum + SPF 50. Evening — niacinamide + light moisturizer. Weekly — exfoliating facial. Shall I find a skin specialist near you?";
  }
  if (msg.includes("hair color")) {
    return "Hair color trends in Bengaluru right now: balayage honey blonde, chocolate brunette, and burgundy tones. Atelier Rose (Indiranagar) and Luna Artistry (Koramangala) both specialize in color treatments. Budget: ₹3,000–₹8,000.";
  }

  return "I'm GlowAI, your personal beauty assistant for Bengaluru! Tell me about the occasion, your budget, or the service you're looking for, and I'll find the perfect salon match for you. 💆‍♀️✨";
}

export const sendChatMessage = createServerFn({ method: "POST" })
  .validator(SendMessageSchema)
  .handler(async ({ data }) => {
    const db = await getDb();
    const chats = db.collection<ChatDoc>("chats");

    const aiReply = generateAIReply(data.message);
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
