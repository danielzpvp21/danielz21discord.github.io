
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Bot, PlusCircle, UserCircle2, LayoutDashboard, Users, CalendarDays, HelpCircle, X, BadgeInfo as InfoIcon } from 'lucide-react';
import { useAuth } from "@/context/AuthContext.jsx";
import { useTranslation } from 'react-i18next';

export function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const { user } = useAuth();
  const { t } = useTranslation();

  const navItems = [
    { href: "/", icon: Home, label: t('sidebar_home') },
    { href: "/bots", icon: Bot, label: t('sidebar_bots') },
    { href: "/community", icon: Users, label: t('sidebar_community') },
    { href: "/events", icon: CalendarDays, label: t('sidebar_events') },
    { href: "/faq", icon: HelpCircle, label: t('sidebar_faq') },
    { href: "/about", icon: InfoIcon, label: t('sidebar_about') },
  ];

  const userNavItems = [
    { href: "/add-bot", icon: PlusCircle, label: t('sidebar_add_bot'), requiresAuth: true },
    { href: "/profile", icon: UserCircle2, label: t('sidebar_profile'), requiresAuth: true },
    { href: "/admin", icon: LayoutDashboard, label: t('sidebar_admin_panel'), requiresAuth: true, requiresAdmin: true },
  ];

  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
    closed: { opacity: 0, x: -20 },
  };
  
  const navLinkClasses = (path) => 
    `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors duration-150 ease-in-out hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:outline-none
    ${location.pathname === path ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"}`;

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}

      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={`fixed top-0 left-0 z-40 h-full w-64 border-r bg-background pt-16 transition-transform md:pt-0 md:translate-x-0 md:static md:h-auto md:border-0 md:shadow-none`}
      >
        <div className="flex h-full flex-col overflow-y-auto p-4 md:pt-6">
          <div className="mb-4 flex items-center justify-between md:hidden">
            <span className="text-lg font-semibold">{t('sidebar_menu_title_mobile')}</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="!bg-transparent !shadow-none">
              <X size={20} />
            </Button>
          </div>
          <motion.nav variants={itemVariants} className="flex-1 space-y-1.5">
            {navItems.map(item => (
              <motion.div key={item.href} variants={itemVariants}>
                <Link to={item.href} className={navLinkClasses(item.href)} onClick={() => setIsOpen(false)}>
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </motion.div>
            ))}
            {userNavItems.map(item => {
              if (item.requiresAuth && !user) return null;
              if (item.requiresAdmin && (!user || !user.isAdmin)) return null;
              return (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link to={item.href} className={navLinkClasses(item.href)} onClick={() => setIsOpen(false)}>
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
          
          <motion.div 
            variants={itemVariants}
            className="mt-auto pt-4 border-t border-border"
          >
            <p className="px-3 text-xs text-muted-foreground">
              {t('sidebar_footer_text', { year: new Date().getFullYear() })}
            </p>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
