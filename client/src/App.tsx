import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ChatPage from "./pages/ChatPage";
import HistoryChat from "./components/chat-history/HistoryChat";
import ChatConnectionForm from "./pages/testLogin";

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { io, Socket } from "socket.io-client";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "./store/store";
// import { sendMessageRoute } from "../utils/apiRoutes";

// const socket = io("http://localhost:8000");

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: ,
    children: [
      { index: true, path: "/", element: <ChatConnectionForm /> },
      { path: "/home", element: <ChatPage /> },
      { path: "/a", element: <HistoryChat /> },
    ],
  },
]);

const App = () => {
  // const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState<string[]>([]);

  // useEffect(() => {
  //   socket.on("chat-message", (message: string) => {
  //     console.log(message);
  //     setMessages((prevMessages) => [...prevMessages, message]);
  //   });
  // }, []);

  // const sendMessage = async () => {
  //   if (message.trim() !== "") {
  //     socket.emit("sendMessage", message);
  //     axios.post(sendMessageRoute, { text: message });
  //     setMessage("");
  //   }
  // };

  return <RouterProvider router={router} />;

  // <div>
  //   <h1>Real-Time Chat App (Testing)</h1>

  //   <div>
  //     <h2>Messages</h2>
  //     {messages.map((msg, index) => (
  //       <p key={index}>{msg}</p>
  //     ))}
  //   </div>

  //   <div>
  //     <input
  //       type="text"
  //       placeholder="Enter message"
  //       value={message}
  //       onChange={(e) => setMessage(e.target.value)}
  //     />
  //     <button onClick={sendMessage}>Send</button>
  //   </div>
  // </div>
  // =======
  // import { useState, useEffect } from "react";
  // import io from "socket.io-client";
  // import axios from "axios";

  // const ChatApp = () => {
  //   const [message, setMessage] = useState("");
  //   const [messages, setMessages] = useState<
  //     { text: string; senderId: string }[]
  //   >([]);
  //   const [userId, setUserId] = useState(""); // State for user ID
  //   const [socket, setSocket] = useState(null); // State for the socket instance

  //   // Establish socket connection when userId changes
  //   useEffect(() => {
  //     const newSocket = io("http://localhost:8000", {
  //       query: { userId },
  //     });

  //     //@ts-ignore
  //     setSocket(newSocket); // Store the socket instance

  //     newSocket.on("receiveMessage", (message: any) => {
  //       setMessages((prevMessages) => [...prevMessages, message]);
  //       console.log(message);
  //     });

  //     newSocket.on("connect_error", (error) => {
  //       console.error("Socket connection error:", error);
  //     });

  //     return () => {
  //       newSocket.disconnect(); // Clean up the socket connection on unmount
  //     };
  //   }, [userId]);

  //   const sendMessage = async () => {
  //     if (!socket) return; // Ensure socket is defined

  //     const newMessage = { text: message, senderId }; // Construct new message
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);
  //     //@ts-ignore
  //     socket.emit("sendMessage", newMessage);

  //     // try {
  //     //   await axios.post("http://localhost:8000/api/message/", newMessage);
  //     //   setMessage(""); // Clear input
  //     // } catch (error) {
  //     //   console.error("Failed to send message", error);
  //     // }
  //   };

  //   return (
  //     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
  //       <h1>One-on-One Chat App</h1>
  //       {!userId ? ( // Show user ID input if not set
  //         <div>
  //           <input
  //             type="text"
  //             placeholder="Enter your User ID..."
  //             value={userId}
  //             onChange={(e) => setUserId(e.target.value)}
  //             style={{
  //               padding: "10px",
  //               width: "80%",
  //               marginRight: "5px",
  //               borderRadius: "5px",
  //               border: "1px solid #ddd",
  //             }}
  //           />
  //           <button
  //             onClick={() => setUserId(userId)} // Set user ID
  //             style={{
  //               padding: "10px 15px",
  //               backgroundColor: "#007bff",
  //               color: "#fff",
  //               border: "none",
  //               borderRadius: "5px",
  //               cursor: "pointer",
  //             }}
  //           >
  //             Connect
  //           </button>
  //         </div>
  //       ) : (
  //         <div>
  //           <div
  //             style={{
  //               border: "1px solid #ddd",
  //               padding: "10px",
  //               borderRadius: "5px",
  //               maxHeight: "400px",
  //               overflowY: "scroll",
  //             }}
  //           >
  //             <h2>Messages</h2>
  //             {messages.map((msg, index) => (
  //               <div key={index} style={{ marginBottom: "10px" }}>
  //                 <strong>{msg.senderId}:</strong> {msg.text}
  //               </div>
  //             ))}
  //           </div>
  //           <div style={{ marginTop: "10px" }}>
  //             <input
  //               type="text"
  //               placeholder="Enter your message..."
  //               value={message}
  //               onChange={(e) => setMessage(e.target.value)}
  //               style={{
  //                 padding: "10px",
  //                 width: "80%",
  //                 marginRight: "5px",
  //                 borderRadius: "5px",
  //                 border: "1px solid #ddd",
  //               }}
  //             />
  //             <button
  //               onClick={sendMessage}
  //               style={{
  //                 padding: "10px 15px",
  //                 backgroundColor: "#007bff",
  //                 color: "#fff",
  //                 border: "none",
  //                 borderRadius: "5px",
  //                 cursor: "pointer",
  //               }}
  //             >
  //               Send
  //             </button>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // >>>>>>> aabdd29f569bc180809081ba2ef4f6769c28f6d9
};

export default App;
