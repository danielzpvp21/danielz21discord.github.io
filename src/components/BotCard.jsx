import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, CheckCircle2, ShieldCheck, Star, Zap } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function BotCard({ bot, onAddBot, onRemoveBot }) {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleToggleAdd = (e) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!user) {
      toast({
        title: "Alto lá, aventureiro! 🛑",
        description: "Precisa estar logado para capturar este bot. Faça o login e tente de novo!",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (bot.added) {
      onRemoveBot(bot.id);
      toast({
        title: "Bot Libertado! 🕊️",
        description: `${bot.name} foi solto na natureza (removido da sua lista). Tadinho... ou não.`,
        duration: 3000,
      });
    } else {
      onAddBot(bot.id); 
      toast({
        title: "Bot Capturado! 🎯",
        description: `${bot.name} foi adicionado à sua coleção. Use com sabedoria (ou não 😂)!`,
        duration: 3000,
      });
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    hover: { scale: 1.03, y: -5, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="h-full"
    >
      <Link to={`/bots/${bot.id}`} className="block h-full" aria-label={`Ver detalhes de ${bot.name}`}>
        <Card className="bot-card flex h-full flex-col overflow-hidden bg-card/80 backdrop-blur-sm transition-all duration-300 ease-in-out hover:border-primary">
          {bot.banner && (
            <div className="h-24 w-full overflow-hidden">
              <img-replace src={bot.banner} alt={`${bot.name} banner`} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
          )}
          {!bot.banner && <div className="h-2 w-full animated-gradient opacity-70"></div>}

          <CardHeader className="relative z-10 flex-shrink-0 pb-3 pt-4">
            <div className="mb-2 flex items-center justify-between">
              <div className={`absolute -top-7 left-4 rounded-full border-4 p-0.5 shadow-md ${bot.online ? 'border-green-400' : 'border-slate-400'} bg-background`}>
                <Avatar className="h-14 w-14">
                  <AvatarImage src={bot.avatar} alt={bot.name || "Avatar do Bot"} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {bot.name ? bot.name.substring(0, 2).toUpperCase() : "B?"}
                  </AvatarFallback>
                </Avatar>
              </div>
              {bot.verified && (
                <Badge variant="secondary" className="absolute right-3 top-3 bg-green-500/20 text-green-600 border-green-500/30 py-0.5 px-1.5 text-xs">
                  <ShieldCheck size={12} className="mr-1"/> Verificado (confia 👍)
                </Badge>
              )}
            </div>
            <CardTitle className="mt-8 truncate text-xl leading-tight">{bot.name || "Bot Desconhecido"}</CardTitle>
            <div className="flex items-center text-xs text-muted-foreground">
              <Star size={12} className="mr-1 text-yellow-400 fill-yellow-400" /> 
              <span>{(bot.rating || 0).toFixed(1)} ({bot.ratingsCount || 0} avaliações)</span>
              <span className="mx-1.5">·</span>
              <Zap size={12} className="mr-1 text-blue-400" />
              <span>{bot.servers || 0} servidores</span>
            </div>
          </CardHeader>

          <CardContent className="flex-grow pb-3 pt-0">
            <CardDescription className="mb-2 line-clamp-3 text-sm">{bot.shortDescription || bot.description || "Este bot é tão misterioso que nem descrição tem... 🕵️"}</CardDescription>
            <div className="flex flex-wrap gap-1.5">
              {(bot.tags || []).slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="outline"
                  className="border-primary/30 bg-primary/5 px-1.5 py-0.5 text-xs font-medium text-primary/90"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <Button 
              variant={bot.added ? "outline" : "default"} 
              size="sm" 
              onClick={handleToggleAdd}
              className="w-full button-effect group"
              aria-label={bot.added ? `Remover ${bot.name}` : `Adicionar ${bot.name}`}
            >
              {bot.added ? <CheckCircle2 size={16} className="mr-1.5 transition-transform duration-200 group-hover:rotate-12"/> : <PlusCircle size={16} className="mr-1.5 transition-transform duration-200 group-hover:scale-110"/>}
              {bot.added ? "Adicionado (já era!)" : "Adicionar (vai que é tua!)"}
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}