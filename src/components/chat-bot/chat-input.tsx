import React, { KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  disabled = false,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex items-center space-x-2 p-4 border-t dark:border-gray-800">
      <Input
        placeholder="Type your message..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-1 bg-gray-100 dark:bg-gray-900 border-0 focus-visible:ring-1 focus-visible:ring-offset-0"
      />
      <Button
        onClick={onSend}
        size="icon"
        disabled={disabled || !value.trim()}
        className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--secondary))] text-white"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};
