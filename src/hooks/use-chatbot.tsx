import { useState, useCallback } from "react";
import { ChatMessage, ChatState } from "@/types/chat";
import axios from "axios";
export function useChatbot() {
  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    messages: [
      {
        id: "welcome",
        content: "Hello! How can I assist you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ],
    isTyping: false,
    inputValue: "",
  });

  const toggleChat = useCallback(() => {
    setChatState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const updateInputValue = useCallback((value: string) => {
    setChatState((prev) => ({ ...prev, inputValue: value }));
  }, []);

  const sendMessage = useCallback(async () => {
    if (!chatState.inputValue.trim()) return;

    // Create user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content: chatState.inputValue,
      role: "user",
      timestamp: new Date(),
    };

    // Update state with user message and reset input
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
      inputValue: "",
    }));

    try {
      // Simulate API call with delay
      // In a real application, replace this with your actual API call
      const res = await axios.post(
        "https://ducoace.app.n8n.cloud/webhook/1267708b-e50f-4f41-93b1-356f10c03f90",
        {
          prompt: userMessage?.content || "",
          sessionId: Math.floor(100000 + Math.random() * 900000),
        }
      );
      const data = res.data;
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        content: data?.output || "No Response Found",
        role: "assistant",
        timestamp: new Date(),
      };
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isTyping: false,
      }));
    } catch (error) {
      console.error("Error sending message:", error);
      setChatState((prev) => ({ ...prev, isTyping: false }));
    }
  }, [chatState.inputValue]);

  return {
    chatState,
    toggleChat,
    updateInputValue,
    sendMessage,
  };
}
