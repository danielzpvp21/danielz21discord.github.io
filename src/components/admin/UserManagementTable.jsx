import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit2, UserX, Search, Shield, UserCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog.jsx";

const UserManagementTable = ({ users: initialUsers }) => {
  const { toast } = useToast();
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [users, setUsers] = useState(initialUsers);

  const filteredUsers = useMemo(() =>
    users.filter(user =>
      user.username.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
    ), [users, userSearchTerm]);

  const handleToggleAdmin = (userId) => {
    setUsers(prevUsers => 
        prevUsers.map(user => 
            user.id === userId ? {...user, isAdmin: !user.isAdmin} : user
        )
    );
    const user = users.find(u => u.id === userId);
    toast({
        title: `Permissões Alteradas! ${user.isAdmin ? '🚀' : '🔒'}`,
        description: `${user.username} agora é ${user.isAdmin ? 'um mortal comum' : 'um semi-deus (admin)'}. Que a força esteja com ele(a)!`
    });
  };

  const handleDeleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    const user = users.find(u => u.id === userId);
     toast({
        title: `Usuário Desintegrado! 💥`,
        description: `${user.username} foi enviado para a dimensão dos emails não lidos.`,
        variant: "destructive"
    });
  }


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Gerenciamento de Mortais (Usuários)</CardTitle>
        <div className="mt-4 relative flex-grow w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Caçar usuários por nome ou e-mail..."
            value={userSearchTerm}
            onChange={(e) => setUserSearchTerm(e.target.value)}
            className="w-full pl-9"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username (Codinome)</TableHead>
                <TableHead className="hidden md:table-cell">Email (Pergaminho Secreto)</TableHead>
                <TableHead>Bots (Exército)</TableHead>
                <TableHead>Admin (Nível de Poder)</TableHead>
                <TableHead className="hidden sm:table-cell">Desde (Era)</TableHead>
                <TableHead className="text-right">Ações (Feitiços)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                  <TableCell>{user.botsCount}</TableCell>
                  <TableCell>
                    <Badge variant={user.isAdmin ? "default" : "secondary"} className={user.isAdmin ? "bg-primary text-primary-foreground" : ""}>
                      {user.isAdmin ? "Admin 👑" : "Mortal 🙏"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{user.joinedDate}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon" title="Olhar Perfil (Bola de Cristal)"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleToggleAdmin(user.id)} title={user.isAdmin ? "Revogar Poderes Divinos" : "Conceder Poderes Divinos"}>
                        {user.isAdmin ? <UserCheck className="h-4 w-4 text-green-500"/> : <Shield className="h-4 w-4 text-orange-500"/>}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                         <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80" title="Banir (Expulsar do Olimpo)"><UserX className="h-4 w-4" /></Button>
                      </DialogTrigger>
                       <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Banir o Usuário "{user.username}"?</DialogTitle>
                          <DialogDescription>
                            Tem certeza que quer chutar "{user.username}" para fora do clube? Ele(a) pode chorar... ou tramar vingança! 😈
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                           <DialogClose asChild><Button variant="outline">Cancelar (Ele(a) escapou!) </Button></DialogClose>
                           <DialogClose asChild><Button variant="destructive" onClick={() => handleDeleteUser(user.id)}>Banir (Adeus, Mortal!) </Button></DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredUsers.length === 0 && <p className="p-4 text-center text-muted-foreground">Nenhum usuário encontrado. Será que foram todos abduzidos? 👽</p>}
      </CardContent>
    </Card>
  );
};

export default UserManagementTable;