import React from "react";
import { motion } from "framer-motion";
import AdminStats from "@/components/admin/AdminStats";
import BotManagementTable from "@/components/admin/BotManagementTable";
import UserManagementTable from "@/components/admin/UserManagementTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboardPage = ({ bots: initialBots, setBots }) => {
  const dummyUsers = React.useMemo(() => [
    { id: 'user1', username: 'AliceDev', email: 'alice@example.com', botsCount: 2, isAdmin: false, joinedDate: '2024-01-15' },
    { id: 'user2', username: 'BobCreator', email: 'bob@example.com', botsCount: 1, isAdmin: false, joinedDate: '2024-02-10' },
    { id: 'user3', username: 'AdminUser', email: 'admin@example.com', botsCount: 0, isAdmin: true, joinedDate: '2023-12-01' },
     { id: 'danAdmin', username: 'SiteAdmin', email: 'danieldemenezesqueiroz@gmail.com', botsCount: 0, isAdmin: true, joinedDate: '2023-11-01' },
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <CardHeader className="mb-6 px-0">
        <CardTitle className="text-4xl font-bold text-primary">Painel dos Deuses (Admin)</CardTitle>
        <CardDescription>Aqui você controla o universo... digo, a plataforma. Use com sabedoria (ou não 😈).</CardDescription>
      </CardHeader>

      <AdminStats bots={initialBots} users={dummyUsers} />

      <Tabs defaultValue="bots" className="w-full mt-8">
        <TabsList className="mb-4 grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="bots">Gerenciar Bots (Criaturas)</TabsTrigger>
          <TabsTrigger value="users">Gerenciar Usuários (Mortais)</TabsTrigger>
          <TabsTrigger value="settings" className="hidden md:inline-block">Configurações (Alavancas)</TabsTrigger>
        </TabsList>
        <TabsContent value="bots">
          <BotManagementTable initialBots={initialBots} setBots={setBots} />
        </TabsContent>
        <TabsContent value="users">
          <UserManagementTable users={dummyUsers} />
        </TabsContent>
        <TabsContent value="settings">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Configurações da Plataforma</CardTitle>
                    <CardDescription>Ajuste as engrenagens secretas do site. Cuidado para não quebrar nada! 🔧</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Em breve: muitas alavancas e botões piscantes para você apertar!</p>
                    <img  alt="Engrenagens e botões de um painel de controle" className="mt-4 w-full h-auto rounded-md opacity-70" src="https://images.unsplash.com/photo-1685764373306-df5ad1141594" />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdminDashboardPage;