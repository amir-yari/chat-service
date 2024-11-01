import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { text: string; senderId: string }[]
  >([]);
  const [userId, setUserId] = useState(""); // State for user ID
  const [socket, setSocket] = useState(null); // State for the socket instance

  // Establish socket connection when userId changes
  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      query: { userId },
    });

    //@ts-ignore
    setSocket(newSocket); // Store the socket instance

    newSocket.on("receiveMessage", (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log(message);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      newSocket.disconnect(); // Clean up the socket connection on unmount
    };
  }, [userId]);

  const sendMessage = async () => {
    if (!socket) return; // Ensure socket is defined

    const newMessage = { text: message, senderId }; // Construct new message
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    //@ts-ignore
    socket.emit("sendMessage", newMessage);

    // try {
    //   await axios.post("http://localhost:8000/api/message/", newMessage);
    //   setMessage(""); // Clear input
    // } catch (error) {
    //   console.error("Failed to send message", error);
    // }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>One-on-One Chat App</h1>
      {!userId ? ( // Show user ID input if not set
        <div>
          <input
            type="text"
            placeholder="Enter your User ID..."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{
              padding: "10px",
              width: "80%",
              marginRight: "5px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
          <button
            onClick={() => setUserId(userId)} // Set user ID
            style={{
              padding: "10px 15px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Connect
          </button>
        </div>
      ) : (
        <div>
          <div
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              maxHeight: "400px",
              overflowY: "scroll",
            }}
          >
            <h2>Messages</h2>
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <strong>{msg.senderId}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                padding: "10px",
                width: "80%",
                marginRight: "5px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
