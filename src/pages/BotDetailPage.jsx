import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button"; // Added import

import BotDetailHeader from "@/components/botdetail/BotDetailHeader";
import BotDetailContent from "@/components/botdetail/BotDetailContent";
import BotDetailSidebar from "@/components/botdetail/BotDetailSidebar";
import BotEditForm from "@/components/botdetail/BotEditForm";
import { BotLoadingSpinner } from "@/components/BotLoadingSpinner";


const BotDetailPage = ({ bots, onUpdateBot }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [bot, setBot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBotData, setEditedBotData] = useState(null);

  useEffect(() => {
    const currentBot = bots.find(b => b.id.toString() === id);
    if (currentBot) {
      setBot(currentBot);
      setEditedBotData({...currentBot});
      setIsLoading(false);
    } else {
      // Simulate loading for a moment then navigate if not found, to avoid flickering
      setTimeout(() => {
        if (!bots.find(b => b.id.toString() === id)) { // Double check after timeout
          toast({ title: "Bot Não Encontrado 🕵️‍♂️", description: "Este bot parece ter se perdido na matrix...", variant: "destructive"});
          navigate("/404");
        }
      }, 500);
    }
  }, [id, bots, navigate, toast]);

  const handleRatingUpdate = (newRating) => {
    if (!user) {
      toast({ title: "Login Necessário 🧐", description: "Para avaliar, primeiro você precisa se conectar. Tipo Wi-Fi!", variant: "destructive" });
      return;
    }
    const updatedBot = { ...bot, rating: newRating, ratingsCount: (bot.ratingsCount || 0) + 1 };
    onUpdateBot(updatedBot);
    setBot(updatedBot); // Update local state immediately
    setEditedBotData(updatedBot); // Sync edit form data
    toast({ title: "Avaliação Enviada! ⭐", description: `Você deu ${newRating} estrelas para ${bot.name}. Ele agradece (eu acho).` });
  };

  const handleCommentAdd = (newCommentText) => {
    if (!user) {
      toast({ title: "Login Necessário 🗣️", description: "Para soltar o verbo, primeiro faça login!", variant: "destructive" });
      return;
    }
    if (newCommentText.trim() === "") {
      toast({ title: "Comentário Vazio? 🤔", description: "Escreva algo interessante... ou engraçado!", variant: "destructive" });
      return;
    }
    const comment = { user: user.username, text: newCommentText, date: new Date().toLocaleDateString() };
    const updatedComments = [...(bot.comments || []), comment];
    const updatedBot = { ...bot, comments: updatedComments };
    onUpdateBot(updatedBot);
    setBot(updatedBot); // Update local state
    setEditedBotData(updatedBot); // Sync edit form data
    toast({ title: "Comentário no Ar! 💬", description: "Sua opinião foi registrada. Que os deuses do Discord a leiam!" });
  };

  const handleInvite = () => {
    if (bot.inviteLink) {
      toast({ title: "Abrindo Portal... ✨", description: `Convidando ${bot.name} para seu servidor. Segura o mouse!`});
      window.open(bot.inviteLink, "_blank");
    } else {
       toast({ title: "Sem Link de Convite 🚫", description: `${bot.name} é tímido e não quer ser convidado agora.`, variant: "destructive" });
    }
  };
  
  const handleEditDataChange = (field, value) => {
    setEditedBotData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEdits = () => {
    if(!editedBotData.name || !editedBotData.shortDescription || !editedBotData.description || !editedBotData.tags.length === 0) {
        toast({ title: "Campos Vazios 텅 빈", description: "Preencha os campos obrigatórios antes de salvar. O bot agradece!", variant: "destructive" });
        return;
    }
    onUpdateBot(editedBotData);
    setBot(editedBotData); // Update main bot state
    setIsEditing(false);
    toast({ title: "Bot Tunado! 🛠️", description: `As informações de ${editedBotData.name} foram atualizadas com sucesso! Ficou um brinco!` });
  };

  if (isLoading) {
    return <BotLoadingSpinner message="Procurando o bot nos confins da internet... 🤖💨" />;
  }

  if (!bot) {
     // This case should ideally be handled by the navigate in useEffect, but as a fallback:
    return (
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <img  alt="Bot triste e perdido" className="w-64 h-64 mb-4" src="https://images.unsplash.com/photo-1697747147941-04a7aefbd0b2" />
        <h1 className="text-3xl font-bold text-destructive">Erro 404 - Bot Fugiu!</h1>
        <p className="text-lg text-muted-foreground">Não encontramos o bot que você procura. Ele deve ter ido tomar um café.</p>
        <Button onClick={() => navigate('/bots')} className="mt-4">Voltar para a lista de Bots (quem sabe ele voltou?)</Button>
      </div>
    );
  }

  const canUserEdit = user && (user.isAdmin || (user.id === bot.ownerId) || (user.username === bot.ownerUsername));


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-5xl px-4 py-8"
    >
      <BotDetailHeader 
        bot={bot} 
        canEdit={canUserEdit} 
        isEditing={isEditing}
        onEditToggle={() => setIsEditing(!isEditing)} 
      />
        
      {isEditing && canUserEdit ? (
        <BotEditForm 
          botData={editedBotData}
          onDataChange={handleEditDataChange}
          onSave={handleSaveEdits}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
          <BotDetailContent 
            bot={bot} 
            onRate={handleRatingUpdate}
            onComment={handleCommentAdd}
          />
          <BotDetailSidebar 
            bot={bot}
            onInvite={handleInvite}
          />
        </div>
      )}
    </motion.div>
  );
};

export default BotDetailPage;