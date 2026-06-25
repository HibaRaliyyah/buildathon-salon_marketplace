import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Mic, Send, Sparkles, Camera, Loader2, X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { sendChatMessage, getChatHistory } from "@/api/chat";
import { useAuth } from "@/lib/auth-context";
import { toast } from "react-toastify";

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
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load chat history on mount
  useEffect(() => {
    if (!user) {
      navigate({ to: "/login" });
      return;
    }

    const sessionId = getSessionId();
    getChatHistory({ data: { sessionId } })
      .then((msgs) => setMessages(msgs as ChatMessage[]))
      .catch(() =>
        setMessages([{ role: "ai", text: "Hi, I'm GlowAI. Tell me about your event, mood, or what you'd like to change today." }]),
      )
      .finally(() => setLoadingHistory(false));
  }, [user, navigate]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  // Camera stream
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (showCamera) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch((err) => {
          console.error("Camera error:", err);
          toast.error("Could not access camera. Please check permissions.");
          setShowCamera(false);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [showCamera]);

  const handleSend = async () => {
    if (!user) {
      toast.error("Please log in to chat with the AI Consultant.");
      navigate({ to: "/login" });
      return;
    }
    const text = input.trim();
    if ((!text && !attachment) || sending) return;

    setInput("");
    const messageText = attachment ? (text ? `[Image Attached] ${text}` : "Analyze this face.") : text;
    
    // Save attachment to send before nullifying it
    const imageToSend = attachment;
    
    setMessages((prev) => [...prev, { role: "you", text: messageText }]);
    setAttachment(null);
    setSending(true);

    try {
      const sessionId = getSessionId();
      const result = await sendChatMessage({
        data: { userId: user?.id, sessionId, message: messageText, attachment: imageToSend ?? undefined },
      });
      setMessages((prev) => [...prev, { role: "ai", text: result.aiMsg.text }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Sorry, I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setSending(false);
    }
  };

  const toggleListening = () => {
    if (!user) {
      toast.error("Please log in to use voice features.");
      navigate({ to: "/login" });
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = true;
    recognition.interimResults = true;
    
    // Save current input to append to it
    const currentInput = input;

    recognition.onstart = () => setListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      
      setInput((currentInput ? currentInput + " " : "") + transcript);
    };
    
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setListening(false);
    };
    
    recognition.onend = () => {
      setListening(false);
    };
    
    recognition.start();
  };

  const handleCameraClick = () => {
    if (!user) {
      toast.error("Please log in to use the AI camera.");
      navigate({ to: "/login" });
      return;
    }
    setShowCamera(true);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Scale down heavily to ensure payload is small enough for AI API limits
      const MAX_WIDTH = 512;
      const scale = Math.min(MAX_WIDTH / video.videoWidth, 1);
      
      canvas.width = video.videoWidth * scale;
      canvas.height = video.videoHeight * scale;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.5); // lower quality for smaller size
        setAttachment(dataUrl);
        setShowCamera(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const parseMessageText = (text: string) => {
    // If text is undefined or empty for some reason
    if (!text) return null;
    
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <Link key={i} to={match[2] as any} className="text-brand-rose underline font-bold hover:text-brand-rose-deep transition-colors">
            {match[1]}
          </Link>
        );
      }
      return <span key={i}>{part.replace(/\*\*/g, '').replace(/\*/g, '')}</span>;
    });
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
                        className={`max-w-[80%] p-4 rounded-2xl text-sm whitespace-pre-wrap ${
                          m.role === "you"
                            ? "bg-text-main text-white rounded-tr-sm"
                            : "bg-white border border-text-main/5 rounded-tl-sm"
                        }`}
                      >
                        {parseMessageText(m.text)}
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
                {attachment && (
                  <div className="mb-3 px-4 relative inline-block">
                    <div className="relative size-16 rounded-xl overflow-hidden border-2 border-brand-rose">
                      <img src={attachment} alt="Attachment preview" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setAttachment(null)}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCameraClick}
                    className="size-11 shrink-0 rounded-full bg-white border border-text-main/10 grid place-items-center hover:bg-brand-rose hover:text-white transition-colors" 
                    title="Open Camera"
                  >
                    <Camera className="size-5" />
                  </button>
                  <button
                    onClick={toggleListening}
                    className={`size-11 shrink-0 rounded-full grid place-items-center transition-colors ${
                      listening ? "bg-brand-rose-deep text-white shadow-[0_0_15px_rgba(219,39,119,0.5)]" : "bg-white border border-text-main/10 hover:bg-brand-rose hover:text-white"
                    }`}
                    title={listening ? "Stop Voice" : "Start Voice"}
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
                    disabled={sending || (!input.trim() && !attachment)}
                    className="size-11 shrink-0 rounded-full bg-text-main text-white grid place-items-center hover:bg-brand-rose-deep transition-colors disabled:opacity-50"
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

      {/* Live Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-4 max-w-lg w-full flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-4 px-2">
              <h3 className="font-serif text-xl">Capture Photo</h3>
              <button onClick={() => setShowCamera(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X className="size-5" />
              </button>
            </div>
            
            <div className="relative w-full aspect-[3/4] sm:aspect-video bg-black rounded-2xl overflow-hidden mb-6">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
              />
            </div>
            
            <button 
              onClick={capturePhoto}
              className="bg-brand-rose-deep text-white rounded-full px-8 py-4 font-bold flex items-center gap-2 shadow-lg shadow-brand-rose/30 hover:scale-105 transition-transform"
            >
              <Camera className="size-5" /> Capture
            </button>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
