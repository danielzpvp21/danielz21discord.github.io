import React from "react";
import { motion } from "framer-motion";
import { BotCard } from "@/components/BotCard";
import { Frown } from "lucide-react";

export function BotList({ bots, onAddBot, onRemoveBot }) {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  if (!bots || bots.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-60 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 p-8 text-center"
      >
        <Frown className="mb-4 h-16 w-16 text-muted-foreground opacity-50" />
        <p className="text-xl font-semibold text-muted-foreground">Nenhum bot encontrado</p>
        <p className="text-sm text-muted-foreground">Tente refinar sua busca ou explorar outras categorias.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {bots.map((bot) => (
        <BotCard 
          key={bot.id} 
          bot={bot} 
          onAddBot={onAddBot} 
          onRemoveBot={onRemoveBot} 
        />
      ))}
    </motion.div>
  );
}