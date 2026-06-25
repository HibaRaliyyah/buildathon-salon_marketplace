import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Mic, Send, Sparkles, Camera, Loader2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { sendChatMessage, getChatHistory } from "@/api/chat";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/ai-consultant")({
  head: () => ({
    meta: [
      { title: "AI Beauty Consultant — GlowAI" },
      { name: "description", content: "Chat or speak with GlowAI, your personal AI beauty assistant for Bengaluru." },
    ],
  }),
  component: ConsultantPage,
});

interface ChatMessage {
  role: string;
  text: string;
}

const voiceExamples = [
  "Find salons near Indiranagar",
  "Book a haircut tomorrow",
  "Show bridal makeup in Whitefield",
  "Hair spa under ₹2,000",
  "Best salons in Koramangala",
];

function getSessionId() {
  if (typeof window === "undefined") return "server-session";
  let sid = sessionStorage.getItem("glowai_chat_session");
  if (!sid) {
    sid = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("glowai_chat_session", sid);
  }
  return sid;
}

function ConsultantPage() {
  const { user } = useAuth();
  const [listening, setListening] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load chat history on mount
  useEffect(() => {
    const sessionId = getSessionId();
    getChatHistory({ data: { sessionId } })
      .then((msgs) => setMessages(msgs as ChatMessage[]))
      .catch(() =>
        setMessages([{ role: "ai", text: "Hi, I'm GlowAI. Tell me about your event, mood, or what you'd like to change today." }]),
      )
      .finally(() => setLoadingHistory(false));
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "you", text }]);
    setSending(true);

    try {
      const sessionId = getSessionId();
      const result = await sendChatMessage({
        data: { userId: user?.id, sessionId, message: text },
      });
      setMessages((prev) => [...prev, { role: "ai", text: result.aiMsg.text }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceExample = (example: string) => {
    setInput(example);
  };

  return (
    <SiteLayout>
      <section className="px-6 pt-10 pb-16">
        <div className="max-w-5xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">AI Concierge</span>
          <h1 className="font-serif text-4xl sm:text-5xl mt-2 mb-3">Your personal beauty assistant.</h1>
          <p className="text-text-main/60 max-w-2xl">Upload a selfie, chat, or speak — and discover looks and salons curated for you.</p>

          <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-6">
            {/* Chat */}
            <div className="glass-panel rounded-3xl flex flex-col min-h-[560px]">
              <div className="px-6 py-4 border-b border-text-main/5 flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-tr from-brand-rose to-brand-lavender grid place-items-center text-white">
                  <Sparkles className="size-5" />
                </div>
                <div>
                  <div className="font-semibold">GlowAI Concierge</div>
                  <div className="text-[10px] uppercase tracking-widest text-emerald-600">Online · Bengaluru</div>
                </div>
              </div>

              <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[420px]">
                {loadingHistory ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="size-6 animate-spin text-brand-rose-deep" />
                  </div>
                ) : (
                  messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === "you" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                          m.role === "you"
                            ? "bg-text-main text-white rounded-tr-sm"
                            : "bg-white border border-text-main/5 rounded-tl-sm"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))
                )}
                {sending && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-text-main/5 rounded-2xl rounded-tl-sm p-4 text-sm text-text-main/50 flex items-center gap-2">
                      <Loader2 className="size-3 animate-spin" /> GlowAI is thinking…
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="p-4 border-t border-text-main/5">
                {listening && (
                  <div className="flex items-center justify-center gap-1 mb-3 h-8">
                    {[0, 0.1, 0.2, 0.3, 0.4, 0.3, 0.2, 0.1].map((d, i) => (
                      <span
                        key={i}
                        className="w-1 bg-brand-rose-deep rounded-full animate-sound-wave"
                        style={{ height: "100%", animationDelay: `${d}s` }}
                      />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <button className="size-11 rounded-full bg-white border border-text-main/10 grid place-items-center hover:bg-brand-rose hover:text-white transition-colors" title="Upload selfie">
                    <Camera className="size-5" />
                  </button>
                  <button
                    onClick={() => setListening((l) => !l)}
                    className={`size-11 rounded-full grid place-items-center transition-colors ${
                      listening ? "bg-brand-rose-deep text-white" : "bg-white border border-text-main/10 hover:bg-brand-rose hover:text-white"
                    }`}
                    title="Voice"
                  >
                    <Mic className="size-5" />
                  </button>
                  <input
                    placeholder="Ask about looks, salons, or budgets…"
                    className="flex-1 bg-white border border-text-main/10 rounded-full px-5 py-3 text-sm outline-none focus:border-brand-rose"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    id="chat-input"
                  />
                  <button
                    onClick={handleSend}
                    disabled={sending || !input.trim()}
                    className="size-11 rounded-full bg-text-main text-white grid place-items-center hover:bg-brand-rose-deep transition-colors disabled:opacity-50"
                    id="chat-send"
                  >
                    <Send className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Voice suggestions */}
            <aside className="space-y-4">
              <div className="glass-card rounded-3xl p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep mb-3">Try asking</div>
                <ul className="space-y-2">
                  {voiceExamples.map((v) => (
                    <li key={v}>
                      <button
                        onClick={() => handleVoiceExample(v)}
                        className="w-full text-left text-sm bg-white/70 rounded-xl px-3 py-2 border border-text-main/5 hover:border-brand-rose transition-colors"
                      >
                        "{v}"
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card rounded-3xl p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep mb-3">Quick actions</div>
                <div className="grid grid-cols-2 gap-2">
                  {["Selfie Analysis", "Bridal Looks", "Skin Plan", "Hair Color"].map((t) => (
                    <button
                      key={t}
                      onClick={() => handleVoiceExample(t)}
                      className="text-xs font-medium bg-white/70 rounded-xl py-3 border border-text-main/5 hover:border-brand-rose transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
