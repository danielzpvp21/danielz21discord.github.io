import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, UploadCloud } from "lucide-react";

const AddBotPage = ({ onAddBotToList }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [botName, setBotName] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [tags, setTags] = useState("");
  const [website, setWebsite] = useState("");
  const [commands, setCommands] = useState(""); // String, to be parsed

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!botName || !shortDescription || !botDescription || !tags) {
      toast({
        title: "Campos faltando, meu chapa! 📝",
        description: "Nome, descrição curta, descrição completa e tags são tipo... obrigatórios, sabe?",
        variant: "destructive",
      });
      return;
    }
    
    // Basic invite link validation (very basic)
    if (inviteLink && !inviteLink.startsWith("https://discord.com/api/oauth2/authorize")) {
        toast({
            title: "Link de Convite Estranho... 🤔",
            description: "O link de convite parece suspeito. Geralmente começa com 'https://discord.com/api/oauth2/authorize'.",
            variant: "destructive"
        });
        return;
    }

    const parsedCommands = commands.split('\n')
      .map(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          return { name: parts[0].trim(), description: parts.slice(1).join(':').trim() };
        }
        return null;
      })
      .filter(cmd => cmd && cmd.name);

    const newBot = {
      id: Date.now(), 
      name: botName,
      description: botDescription,
      shortDescription: shortDescription,
      avatar: avatarUrl || `https://robohash.org/${botName.replace(/\s+/g, '')}.png?set=set${Math.floor(Math.random() * 5) + 1}&bgset=bg${Math.floor(Math.random() * 2) + 1}&size=128x128`,
      banner: bannerUrl,
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
      online: true, 
      added: true, 
      popular: false,
      verified: false, // Bots added by users start as unverified
      inviteLink: inviteLink,
      website: website,
      ownerUsername: user?.username, // Associate with logged-in user
      ownerId: user?.id,
      servers: 0,
      rating: 0,
      ratingsCount: 0,
      comments: [],
      commands: parsedCommands,
      addedDate: new Date().toLocaleDateString(),
    };

    onAddBotToList(newBot);
    toast({
      title: "Bot Enviado para Análise! 🚀",
      description: `${botName} foi adicionado à fila. Nossos hamsters analistas vão dar uma olhada... eventualmente.`,
    });
    navigate(`/bots/${newBot.id}`); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-2xl px-4 py-8"
    >
      <Card className="shadow-xl bot-card">
        <CardHeader className="text-center">
          <div className="inline-block rounded-full bg-primary/10 p-3 mx-auto mb-3">
            <UploadCloud className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-primary">Adicione Seu Bot Incrível!</CardTitle>
          <CardDescription>
            Mostre ao mundo sua criação! Preencha os detalhes abaixo e deixe a mágica acontecer.
            Lembre-se, um grande bot vem com grandes responsabilidades (de não bugar tudo 😜).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="botName" className="font-semibold text-muted-foreground">Nome do Bot (Obrigatório)</Label>
              <Input id="botName" value={botName} onChange={(e) => setBotName(e.target.value)} placeholder="Ex: MegaBot Ultra X" required className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="shortDescription" className="font-semibold text-muted-foreground">Descrição Curta (para cards - Obrigatório)</Label>
              <Input id="shortDescription" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Um bot que faz café e domina o mundo!" required className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="botDescription" className="font-semibold text-muted-foreground">Descrição Completa (Obrigatório)</Label>
              <Textarea id="botDescription" value={botDescription} onChange={(e) => setBotDescription(e.target.value)} placeholder="Descreva em detalhes todas as proezas e funcionalidades mirabolantes do seu bot..." rows={4} required className="mt-1"/>
            </div>
             <div>
              <Label htmlFor="avatarUrl" className="font-semibold text-muted-foreground">URL do Avatar (Opcional, mas recomendado!)</Label>
              <Input id="avatarUrl" type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://link.para/avatar.png" className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="bannerUrl" className="font-semibold text-muted-foreground">URL do Banner (Opcional, para deixar bonito!)</Label>
              <Input id="bannerUrl" type="url" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} placeholder="https://link.para/banner.jpg" className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="tags" className="font-semibold text-muted-foreground">Tags (separadas por vírgula - Obrigatório)</Label>
              <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Ex: Moderação, Música, Diversão, Memes" required className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="inviteLink" className="font-semibold text-muted-foreground">Link de Convite (Opcional, mas como vão te adicionar? 🤔)</Label>
              <Input id="inviteLink" type="url" value={inviteLink} onChange={(e) => setInviteLink(e.target.value)} placeholder="https://discord.com/api/oauth2/authorize..." className="mt-1"/>
            </div>
             <div>
              <Label htmlFor="website" className="font-semibold text-muted-foreground">Website (Se tiver, para ostentar!)</Label>
              <Input id="website" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://meu-bot-sensacional.com" className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="commands" className="font-semibold text-muted-foreground">Principais Comandos (formato: comando:descrição - um por linha)</Label>
              <Textarea 
                id="commands" 
                value={commands} 
                onChange={(e) => setCommands(e.target.value)} 
                placeholder="Ex: /magic:Faz algo mágico\n!ping:Responde com pong (que original!)" 
                rows={4} 
                className="mt-1 font-mono text-sm"
              />
            </div>
            <Button type="submit" size="lg" className="w-full button-effect btn-chrome">
              <Sparkles className="mr-2 h-5 w-5 animate-pulse" /> Enviar Bot para o Olimpo (ou quase)
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddBotPage;