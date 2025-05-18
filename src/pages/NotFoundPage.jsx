import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-8 bg-gradient-to-br from-background to-destructive/10 p-4 text-center"
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 5, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "mirror" }}
      >
        <AlertTriangle className="h-32 w-32 text-destructive" />
      </motion.div>
      
      <h1 className="text-6xl font-extrabold tracking-tight text-foreground sm:text-8xl">
        404
      </h1>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
          Oops! Página não encontrada.
        </h2>
        <p className="text-lg text-muted-foreground">
          Parece que você se perdeu no multiverso dos bots.
        </p>
      </div>
      
      <Button asChild size="lg" className="button-effect btn-chrome">
        <Link to="/">Voltar para o Início</Link>
      </Button>

      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/10 to-transparent -z-10"></div>
    </motion.div>
  );
};

export default NotFoundPage;