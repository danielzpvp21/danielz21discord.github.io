import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare as MessageSquareText, History, Code2 } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const BotDetailContent = ({ bot, onRate, onComment }) => {
  const [currentRating, setCurrentRating] = useState(bot.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newCommentText, setNewCommentText] = useState("");
  const { user } = useAuth();

  const handleSetRating = (rate) => {
    setCurrentRating(rate);
    onRate(rate);
  };

  const handleNewCommentSubmit = () => {
    onComment(newCommentText);
    setNewCommentText("");
  };

  return (
    <div className="md:col-span-2">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="overview">
            <History className="mr-2 h-4 w-4 sm:hidden md:inline-block" /> Visão Geral
          </TabsTrigger>
          <TabsTrigger value="commands">
            <Code2 className="mr-2 h-4 w-4 sm:hidden md:inline-block" /> Comandos
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <MessageSquareText className="mr-2 h-4 w-4 sm:hidden md:inline-block" /> Avaliações
          </TabsTrigger>
          {/* Add more tabs as needed, e.g., Changelog, Support */}
        </TabsList>

        <TabsContent value="overview" className="mt-6 rounded-md border bg-card p-6">
          <h3 className="mb-3 text-xl font-semibold text-primary">Sobre o {bot.name}</h3>
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {bot.description || "Este bot é um mistério envolto em código. 🕵️‍♂️"}
          </p>
          <div className="mt-6">
            <h4 className="mb-2 text-lg font-medium">Tags Populares:</h4>
            <div className="flex flex-wrap gap-2">
              {(bot.tags || []).map(tag => (
                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer transition-transform hover:scale-105">
                  {tag}
                </Badge>
              ))}
              {(!bot.tags || bot.tags.length === 0) && <p className="text-sm text-muted-foreground">Este bot é tão único que não se encaixa em tags! Ou alguém esqueceu de adicionar... 🤔</p>}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="commands" className="mt-6 rounded-md border bg-card p-6">
          <h3 className="mb-3 text-xl font-semibold text-primary">Comandos Mágicos do {bot.name}</h3>
          {(bot.commands && bot.commands.length > 0) ? (
            <ul className="space-y-3">
              {bot.commands.map((cmd, index) => (
                <li key={index} className="rounded-md border border-border bg-background/50 p-4 shadow-sm transition-shadow hover:shadow-md">
                  <p className="font-mono text-sm font-semibold text-primary">{cmd.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{cmd.description || "Este comando é tão secreto que nem descrição tem!"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Ops! Parece que os comandos deste bot foram abduzidos por aliens. 👽</p>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="mt-6 rounded-md border bg-card p-6">
          <h3 className="mb-3 text-xl font-semibold text-primary">O que a galera diz sobre {bot.name}?</h3>
          <div className="mb-6">
            <h4 className="mb-2 text-sm font-medium">Sua avaliação (seja sincero, o bot não morde... eu acho):</h4>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={28}
                  className={`cursor-pointer transition-all duration-150 ${ (hoverRating || currentRating) >= star ? "text-yellow-400 fill-yellow-400 scale-110" : "text-muted-foreground hover:text-yellow-300"}`}
                  onClick={() => handleSetRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {(bot.comments && bot.comments.length > 0) ? bot.comments.map((comment, index) => (
              <div key={index} className="rounded-md border bg-background/50 p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs mb-1">
                  <p className="font-semibold text-primary">{comment.user || "Anônimo Corajoso"}</p>
                  <p className="text-muted-foreground">{comment.date || "Faz tempo..."}</p>
                </div>
                <p className="text-sm leading-relaxed">{comment.text || "Disse tanto que não disse nada."}</p>
              </div>
            )) : <p className="text-muted-foreground py-4 text-center">Ninguém comentou ainda. Seja o primeiro a quebrar o silêncio! 🤫 Ou talvez o bot seja tão perfeito que deixou todos sem palavras.</p>}
          </div>

          {user ? (
            <div className="mt-6 pt-6 border-t">
              <h4 className="text-md font-semibold mb-2">Deixe seu comentário épico:</h4>
              <Textarea 
                value={newCommentText} 
                onChange={e => setNewCommentText(e.target.value)} 
                placeholder={`O que você achou do ${bot.name}? Solta o verbo!`} 
                className="mb-3 min-h-[100px]"
              />
              <Button onClick={handleNewCommentSubmit} size="sm" className="button-effect">
                Enviar Comentário (e torcer para ser engraçado)
              </Button>
            </div>
          ) : (
            <p className="mt-6 pt-6 border-t text-sm text-muted-foreground">
              <Link to="/login" className="text-primary underline hover:text-primary/80 font-semibold">Faça login</Link> para comentar e mostrar ao mundo sua sabedoria (ou falta dela 😂).
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BotDetailContent;