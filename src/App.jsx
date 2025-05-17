import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import BotsPage from "@/pages/BotsPage";
import BotDetailPage from "@/pages/BotDetailPage";
import AddBotPage from "@/pages/AddBotPage";
import UserProfilePage from "@/pages/UserProfilePage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { botData as initialBotData } from "@/data/botData"; 
import { AuthProvider, useAuth } from "@/context/AuthContext.jsx";

function AnimatedRoutes() {
  const location = useLocation();
  const { user } = useAuth();

  const [bots, setBots] = useState(() => {
    const savedBots = localStorage.getItem("discordBots");
    return savedBots ? JSON.parse(savedBots) : initialBotData;
  });

  useEffect(() => {
    localStorage.setItem("discordBots", JSON.stringify(bots));
  }, [bots]);

  const handleAddBotToList = (newBot) => {
    setBots(prevBots => [...prevBots, { ...newBot, id: Date.now(), added: true, popular: false, online: true, comments: [], rating: 0, servers: 0 }]);
  };

  const handleUpdateBot = (updatedBot) => {
    setBots(prevBots => prevBots.map(bot => bot.id === updatedBot.id ? updatedBot : bot));
  };
  
  const handleToggleAddBot = (botId) => {
    setBots(prevBots => 
      prevBots.map(bot => 
        bot.id === botId ? { ...bot, added: !bot.added } : bot
      )
    );
  };


  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage bots={bots} />} />
        <Route path="/bots" element={<BotsPage bots={bots} onToggleAddBot={handleToggleAddBot} />} />
        <Route path="/bots/:id" element={<BotDetailPage bots={bots} onUpdateBot={handleUpdateBot} />} />
        <Route path="/add-bot" element={user ? <AddBotPage onAddBotToList={handleAddBotToList} /> : <LoginPage />} />
        <Route path="/profile" element={user ? <UserProfilePage /> : <LoginPage />} />
        <Route path="/admin" element={user && user.isAdmin ? <AdminDashboardPage bots={bots} setBots={setBots} /> : <NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Header 
            isSidebarOpen={isSidebarOpen} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          />
          <div className="flex flex-1 pt-16"> {/* Adjust pt-16 to match header height */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <main className="flex-1 overflow-y-auto">
              <AnimatedRoutes />
            </main>
          </div>
        </div>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;