import { useState, useEffect } from "react";
import ChatHeader from "../components/chat-screen/ChatHeader";
import ChatBody from "../components/chat-screen/ChatBody";
import ChatMessageFooter from "../components/chat-screen/ChatMessageSending";
import { Col, Row, Splitter } from "antd";
import HistoryChat from "../components/chat-history/HistoryChat";

const ChatPage = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const addMessage = (msg: string) => {
    setMessages([...messages, msg]);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Splitter>
      {!isMobile && (
        <Splitter.Panel
          className="bg-white "
          max="35%"
          min="20%"
          defaultSize="30%"
        >
          <HistoryChat isMobile={isMobile} />
        </Splitter.Panel>
      )}
      <Splitter.Panel
        className="flex flex-col h-[100vh] "
        style={{ overflow: "hidden" }}
      >
        {" "}
        <ChatHeader isMobile={isMobile} />
        <ChatBody messages={messages} />
        <ChatMessageFooter addMessage={addMessage} />
      </Splitter.Panel>
    </Splitter>
    // <Row>
    //   {!isMobile && (
    //     <Col span={4} className="bg-white resize-x">
    //       <HistoryChat isMobile={isMobile} />
    //     </Col>
    //   )}
    //   <Col
    //     className={`flex flex-col h-[100vh] overflow-hidden ${
    //       isMobile ? "" : "span-18"
    //     }`}
    //     span={isMobile ? undefined : 20}
    //   >
    //     <ChatHeader isMobile={isMobile} />
    //     <ChatBody messages={messages} />
    //     <ChatMessageFooter addMessage={addMessage} />
    //   </Col>
    // </Row>
  );
};

export default ChatPage;
