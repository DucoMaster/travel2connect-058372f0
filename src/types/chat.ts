export interface ChatMessage {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
}

export interface ChatState {
    isOpen: boolean;
    messages: ChatMessage[];
    isTyping: boolean;
    inputValue: string;
}
