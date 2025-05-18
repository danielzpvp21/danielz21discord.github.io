import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import { HumorProvider } from "@/context/HumorContext.jsx";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
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
import CommunityPage from "@/pages/CommunityPage";
import EventsPage from "@/pages/EventsPage";
import FAQPage from "@/pages/FAQPage";
import AboutPage from "@/pages/AboutPage";
import SearchResultsPage from "@/pages/SearchResultsPage";
import { botData as initialBotData } from "@/data/botData"; 
import { AuthProvider, useAuth } from "@/context/AuthContext.jsx";
import { BotLoadingSpinner } from "@/components/BotLoadingSpinner";
import AnnouncementBar from "@/components/AnnouncementBar";

function AnimatedRoutes() {
  const location = useLocation();
  const { user, users: allUsers } = useAuth(); // allUsers from AuthContext
  const navigate = useNavigate();

  const [bots, setBots] = useState(() => {
    const savedBots = localStorage.getItem("discordBots");
    return savedBots ? JSON.parse(savedBots) : initialBotData;
  });

  useEffect(() => {
    localStorage.setItem("discordBots", JSON.stringify(bots));
  }, [bots]);

  const handleAddBotToList = (newBot) => {
    setBots(prevBots => [...prevBots, { ...newBot, id: Date.now().toString(), added: true, popular: false, online: true, comments: [], rating: 0, servers: 0 }]);
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

  const handleGlobalSearch = (query) => {
    const lowerQuery = query.toLowerCase();
    const filteredBots = bots.filter(bot => 
      bot.name.toLowerCase().includes(lowerQuery) || 
      bot.description.toLowerCase().includes(lowerQuery)
    );
    const filteredUsers = allUsers.filter(u => 
      (u.publicName && u.publicName.toLowerCase().includes(lowerQuery)) ||
      (u.username && u.username.toLowerCase().includes(lowerQuery))
    );
    
    navigate("/search-results", { state: { query, bots: filteredBots, users: filteredUsers } });
  };


  return (
    <>
      <Header 
        isSidebarOpen={false} 
        toggleSidebar={() => {}} 
        onSearch={handleGlobalSearch} 
      />
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
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [announcement, setAnnouncement] = useState({
    show: true,
    message: "🎉 Bem-vindo à nova versão do nosso site! Explore as novidades!",
    type: "info",
  });

  const handleCloseAnnouncement = () => {
    setAnnouncement(prev => ({ ...prev, show: false }));
  };
  
  // This function will be passed to Header via AnimatedRoutes's Header instance
  const performSearch = (query) => {
    // This is a placeholder. The actual search logic is now in AnimatedRoutes
    // to have access to navigate and data.
    // We need a way for Header to trigger this.
    // For now, Header will call onSearch prop, which is handleGlobalSearch in AnimatedRoutes.
  };


  return (
    <Suspense fallback={<BotLoadingSpinner message="Carregando traduções e preparando a mágica..." />}>
      <ThemeProvider>
        <HumorProvider>
          <AuthProvider>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
              {announcement.show && (
                <AnnouncementBar
                  message={announcement.message}
                  type={announcement.type}
                  onClose={handleCloseAnnouncement}
                />
              )}
              {/* Header is now rendered inside AnimatedRoutes to pass onSearch */}
              <div className={`flex flex-1 ${announcement.show ? 'pt-28 sm:pt-24' : 'pt-16'} pb-16`}>
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                <main className="flex-1 overflow-y-auto">
                  <AnimatedRoutes />
                </main>
              </div>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </HumorProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;