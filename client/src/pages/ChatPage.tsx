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
import { auth } from "../firebase";

const ChatPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showChatScreen, setShowChatScreen] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  const user = useUserSelector((state) => state.user.currentUser);
  const session = useSessionSelector((state) => state.session);
  const sessionDispatch = useSessionDispatch();
  const sessionId = session.selectedSession?.id;

  // const receiverId = session.selectedSession!.participants.find(
  //   (participantId) => participantId !== user._id
  // );

  if (sessionId) {
    socket?.emit("requestMessageRead", {
      senderId: user._id,
      // receiverId: receiverId,
      sessionId: sessionId,
    });
  }

  const addMessage = (msg: string) => {
    socket?.emit("sendMessage", {
      text: msg,
      senderId: user._id,
      receiverId: "testReceiverId",
      sessionId: sessionId,
    });
  };

  const toggleChatScreen = () => {
    setShowChatScreen(!showChatScreen);
  };

  useEffect(() => {
    const fetchTokenAndSetupSocket = async () => {
      try {
        const unsubscribe = auth.onIdTokenChanged(async (firebaseUser) => {
          if (firebaseUser) {
            const token = await firebaseUser.getIdToken();

            const socketInstance = io("http://localhost:8000", {
              query: { userId: user._id, token },
            });

            setSocket(socketInstance);

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

            socketInstance.on("messageDelivered", (message: Message) => {
              const { sessionId, _id, status, updatedAt } = message;

              sessionDispatch(
                sessionActions.updateMessageStatusToDelivered({
                  _id,
                  sessionId,
                  status,
                  updatedAt,
                })
              );
            });

            socketInstance.on("messageReadUpdate", (sessionId: string) => {
              sessionDispatch(
                sessionActions.updateSessionStatusToRead({
                  sessionId,
                  //@ts-ignore
                  currentUserId: user._id,
                })
              );
            });

            socketInstance.on("error", (error) => {
              console.log(error);
            });

            return () => socketInstance.disconnect();
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Failed to initialize token and socket:", error);
      }
    };

    fetchTokenAndSetupSocket();
  }, [user._id]);

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
