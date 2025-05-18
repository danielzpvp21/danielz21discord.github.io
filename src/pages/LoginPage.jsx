import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { LogIn, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({ title: "Erro de Login", description: "Por favor, preencha email e senha.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    // Simulação de login
    try {
      // Aqui você chamaria sua função de login real, ex: await apiLogin(email, password)
      // Por agora, vamos simular um login bem-sucedido com um usuário mock
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da API
      
      const success = login(email, password); // Tenta logar com o AuthContext

      if (success) {
        toast({ title: "Login Bem-sucedido!", description: "Bem-vindo de volta!" });
        navigate("/"); 
      } else {
         toast({ title: "Erro de Login", description: "Email ou senha inválidos.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Erro de Login", description: "Ocorreu um erro. Tente novamente.", variant: "destructive" });
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
      className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4"
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
            <LogIn size={32} />
          </motion.div>
          <CardTitle className="text-3xl font-bold text-primary">Bem-vindo de Volta!</CardTitle>
          <CardDescription>Faça login para continuar explorando o universo dos bots.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base flex items-center"><Mail className="mr-2 h-4 w-4 text-muted-foreground"/>Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="seu@email.com" 
                required 
                className="py-3 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base flex items-center"><Lock className="mr-2 h-4 w-4 text-muted-foreground"/>Senha</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Sua senha super secreta" 
                required 
                className="py-3 text-base"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
              </div>
              <Link to="#" className="font-medium text-primary hover:underline">Esqueceu a senha?</Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" size="lg" className="w-full button-effect btn-chrome" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Crie uma agora!
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default LoginPage;