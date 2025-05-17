import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const BotLoadingSpinner = ({ message }) => {
  const funnyMessages = [
    "Alimentando os hamsters que movem os servidores... 🐹",
    "Procurando o bot nos confins da internet... 🤖💨",
    "Consultando os oráculos do Discord... 🤔",
    "Desviando de pings perdidos... 핑!",
    "Polindo os pixels para uma melhor experiência... ✨",
    "Bot carregando... alimentando com memes e café ☕",
  ];

  const displayMessage = message || funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center text-center p-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className="h-16 w-16 text-primary mb-6" />
      </motion.div>
      <h2 className="text-2xl font-semibold text-primary mb-2">Quase lá...</h2>
      <p className="text-muted-foreground max-w-md">{displayMessage}</p>
      <div className="mt-8 w-full max-w-xs overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-2 bg-primary"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};