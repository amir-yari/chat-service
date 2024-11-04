import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import ChatHeader from "../components/chat-screen/ChatHeader";
import ChatBody from "../components/chat-screen/ChatBody";
import ChatMessageFooter from "../components/chat-screen/ChatMessageSending";
import { Splitter } from "antd";
import HistoryChat from "../components/chat-history/HistoryChat";
import { io, Socket } from "socket.io-client";

const ChatPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showChatScreen, setShowChatScreen] = useState(true);
  const userID = useSelector((state: RootState) => state.user.user.id);
  const receiverID = useSelector(
    (state: RootState) => state.message.items[0]?.recieverId
  );

  const addMessage = (msg: string) => {
    socket?.emit("sendMessage", {
      text: msg,
      senderId: userID,
      receiverId: receiverID,
    });

    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  const toggleChatScreen = () => {
    setShowChatScreen(!showChatScreen);
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:8000");
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to Socket.IO server");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      setIsConnected(false);
    });

    socketInstance.on("receiveMessage", (incomingMessage: string) => {
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

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
