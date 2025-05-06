import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";
import { LoadingAnimation } from "./loading-animation";
import { ChatState } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  chatState: ChatState;
  updateInputValue: (value: string) => void;
  sendMessage: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chatState,
  updateInputValue,
  sendMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatState.messages, chatState.isTyping]);

  return (
    <Card
      className={cn(
        "fixed bottom-24 right-6 z-40 w-80 md:w-96 shadow-lg chatbot-window",
        "transform origin-bottom-right",
        chatState.isOpen
          ? "scale-100 opacity-100"
          : "scale-90 opacity-0 pointer-events-none"
      )}
    >
      <CardHeader className="p-4 border-b bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white">
        <CardTitle className="text-lg font-medium flex items-center">
          <div className="mr-2 relative">
            <div className="w-2 h-2 bg-green-400 rounded-full absolute top-0 right-0"></div>
            Chat Assistant
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-80 overflow-y-auto p-4 flex flex-col">
          {chatState.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {chatState.isTyping && (
            <div className="flex items-start mb-4 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center text-white text-sm font-medium mr-2">
                AI
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                <LoadingAnimation />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput
          value={chatState.inputValue}
          onChange={updateInputValue}
          onSend={sendMessage}
          disabled={chatState.isTyping}
        />
      </CardContent>
    </Card>
  );
};
