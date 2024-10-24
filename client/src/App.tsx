// ChatApp.tsx
import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:8000");

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { text: string; senderId: string; timestamp: string }[]
  >([]);
  const [senderId] = useState("user1"); // For testing, this could be hardcoded
  const [receiverId] = useState("user2"); // Likewise, hardcoded for testing

  useEffect(() => {
    // Listen for incoming chat messages
    socket.on("chat-message", (msg: { text: string; senderId: string }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...msg, timestamp: new Date().toISOString() },
      ]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        senderId,
        receiverId,
      };

      // Send the message via socket to notify other users
      socket.emit("sendMessage", newMessage);

      // Send the message to the backend to store in the database
      try {
        await axios.post("http://localhost:8000/api/message/", newMessage);
        setMessage(""); // Clear the input after sending
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  };

  return (
    <div>
      <h1>One-on-One Chat App</h1>
      <div>
        <h2>Messages</h2>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.senderId}:</strong> {msg.text}{" "}
              <em>({new Date(msg.timestamp).toLocaleTimeString()})</em>
            </p>
          ))}
        </div>
      </div>
      <input
        type="text"
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
