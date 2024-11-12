import { useState, useEffect } from "react";
import ChatHeader from "../components/chat-screen/ChatHeader";
import ChatBody from "../components/chat-screen/ChatBody";
import ChatMessageFooter from "../components/chat-screen/ChatMessageSending";
import { Splitter } from "antd";
import HistoryChat from "../components/chat-history/HistoryChat";
import { io, Socket } from "socket.io-client";

import {
  useSessionDispatch,
  useSessionSelector,
  useUserSelector,
} from "../store/hooks";
import { Message } from "../types/Message";
import { sessionActions } from "../store/session-slice";

const ChatPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showChatScreen, setShowChatScreen] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  const user = useUserSelector((state) => state.user.currentUser);
  const session = useSessionSelector((state) => state.session);
  const sessionDispatch = useSessionDispatch();
  const sessionId = session.selectedSession?.id;

  const addMessage = (msg: string) => {
    const receiverId = session.selectedSession!.participants.find(
      (participantId) => participantId !== user.id
    );

    socket?.emit("sendMessage", {
      text: msg,
      senderId: user.id,
      receiverId: receiverId,
      sessionId: "67304c83cf2e9904e8a39e66",
    });
  };

  const toggleChatScreen = () => {
    setShowChatScreen(!showChatScreen);
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:8000", {
      query: { userId: user.id },
    });
    setSocket(socketInstance);

    socketInstance.on("connection", () => {
      console.log("Connected to Socket.IO server");
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    socketInstance.on("receiveMessage", (message: Message) => {
      sessionDispatch(
        sessionActions.addSession({
          id: message.sessionId,
          participants: [message.senderId, message.receiverId],
        })
      );

      sessionDispatch(
        sessionActions.saveMessage({
          sessionId: message.sessionId,
          message,
        })
      );
    });

    socketInstance.on("error", (error) => {
      console.log(error);
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
            <ChatBody />
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
