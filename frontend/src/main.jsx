import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx"
import { ThemeProvider } from "./context/ThemeContext.jsx"


createRoot(document.getElementById("root")).render(




  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <ChatProvider>
              <ThemeProvider>
                <App />
              </ThemeProvider>
          </ChatProvider>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
