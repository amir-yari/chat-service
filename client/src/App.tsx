import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ChatPage from "./pages/ChatPage";
import HistoryChat from "./components/chat-history/HistoryChat";
import ChatConnectionForm from "./pages/testLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: ,
    children: [
      { index: true, path: "/", element: <ChatConnectionForm /> },
      { path: "/home", element: <ChatPage /> },
      { path: "/home/:sessionId", element: <ChatPage /> },
      { path: "/a", element: <HistoryChat /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
