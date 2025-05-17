import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Home, Settings, Star, Users, PlusCircle, UserCircle2, LogIn, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const getMenuItems = (user) => {
  let items = [
    { path: "/", icon: Home, label: "Início" },
    { path: "/bots", icon: Bot, label: "Explorar Bots" },
    { path: "/bots?filter=populares", icon: Star, label: "Populares" },
  ];

  if (user) {
    items.push({ path: "/profile", icon: UserCircle2, label: "Meu Perfil" });
    items.push({ path: "/add-bot", icon: PlusCircle, label: "Adicionar Bot" });
    if (user.isAdmin) {
      items.push({ path: "/admin", icon: LayoutDashboard, label: "Painel Admin" });
    }
  } else {
     items.push({ path: "/login", icon: LogIn, label: "Login / Cadastro" });
  }
  
  items.push({ path: "#", icon: Users, label: "Comunidade", disabled: true }); // Example of disabled item
  items.push({ path: "#", icon: Settings, label: "Configurações", disabled: true });

  return items;
};


export function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { user } = useAuth();
  const menuItems = getMenuItems(user);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 border-r bg-background/95 backdrop-blur-lg p-4 shadow-2xl",
          "md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:w-64 md:translate-x-0 md:shadow-none md:backdrop-blur-none md:bg-background chrome-effect" 
        )}
      >
        <nav className="mt-16 space-y-1.5 py-4 md:mt-0">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => { if (isOpen) setIsOpen(false); }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                location.pathname === item.path
                  ? "bg-primary/20 text-primary shadow-inner"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                item.disabled && "cursor-not-allowed opacity-50 hover:bg-transparent hover:text-muted-foreground"
              )}
              aria-disabled={item.disabled}
              tabIndex={item.disabled ? -1 : 0}
            >
              <motion.div whileHover={{ scale: item.disabled ? 1 : 1.1 }} whileTap={{ scale: item.disabled ? 1 : 0.95 }}>
                <item.icon size={20} />
              </motion.div>
              <span>{item.label}</span>
              {location.pathname === item.path && !item.disabled && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <motion.div 
            className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-4 text-center"
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.5 }}
          >
            <h4 className="mb-1.5 font-semibold text-primary">Precisa de Ajuda?</h4>
            <p className="mb-3 text-xs text-muted-foreground">
              Confira nossos tutoriais ou entre em contato com o suporte.
            </p>
            <Button size="sm" variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
              Ver Tutoriais
            </Button>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}