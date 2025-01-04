import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ChatPage from "./pages/ChatPage";
import HistoryChat from "./components/chat-history/HistoryChat";
import Auth from "./pages/Auth";
import LoginPage from "./components/auth/Login";
import MFAPage from "./components/auth/MFA";
import SignUpPage from "./components/auth/SignUp";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />, // Public landing page
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      { index: true, path: "/auth/login", element: <LoginPage /> },
      { path: "/auth/signup", element: <SignUpPage /> },
      { path: "/auth/mfa", element: <MFAPage /> },
    ],
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, path: "/chat", element: <ChatPage /> },
      { path: "/chat/:sessionId", element: <ChatPage /> },
      { path: "/chat/a", element: <HistoryChat /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
