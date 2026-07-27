"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Sparkles, Loader2, BookOpen, MessageCircle, X } from "lucide-react";

type ChatMessage = {
  role: "USER" | "LIBRARYAN" | "MODARATOR" | "MODEL";
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  async function sendMessage(textToSend?: string) {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMessage: ChatMessage = { role: "USER", content: query };
    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          message: userMessage.content,
        }),
      });

      const data = await res.json();

      setConversationId(data.conversationId);
      setMessages((prev) => [
        ...prev,
        { role: "USER", content: data.reply },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Box */}
      {isOpen && (
        <Card className="w-[360px] sm:w-[400px] h-[520px] shadow-2xl border border-border/80 backdrop-blur-md bg-card/95 flex flex-col overflow-hidden rounded-2xl mb-4 animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <CardHeader className="bg-primary/10 border-b border-border/40 p-3.5 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                  Library Assistant
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                </CardTitle>
                <p className="text-[11px] text-muted-foreground">বই ও সার্ভিস সংক্রান্ত তথ্য পেতে সাহায্য নিন</p>
              </div>
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Close chat</span>
            </Button>
          </CardHeader>

          {/* Chat History Area */}
          <CardContent className="flex-1 p-0 overflow-hidden bg-background/50">
            <ScrollArea className="h-full p-4">
              {messages.length === 0 ? (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center p-4 text-muted-foreground space-y-3">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-xs sm:text-sm">স্বাগতম লাইব্রেরি অ্যাসিস্ট্যান্টে!</h4>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      বই খোঁজা, মেম্বারশিপ বা লাইব্রেরির যেকোনো বিষয়ে প্রশ্ন করুন।
                    </p>
                  </div>

                  {/* Quick suggestion prompt buttons */}
                  <div className="flex flex-col gap-2 w-full pt-2">
                    <button
                      type="button"
                      onClick={() => sendMessage("কিভাবে নতুন বই ইস্যু করবো?")}
                      className="text-[11px] text-left p-2 rounded-lg border border-border/60 hover:bg-muted/80 transition-colors bg-card"
                    >
                      📖 কিভাবে নতুন বই ইস্যু করবো?
                    </button>
                    <button
                      type="button"
                      onClick={() => sendMessage("লাইব্রেরি মেম্বারশিপের প্রসেস কি?")}
                      className="text-[11px] text-left p-2 rounded-lg border border-border/60 hover:bg-muted/80 transition-colors bg-card"
                    >
                      💳 লাইব্রেরি মেম্বারশিপের প্রসেস কি?
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 text-xs sm:text-sm ${
                        msg.role === "USER" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.role === "MODEL" && (
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div
                        className={`px-3 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap leading-relaxed shadow-sm ${
                          msg.role === "USER"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-muted text-foreground rounded-bl-none border border-border/40"
                        }`}
                      >
                        {msg.content}
                      </div>

                      {msg.role === "USER" && (
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 text-xs">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {loading && (
                    <div className="flex gap-2 justify-start items-center">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div className="bg-muted px-3 py-2 rounded-2xl rounded-bl-none text-muted-foreground text-xs flex items-center gap-2 border border-border/40">
                        <Loader2 className="w-3 h-3 animate-spin text-primary" />
                        উত্তর তৈরি হচ্ছে...
                      </div>
                    </div>
                  )}
                  <div ref={scrollRef} />
                </div>
              )}
            </ScrollArea>
          </CardContent>

          {/* Input Footer */}
          <CardFooter className="p-2.5 bg-card border-t border-border/40">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2 w-full items-center"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="আপনার প্রশ্ন লিখুন..."
                className="flex-1 bg-background text-xs rounded-xl focus-visible:ring-1 border-border/60 h-9"
                disabled={loading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={loading || !input.trim()}
                className="rounded-xl shrink-0 h-9 w-9"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      {/* Floating Toggle Icon Button */}
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        size="icon"
        className="h-13 w-13 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-primary text-primary-foreground"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
        <span className="sr-only">Toggle Chat</span>
      </Button>
    </div>
  );
}