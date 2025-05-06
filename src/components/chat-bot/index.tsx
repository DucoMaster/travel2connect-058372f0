import React from "react";
import { ChatButton } from "./chat-button";
import { ChatWindow } from "./chat-window";
import { useChatbot } from "@/hooks/use-chatbot";

export const ChatBot: React.FC = () => {
  const { chatState, toggleChat, updateInputValue, sendMessage } = useChatbot();

  return (
    <>
      <ChatButton isOpen={chatState.isOpen} onClick={toggleChat} />
      <ChatWindow
        chatState={chatState}
        updateInputValue={updateInputValue}
        sendMessage={sendMessage}
      />
    </>
  );
};
