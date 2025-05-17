import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bot, Menu, X, UserCircle2, LogOut, PlusCircle, LayoutDashboard, LogIn, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import { useToast } from "@/components/ui/use-toast";

export function Header({ isSidebarOpen, toggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({ 
      title: "Até a próxima, cowboy! 👋", 
      description: "Você foi desconectado. Volte logo, os bots sentem sua falta!" 
    });
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md chrome-effect">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden !bg-transparent !shadow-none hover:!bg-accent/50" 
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
          
          <Link to="/" className="flex items-center gap-2 focus:outline-none" aria-label="Página Inicial DiscordBots">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center"
            >
              <Bot className="h-7 w-7 text-primary" />
              <span className="ml-2 text-xl font-bold tracking-tight">DiscordBots <Sparkles className="inline h-4 w-4 text-yellow-400 animate-pulse" /></span>
            </motion.div>
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full !bg-transparent !shadow-none hover:!bg-accent/50 focus:ring-2 focus:ring-primary" aria-label="Menu do usuário">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl || `https://robohash.org/${user.username}.png?set=set${Math.floor(Math.random() * 5) + 1}&size=32x32`} alt={user.username || "Avatar do usuário"} />
                    <AvatarFallback>{user.username ? user.username.substring(0, 2).toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Olá, {user.username || "Usuário Misterioso"}!</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/profile"><UserCircle2 className="mr-2 h-4 w-4" />Meu Perfil (Secreto?)</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/add-bot"><PlusCircle className="mr-2 h-4 w-4" />Adicionar um Bot Mágico</Link>
                </DropdownMenuItem>
                {user.isAdmin && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/admin"><LayoutDashboard className="mr-2 h-4 w-4" />Painel dos Deuses</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:!text-red-500 focus:!bg-red-500/10 focus:!text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />Escapar (Logout)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="sm" className="hidden md:inline-flex button-effect btn-chrome" asChild>
                <Link to="/login">Entrar (se tiver coragem 😈)</Link>
              </Button>
               <Button size="icon" variant="ghost" className="md:hidden !bg-transparent !shadow-none hover:!bg-accent/50" asChild aria-label="Entrar">
                <Link to="/login"><LogIn size={20}/></Link>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}