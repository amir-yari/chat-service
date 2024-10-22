import axios from "axios";
import { useState, useEffect } from "react";
import io from "socket.io-client";

import { sendMessageRoute } from "../utils/apiRoutes";

const socket = io("http://localhost:8000");

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { text: string; sender: string; timestamp: string }[]
  >([]);
  const [senderId, setSenderId] = useState("user1");
  const [receiverId, setReceiverId] = useState("user2");

  useEffect(() => {
    socket.on(
      "chat-message",
      (message: { text: string; sender: string; timestamp: string }) => {
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    );

    return () => {
      socket.off("chat-message");
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        senderId,
        receiverId,
      };

      socket.emit("sendMessage", newMessage);

      try {
        await axios.post(sendMessageRoute, newMessage);
        setMessage("");
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };
  return (
    <div>
      <h1>Real-Time Chat App (Testing)</h1>

      <div>
        <h2>Messages</h2>
        {messages.map((msg, index) => (
          <p key={index}>{msg.text}</p>
        ))}
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
