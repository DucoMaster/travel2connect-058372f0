import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";
import { marked } from "marked";
interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full mb-4 chatbot-bubble-in",
        isUser ? "justify-end" : "justify-start"
      )}
      style={{ animationDelay: "0.1s" }}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 mr-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center text-white text-sm font-medium">
            AI
          </div>
        </Avatar>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2",
          isUser
            ? "bg-[hsl(var(--primary))] text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        )}
      >
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: marked(message.content) }}
        />
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 ml-2">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
            <UserRound className="h-5 w-5 text-gray-600" />
          </div>
        </Avatar>
      )}
    </div>
  );
};
