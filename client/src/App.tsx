import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ChatPage from "./pages/ChatPage";
import HistoryChat from "./components/chat-history/HistoryChat";

// import axios from "axios";
// import { useState, useEffect } from "react";
// import io from "socket.io-client";
// import { sendMessageRoute } from "../utils/apiRoutes";

// const socket = io("http://localhost:8000");

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: ,
    children: [
      { index: true, path: "/", element: <ChatPage /> },
      { path: "/home", element: <></> },
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
};

export default App;
