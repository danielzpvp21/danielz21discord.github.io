import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { UserPlus, Mail, Lock, User } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username || !email || !password || !confirmPassword) {
      toast({ title: "Erro de Cadastro", description: "Por favor, preencha todos os campos.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Erro de Cadastro", description: "As senhas não coincidem.", variant: "destructive" });
      setIsLoading(false);
      return;
    }
    
    if (password.length < 6) {
      toast({ title: "Erro de Cadastro", description: "A senha deve ter pelo menos 6 caracteres.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // Simulação de registro
    try {
      // Aqui você chamaria sua função de registro real, ex: await apiRegister(username, email, password)
      // Por agora, vamos simular um registro bem-sucedido
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      
      const success = register(username, email, password);

      if (success) {
        toast({ title: "Cadastro Bem-sucedido!", description: "Sua conta foi criada. Faça login para continuar." });
        navigate("/login");
      } else {
        toast({ title: "Erro de Cadastro", description: "Não foi possível criar a conta. Email ou usuário já pode existir.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Erro de Cadastro", description: "Ocorreu um erro. Tente novamente.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-background to-accent/30 p-4"
    >
      <Card className="w-full max-w-md shadow-xl bot-card overflow-hidden">
        <div className="h-2 w-full animated-gradient"></div>
        <CardHeader className="text-center">
           <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <UserPlus size={32} />
          </motion.div>
          <CardTitle className="text-3xl font-bold text-primary">Crie sua Conta</CardTitle>
          <CardDescription>Junte-se à comunidade e comece a explorar e adicionar bots!</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-base flex items-center"><User className="mr-2 h-4 w-4 text-muted-foreground"/>Nome de Usuário</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Seu nome de usuário único" required className="py-3 text-base"/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-base flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground"/>Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required className="py-3 text-base"/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-base flex items-center"><Lock className="mr-2 h-4 w-4 text-muted-foreground"/>Senha</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Crie uma senha forte" required className="py-3 text-base"/>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword" className="text-base flex items-center"><Lock className="mr-2 h-4 w-4 text-muted-foreground"/>Confirmar Senha</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repita sua senha" required className="py-3 text-base"/>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" size="lg" className="w-full button-effect btn-chrome" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default RegisterPage;