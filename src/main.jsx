import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import LeftSidebar from "./components/shared/LeftSideBar";
import BottomSidebar from "./components/shared/BottomBar";
import Topbar from "./components/shared/TopBar";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <div>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />

            <section className="main-container">
              <div className="w-full max-w-4xl">
                <App />
              </div>
            </section>
          </main>

          <BottomSidebar />
        </div>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
