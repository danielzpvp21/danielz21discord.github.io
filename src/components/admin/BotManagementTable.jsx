import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit2, Trash2, Search, ShieldCheck, ShieldAlert, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog.jsx";

const BotManagementTable = ({ initialBots, setBots }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBots, setSelectedBots] = useState([]);
  // Use a local state for bots to manage updates within this component if needed
  // but ensure it's synced with the parent state via setBots prop
  const [currentBots, setCurrentBots] = useState(initialBots);

  React.useEffect(() => {
    setCurrentBots(initialBots);
  }, [initialBots]);

  const filteredBots = useMemo(() =>
    currentBots.filter(bot =>
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bot.ownerUsername && bot.ownerUsername.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [currentBots, searchTerm]);

  const updateBotsState = (updatedBots) => {
    setCurrentBots(updatedBots);
    setBots(updatedBots); // Propagate changes to parent
  };

  const handleToggleVerifyBot = (botId) => {
    const updatedBots = currentBots.map(bot =>
      bot.id === botId ? { ...bot, verified: !bot.verified } : bot
    );
    updateBotsState(updatedBots);
    const bot = updatedBots.find(b => b.id === botId);
    toast({ title: `Bot ${bot.verified ? "Verificado ✔️" : "Não Verificado ✖️"}`, description: `O bot ${bot.name} foi atualizado. Parece que alguém apertou o botão certo! 😉` });
  };

  const handleDeleteBot = (botId) => {
    const updatedBots = currentBots.filter(bot => bot.id !== botId);
    updateBotsState(updatedBots);
    toast({ title: "Bot Excluído 🗑️", description: `O bot foi enviado para a lixeira cósmica. Adeus, bot!`, variant: "destructive" });
    setSelectedBots(prev => prev.filter(id => id !== botId));
  };
  
  const handleSelectBot = (botId) => {
    setSelectedBots(prev => 
      prev.includes(botId) ? prev.filter(id => id !== botId) : [...prev, botId]
    );
  };

  const handleSelectAllBots = (checked) => {
    if (checked) {
      setSelectedBots(filteredBots.map(bot => bot.id));
    } else {
      setSelectedBots([]);
    }
  };
  
  const handleBulkAction = (action) => {
    if (selectedBots.length === 0) {
      toast({ title: "Calma lá, chefia! ✋", description: "Selecione um ou mais bots para essa mágica acontecer.", variant: "destructive"});
      return;
    }
    let updatedBotsList = [...currentBots];
    if (action === "verify") {
      updatedBotsList = currentBots.map(bot => selectedBots.includes(bot.id) ? { ...bot, verified: true } : bot);
    } else if (action === "unverify") {
       updatedBotsList = currentBots.map(bot => selectedBots.includes(bot.id) ? { ...bot, verified: false } : bot);
    } else if (action === "delete") {
      updatedBotsList = currentBots.filter(bot => !selectedBots.includes(bot.id));
    }
    updateBotsState(updatedBotsList);
    toast({ title: "Ação em Massa Realizada! ✨", description: `${selectedBots.length} bots foram... bem, você sabe o que aconteceu com eles. 😉` });
    setSelectedBots([]);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Gerenciamento de Criaturas (Bots)</CardTitle>
        <div className="mt-4 flex flex-col sm:flex-row gap-2 items-center">
          <div className="relative flex-grow w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Procurar bots (eles se escondem bem)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            <Button onClick={() => handleBulkAction("verify")} variant="outline" size="sm" className="bg-green-500/10 hover:bg-green-500/20 text-green-700 border-green-500">
              Verificar Selecionados <ShieldCheck className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => handleBulkAction("unverify")} variant="outline" size="sm" className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-700 border-yellow-500">
              Desverificar <ShieldAlert className="ml-2 h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">Deletar <Trash2 className="ml-2 h-4 w-4" /></Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar Extermínio em Massa? 😱</DialogTitle>
                  <DialogDescription>
                    Tem certeza que deseja enviar os {selectedBots.length} bots selecionados para o vácuo? Isso é tipo... para sempre!
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancelar (Ufa!) </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="destructive" onClick={() => handleBulkAction("delete")}>Deletar (Sem Choro!) </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox 
                    checked={selectedBots.length === filteredBots.length && filteredBots.length > 0}
                    onCheckedChange={handleSelectAllBots}
                    aria-label="Selecionar todos os bots"
                  />
                </TableHead>
                <TableHead>Nome (Apelido Carinhoso)</TableHead>
                <TableHead className="hidden md:table-cell">Dono (Criador da Fera)</TableHead>
                <TableHead>Status (Tá vivo?)</TableHead>
                <TableHead className="text-right">Ações (Varinha Mágica)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBots.map((bot) => (
                <TableRow key={bot.id} data-state={selectedBots.includes(bot.id) ? "selected" : ""}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedBots.includes(bot.id)}
                      onCheckedChange={() => handleSelectBot(bot.id)}
                      aria-label={`Selecionar bot ${bot.name}`}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{bot.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{bot.ownerUsername || "Mistério 👻"}</TableCell>
                  <TableCell>
                    <Badge variant={bot.verified ? "default" : "secondary"} className={bot.verified ? "bg-green-500 hover:bg-green-600 text-white" : "bg-yellow-500 hover:bg-yellow-600 text-white"}>
                      {bot.verified ? "Verificado 👍" : "Pendente 🤔"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" asChild title="Ver Detalhes (Espiar)">
                      <Link to={`/bots/${bot.id}`}><Eye className="h-4 w-4" /></Link>
                    </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleToggleVerifyBot(bot.id)} title={bot.verified ? "Desverificar (Tirar o selo)" : "Verificar (Dar o selo mágico)"}>
                      {bot.verified ? <RotateCcw className="h-4 w-4 text-yellow-600"/> : <ShieldCheck className="h-4 w-4 text-green-600"/>}
                    </Button>
                    <Button variant="ghost" size="icon" asChild title="Editar (Tunada no Bot)">
                        <Link to={`/bots/${bot.id}?edit=true`}><Edit2 className="h-4 w-4" /></Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" title="Deletar (Adeus!)"><Trash2 className="h-4 w-4" /></Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirmar Desaparecimento Mágico? ✨</DialogTitle>
                          <DialogDescription>
                            Certeza que quer fazer o bot "{bot.name}" sumir? Ele pode ficar triste... ou aliviado.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                           <DialogClose asChild><Button variant="outline">Cancelar (Ele agradece!) </Button></DialogClose>
                           <DialogClose asChild><Button variant="destructive" onClick={() => handleDeleteBot(bot.id)}>Deletar (POOF!) </Button></DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredBots.length === 0 && <p className="p-4 text-center text-muted-foreground">Nenhum bot encontrado. Parece que fugiram todos! 🏃‍♂️💨</p>}
      </CardContent>
    </Card>
  );
};

export default BotManagementTable;