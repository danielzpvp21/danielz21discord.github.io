import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";

const BotEditForm = ({ botData, onDataChange, onSave, onCancel }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    onDataChange(name, type === 'checkbox' ? checked : value);
  };

  const handleTagsChange = (e) => {
    onDataChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== ""));
  };

  const commandsToString = (commandsArray) => {
    return commandsArray.map(cmd => `${cmd.name}:${cmd.description}`).join('\n');
  };

  const stringToCommands = (commandsString) => {
    return commandsString.split('\n')
      .map(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          return { name: parts[0].trim(), description: parts.slice(1).join(':').trim() };
        }
        return null; 
      })
      .filter(cmd => cmd && cmd.name); 
  };

  const handleCommandsChange = (e) => {
    onDataChange('commands', stringToCommands(e.target.value));
  };

  return (
    <Card className="mt-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-primary">Editar Detalhes do Bot "{botData.name}"</CardTitle>
        <CardDescription>Faça as alterações necessárias. Lembre-se: grandes poderes trazem grandes responsabilidades... de não quebrar nada. 😉</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div>
          <Label htmlFor="name" className="font-semibold">Nome do Bot (Obrigatório)</Label>
          <Input id="name" name="name" value={botData.name || ""} onChange={handleInputChange} className="mt-1" placeholder="Ex: SuperBot Legal"/>
          {!botData.name && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle size={14} className="mr-1"/>Nome é obrigatório, capitão!</p>}
        </div>

        <div>
          <Label htmlFor="shortDescription" className="font-semibold">Descrição Curta (para cards - Obrigatório)</Label>
          <Input id="shortDescription" name="shortDescription" value={botData.shortDescription || ""} onChange={handleInputChange} className="mt-1" placeholder="Um bot que faz coisas incríveis!"/>
           {!botData.shortDescription && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle size={14} className="mr-1"/>Descrição curta é essencial!</p>}
        </div>

        <div>
          <Label htmlFor="description" className="font-semibold">Descrição Completa (Obrigatório)</Label>
          <Textarea id="description" name="description" value={botData.description || ""} onChange={handleInputChange} rows={5} className="mt-1" placeholder="Descreva todas as maravilhas que seu bot pode fazer..."/>
          {!botData.description && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle size={14} className="mr-1"/>A descrição completa ajuda muito!</p>}
        </div>

        <div>
          <Label htmlFor="avatar" className="font-semibold">URL do Avatar do Bot</Label>
          <Input id="avatar" name="avatar" value={botData.avatar || ""} onChange={handleInputChange} className="mt-1" placeholder="https://exemplo.com/avatar.png"/>
        </div>
        
        <div>
          <Label htmlFor="banner" className="font-semibold">URL do Banner do Bot</Label>
          <Input id="banner" name="banner" value={botData.banner || ""} onChange={handleInputChange} className="mt-1" placeholder="https://exemplo.com/banner.png"/>
        </div>

        <div>
          <Label htmlFor="tags" className="font-semibold">Tags (separadas por vírgula - Obrigatório)</Label>
          <Input id="tags" name="tags" value={(botData.tags || []).join(', ')} onChange={handleTagsChange} className="mt-1" placeholder="Ex: Música, Moderação, Diversão"/>
          {(!botData.tags || botData.tags.length === 0) && <p className="text-xs text-red-500 mt-1 flex items-center"><AlertCircle size={14} className="mr-1"/>Pelo menos uma tag, por favor!</p>}
          <div className="mt-2 flex flex-wrap gap-1">
            {(botData.tags || []).map(tag => tag && <Badge key={tag} variant="secondary">{tag}</Badge>)}
          </div>
        </div>

        <div>
          <Label htmlFor="inviteLink" className="font-semibold">Link de Convite do Bot</Label>
          <Input id="inviteLink" name="inviteLink" value={botData.inviteLink || ""} onChange={handleInputChange} className="mt-1" placeholder="https://discord.com/api/oauth2/authorize..."/>
        </div>

        <div>
          <Label htmlFor="website" className="font-semibold">Website do Bot (Opcional)</Label>
          <Input id="website" name="website" value={botData.website || ""} onChange={handleInputChange} className="mt-1" placeholder="https://meu-bot-incrivel.com"/>
        </div>
        
        <div>
          <Label htmlFor="commands" className="font-semibold">Comandos (formato: nome_comando:descrição - um por linha)</Label>
          <Textarea 
            id="commands" 
            name="commands" 
            value={botData.commands ? commandsToString(botData.commands) : ""} 
            onChange={handleCommandsChange} 
            rows={5} 
            className="mt-1 font-mono text-sm"
            placeholder="Ex: /play:Toca uma música épica\n!ban:Bane o usuário chato"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="online" name="online" checked={botData.online || false} onCheckedChange={(checked) => onDataChange('online', checked)} />
          <Label htmlFor="online" className="font-semibold">Bot está Online?</Label>
        </div>
        
        {/* isAdmin check would typically be handled by backend or context, here just for display */}
        { botData.hasOwnProperty('verified') && (
            <div className="flex items-center space-x-2">
            <Checkbox id="verified" name="verified" checked={botData.verified || false} onCheckedChange={(checked) => onDataChange('verified', checked)} />
            <Label htmlFor="verified" className="font-semibold">Bot Verificado? (Apenas Admins)</Label>
            </div>
        )}


        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onCancel} className="button-effect">
            Cancelar (Fugir covardemente)
          </Button>
          <Button onClick={onSave} className="button-effect btn-chrome">
            Salvar Alterações (e cruzar os dedos 🤞)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotEditForm;