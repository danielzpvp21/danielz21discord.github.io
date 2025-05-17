import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Users, ShieldCheck, Activity } from "lucide-react";
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color }) => {
  const IconComponent = icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <IconComponent className={`h-5 w-5 ${color || 'text-primary'}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">Total na plataforma</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};


const AdminStats = ({ bots, users }) => {
  const totalBots = bots.length;
  const verifiedBots = bots.filter(b => b.verified).length;
  const totalUsers = users.length;
  // Dummy value for active bots
  const activeBots = Math.floor(totalBots * 0.85); 

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total de Bots" value={totalBots} icon={Bot} color="text-blue-500" />
      <StatCard title="Bots Verificados" value={verifiedBots} icon={ShieldCheck} color="text-green-500" />
      <StatCard title="Total de Usuários" value={totalUsers} icon={Users} color="text-purple-500" />
      <StatCard title="Bots Ativos (estimado)" value={`${activeBots} 👀`} icon={Activity} color="text-orange-500" />
    </div>
  );
};

export default AdminStats;