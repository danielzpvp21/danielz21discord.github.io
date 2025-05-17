import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, ShieldCheck, XCircle } from "lucide-react";

const BotDetailHeader = ({ bot, canEdit, isEditing, onEditToggle }) => {
  return (
    <Card className="overflow-hidden shadow-xl bot-card">
      <CardHeader className="relative bg-gradient-to-br from-primary to-accent p-0">
        <div className="h-48 w-full overflow-hidden">
          <img-replace 
            src={bot.banner || "https://images.unsplash.com/photo-1580894732444-8293ffa0ba10"} 
            alt={`${bot.name} banner`} 
            className="h-full w-full object-cover opacity-80" 
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-black/40 p-6 backdrop-blur-sm">
          <div className="flex flex-col items-start gap-4 md:flex-row">
            <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
              <AvatarImage src={bot.avatar} alt={bot.name} />
              <AvatarFallback className="text-3xl bg-primary/20 text-primary">{bot.name ? bot.name.substring(0, 2).toUpperCase() : "B?"}</AvatarFallback>
            </Avatar>
            <div className="mt-2 md:mt-0">
              <CardTitle className="text-4xl font-bold text-primary-foreground">{bot.name}</CardTitle>
              {bot.verified && (
                <Badge variant="secondary" className="mt-1 inline-flex items-center gap-1 bg-green-500 text-white">
                  <ShieldCheck size={14}/> Verificado (Esse é dos bons!)
                </Badge>
              )}
              <CardDescription className="mt-1 text-sm text-primary-foreground/80">
                {bot.shortDescription || "Um bot tão incrível que palavras não o descrevem... ou o criador esqueceu de colocar. 😅"}
              </CardDescription>
            </div>
          </div>
        </div>
        {canEdit && (
          <Button 
            onClick={onEditToggle} 
            variant="outline" 
            size="icon" 
            className="absolute right-4 top-4 bg-background/70 hover:bg-background text-foreground"
            aria-label={isEditing ? "Cancelar edição" : "Editar bot"}
          >
            {isEditing ? <XCircle size={18} className="text-destructive" /> : <Edit2 size={18} />}
          </Button>
        )}
      </CardHeader>
    </Card>
  );
};

export default BotDetailHeader;