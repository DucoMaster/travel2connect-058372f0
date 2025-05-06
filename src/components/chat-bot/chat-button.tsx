import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "w-14 h-14 rounded-full fixed bottom-6 right-6 z-50 shadow-lg",
        "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:opacity-90",
        "flex items-center justify-center",
        "transition-all duration-300 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[hsl(var(--primary))]"
      )}
    >
      <div className="relative">
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
          </>
        )}
      </div>

      {!isOpen && (
        <span
          className="animate-[pulse-wave_1.5s_ease-out_infinite] absolute w-full h-full rounded-full bg-[hsl(var(--primary))]"
          style={{
            boxShadow: "0 0 0 0 rgba(0, 0, 0, 1)",
          }}
        />
      )}
    </Button>
  );
};
