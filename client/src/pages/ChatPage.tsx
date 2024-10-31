import { useState, useEffect } from "react";
import ChatHeader from "../components/chat-screen/ChatHeader";
import ChatBody from "../components/chat-screen/ChatBody";
import ChatMessageFooter from "../components/chat-screen/ChatMessageSending";
import { Splitter } from "antd";
import HistoryChat from "../components/chat-history/HistoryChat";

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showChatScreen, setShowChatScreen] = useState(true);

  const addMessage = (msg: string) => {
    setMessages([...messages, msg]);
  };

  const toggleChatScreen = () => {
    setShowChatScreen(!showChatScreen);
  };

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isSmallScreen);
      if (!isSmallScreen) {
        setShowChatScreen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Splitter>
      {!isMobile && (
        <Splitter.Panel
          className="bg-white"
          max="35%"
          min="20%"
          defaultSize="30%"
        >
          {/* @ts-ignore */}
          <HistoryChat isMobile={isMobile} />
        </Splitter.Panel>
      )}
      <Splitter.Panel
        className="flex flex-col h-[100vh]"
        style={{ overflow: "hidden" }}
      >
        {showChatScreen ? (
          <>
            <ChatHeader
              isMobile={isMobile}
              toggleChatScreen={toggleChatScreen}
            />{" "}
            <ChatBody messages={messages} />
            <ChatMessageFooter addMessage={addMessage} />
          </>
        ) : (
          // @ts-ignore
          isMobile && <HistoryChat isMobile={isMobile} />
        )}
      </Splitter.Panel>
    </Splitter>
  );
};

export default ChatPage;
