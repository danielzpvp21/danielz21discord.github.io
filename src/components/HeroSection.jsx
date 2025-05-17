import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Bot, Search, ShieldCheck, Users, Star, Zap } from "lucide-react"; // Added Zap
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-purple-500/5 to-background py-24 md:py-32">
      <div className="absolute inset-0 -z-10 animated-gradient opacity-[0.02] dark:opacity-[0.04]" />
      
      <motion.div 
        className="absolute -right-60 -top-60 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] filter"
        animate={{ 
          scale: [1, 1.3, 1.1, 1.4, 1],
          opacity: [0.05, 0.1, 0.07, 0.12, 0.05],
          rotate: [0, 90, 180, 270, 360]
        }}
        transition={{ 
          duration: 35,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-72 -left-52 h-[450px] w-[450px] rounded-full bg-accent/10 blur-[110px] filter"
        animate={{ 
          scale: [1, 1.4, 1.2, 1.5, 1],
          opacity: [0.05, 0.1, 0.08, 0.13, 0.05],
           rotate: [0, -70, -140, -210, -280, -360]
        }}
        transition={{ 
          duration: 40,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "linear",
          delay: 5
        }}
      />
      
      <div className="container relative z-10 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 100 }}
          >
             <h1 className="mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text pb-2 text-5xl font-extrabold tracking-tighter text-transparent sm:text-6xl md:text-7xl leading-tight">
              Onde Bots Incríveis Ganham Superpoderes!
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <p className="mb-10 text-lg text-muted-foreground md:text-xl">
              Descubra, adicione e gerencie os bots mais <span className="font-semibold text-primary">zueiros</span> e <span className="font-semibold text-accent">eficientes</span> do Discord. 
              Seu servidor nunca mais será o mesmo (prometemos que será para melhor... talvez 😉).
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 100 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" className="gap-2 button-effect btn-chrome w-full sm:w-auto text-base px-8 py-3" asChild>
              <Link to="/bots">
                <Zap size={20} className="animate-ping-slow" />
                Explorar Bots Lendários
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 button-effect w-full sm:w-auto border-2 border-primary/50 hover:bg-primary/10 hover:text-primary text-base px-8 py-3" asChild>
               <Link to="/add-bot">
                <ShieldCheck size={20} />
                Adicionar Seu Gênio Maligno (Bot)
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="mt-16"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground md:gap-x-8">
              <span className="flex items-center gap-1.5"><Bot size={16} className="text-primary"/> Centenas de Bots</span>
              <span className="flex items-center gap-1.5"><Users size={16} className="text-primary"/> Comunidade Ativa (e zueira)</span>
              <span className="flex items-center gap-1.5"><Star size={16} className="text-primary"/> Avaliações Sinceras (às vezes até demais)</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-primary"/> Bots Verificados (os que não explodem)</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}