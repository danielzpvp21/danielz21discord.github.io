import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Bot, Menu, X, UserCircle2, LogOut, PlusCircle, LayoutDashboard, LogIn, Sparkles, Languages, Smile, Search, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from 'react-i18next';
import { useHumor } from '@/context/HumorContext.jsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip.jsx";
import { Input } from "@/components/ui/input";

export function Header({ isSidebarOpen, toggleSidebar, onSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const { humorLevel, setHumorLevel } = useHumor();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    toast({ 
      title: t('logout_button_toast_title'), 
      description: t('logout_button_toast_description', {context: humorLevel})
    });
    navigate("/");
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim());
      } else {
         toast({
            title: t('search_in_header_toast_title'),
            description: `${t('search_in_header_toast_searching_for')} "${searchQuery}". ${t('search_in_header_toast_feature_soon')}`,
          });
      }
      setSearchQuery(""); // Clear search query after submission
    }
  };
  
  const humorExplanation = {
    formal: t('humor_explanation_formal'),
    neutral: t('humor_explanation_neutral'),
    fun: t('humor_explanation_fun'),
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md chrome-effect">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden !bg-transparent !shadow-none hover:!bg-accent/50" 
                  onClick={toggleSidebar}
                  aria-label={isSidebarOpen ? t('close_sidebar_aria_label') : t('open_sidebar_aria_label')}
                >
                  {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isSidebarOpen ? t('close_sidebar_tooltip', {context: humorLevel}) : t('open_sidebar_tooltip', {context: humorLevel})}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link to="/" className="flex items-center gap-2 focus:outline-none" aria-label={t('homepage_aria_label')}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center"
            >
              <Bot className="h-7 w-7 text-primary" />
              <span className="ml-2 text-xl font-bold tracking-tight hidden sm:inline">{t('header_title')} <Sparkles className="inline h-4 w-4 text-yellow-400 animate-pulse" /></span>
            </motion.div>
          </Link>
        </div>

        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center w-full max-w-xs lg:max-w-sm relative">
          <Input 
            type="search" 
            placeholder={t('search_placeholder_header', {context: humorLevel})}
            className="pr-10 h-9 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 !bg-transparent !shadow-none hover:!bg-accent/50">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">{t('search_button_aria_label')}</span>
          </Button>
        </form>
        
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="!bg-transparent !shadow-none hover:!bg-accent/50" aria-label={t('language_switcher')}>
                      <Languages className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent><p>{t('language_switcher_tooltip', {context: humorLevel})}</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={i18n.language} onValueChange={changeLanguage}>
                <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pt">Português</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="es">Español</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="!bg-transparent !shadow-none hover:!bg-accent/50" aria-label={t('humor_level')}>
                      <Smile className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center" className="max-w-xs text-center">
                  <p className="font-semibold">{t('humor_level_tooltip_title')}</p>
                  <p className="text-xs text-muted-foreground">{humorExplanation[humorLevel]}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('humor_level')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={humorLevel} onValueChange={setHumorLevel}>
                <DropdownMenuRadioItem value="formal">{t('humor_formal')}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="neutral">{t('humor_neutral')}</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="fun">{t('humor_fun')}</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
               <DropdownMenuSeparator />
                <div className="p-2 text-xs text-muted-foreground">
                  <Info className="inline h-3 w-3 mr-1"/>
                  {humorExplanation[humorLevel]}
                </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full !bg-transparent !shadow-none hover:!bg-accent/50 focus:ring-2 focus:ring-primary" aria-label={t('user_menu_aria_label')}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl || `https://robohash.org/${user.publicName || user.username || 'user'}.png?set=set${Math.floor(Math.random() * 5) + 1}&size=32x32`} alt={user.publicName || user.username || t('user_avatar_alt')} />
                    <AvatarFallback>{user.publicName ? user.publicName.substring(0, 2).toUpperCase() : (user.username ? user.username.substring(0,2).toUpperCase() : "U")}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.publicName || user.username || t('mysterious_user_label', {context: humorLevel})}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/profile"><UserCircle2 className="mr-2 h-4 w-4" />{t('user_menu_profile', {context: humorLevel})}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/add-bot"><PlusCircle className="mr-2 h-4 w-4" />{t('user_menu_add_bot', {context: humorLevel})}</Link>
                </DropdownMenuItem>
                {user.isAdmin && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/admin"><LayoutDashboard className="mr-2 h-4 w-4" />{t('user_menu_admin_panel', {context: humorLevel})}</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 hover:!text-red-500 focus:!bg-red-500/10 focus:!text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />{t('logout_button', {context: humorLevel})}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" className="hidden md:inline-flex button-effect btn-chrome" asChild>
                      <Link to="/login">{t('login_button', {context: humorLevel})}</Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>{t('login_button_tooltip', {context: humorLevel})}</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
               <Button size="icon" variant="ghost" className="md:hidden !bg-transparent !shadow-none hover:!bg-accent/50" asChild aria-label={t('login_button_aria_label_mobile')}>
                <Link to="/login"><LogIn size={20}/></Link>
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}