import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, MessageSquare, ShieldCheck, ExternalLink, Info, Server, CalendarDays } from "lucide-react";

const BotDetailSidebar = ({ bot, onInvite }) => {
  const stats = [
    { icon: Star, label: "Avaliação Média", value: `${(bot.rating || 0).toFixed(1)} (${bot.ratingsCount || 0})`, color: "text-yellow-400" },
    { icon: Server, label: "Servidores Ativos", value: bot.servers ? bot.servers.toLocaleString() : "N/A", color: "text-blue-500" },
    { icon: MessageSquare, label: "Total de Comentários", value: bot.comments ? bot.comments.length : 0, color: "text-green-500" },
    { icon: CalendarDays, label: "Adicionado em", value: bot.addedDate || "Data Misteriosa", color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6 md:col-span-1">
      <Button 
        onClick={onInvite} 
        size="lg" 
        className="w-full button-effect btn-chrome group"
        aria-label={`Adicionar ${bot.name} ao servidor`}
      >
        <Info className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-[360deg]" /> 
        Convidar {bot.name} (Cuidado, ele come cookies 🍪)
      </Button>
      
      {bot.website && (
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full button-effect group" 
          onClick={() => window.open(bot.website, "_blank")}
          aria-label={`Visitar website de ${bot.name}`}
        >
          <ExternalLink className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /> 
          Visitar Website (Se tiver coragem 🚀)
        </Button>
      )}

      <Card className="bg-card/50 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Users className="mr-2 h-5 w-5 text-primary" />
            Estatísticas do Bot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {stats.map(stat => (
            <div key={stat.label} className="flex items-center justify-between">
              <div className="flex items-center">
                <stat.icon size={16} className={`mr-2 ${stat.color}`} />
                <span className="text-muted-foreground">{stat.label}:</span>
              </div>
              <span className="font-semibold">{stat.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
                <ShieldCheck size={16} className={`mr-2 ${bot.online ? 'text-green-500' : 'text-red-500'}`} />
                <span className="text-muted-foreground">Status:</span>
            </div>
            <span className={`font-semibold flex items-center gap-1.5 ${bot.online ? 'text-green-500' : 'text-red-500'}`}>
              <span className={`h-2.5 w-2.5 rounded-full ${bot.online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              {bot.online ? "Online (e aprontando!)" : "Offline (tirando uma soneca 😴)"}
            </span>
          </div>
        </CardContent>
      </Card>
      
      {(bot.ownerUsername || bot.ownerId) && (
        <Card className="bg-card/50 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Criador da Fera</CardTitle>
          </CardHeader>
          <CardContent>
             {bot.ownerUsername ? (
                <Link to={`/profile/${bot.ownerId || bot.ownerUsername}`} className="text-primary hover:underline font-semibold flex items-center">
                    <img  
                        alt={`${bot.ownerUsername} avatar`} 
                        className="w-6 h-6 rounded-full mr-2 border border-primary/50"
                     src="https://images.unsplash.com/photo-1691398495617-18457fbf826d" />
                    {bot.ownerUsername}
                </Link>
             ) : (
                <p className="text-muted-foreground">Criador anônimo (provavelmente um gênio do mal 😈).</p>
             )}
             
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BotDetailSidebar;