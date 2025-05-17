import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Edit3, Save, UserCircle2, Link as LinkIcon, Github, Twitter, Settings } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Link as RouterLink } from "react-router-dom";

const UserProfilePage = () => {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: "",
    bio: "",
    avatarUrl: "",
    socialLinks: { github: "", twitter: "", website: "" },
    myBots: [], 
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        bio: user.bio || "Entusiasta de bots do Discord!",
        avatarUrl: user.avatarUrl || `https://robohash.org/${user.username}.png?set=set5&size=128x128`,
        socialLinks: user.socialLinks || { github: "", twitter: "", website: "" },
        myBots: user.myBots || [], 
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }));
  };
  
  const handleAvatarFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({...prev, avatarUrl: reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    updateUser({ 
      ...user, 
      username: profileData.username, 
      bio: profileData.bio, 
      avatarUrl: profileData.avatarUrl,
      socialLinks: profileData.socialLinks 
    });
    setIsEditing(false);
    toast({ title: "Perfil Atualizado!", description: "Suas informações foram salvas." });
  };

  if (!user) {
    return <div className="flex h-screen items-center justify-center"><p>Carregando perfil...</p></div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-4xl px-4 py-8"
    >
      <Card className="overflow-hidden shadow-xl bot-card">
        <CardHeader className="relative bg-gradient-to-r from-primary to-accent p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage src={profileData.avatarUrl} alt={profileData.username} />
                <AvatarFallback className="text-3xl">{profileData.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <label htmlFor="avatarUpload" className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-primary p-1.5 text-primary-foreground shadow-md hover:bg-primary/90">
                  <Edit3 size={14} />
                  <input type="file" id="avatarUpload" accept="image/*" className="sr-only" onChange={handleAvatarFileChange} />
                </label>
              )}
            </div>
            <div>
              {isEditing ? (
                <Input 
                  name="username" 
                  value={profileData.username} 
                  onChange={handleChange} 
                  className="mb-1 text-3xl font-bold !text-primary-foreground !bg-transparent !border-primary-foreground/50 placeholder:text-primary-foreground/70"
                  placeholder="Seu nome de usuário"
                />
              ) : (
                <CardTitle className="text-3xl font-bold text-primary-foreground">{profileData.username}</CardTitle>
              )}
              {isEditing ? (
                <Textarea 
                  name="bio" 
                  value={profileData.bio} 
                  onChange={handleChange} 
                  className="mt-1 text-sm !text-primary-foreground/90 !bg-transparent !border-primary-foreground/50 placeholder:text-primary-foreground/70"
                  rows={2}
                  placeholder="Sua biografia..."
                />
              ) : (
                 <CardDescription className="mt-1 text-sm text-primary-foreground/90">{profileData.bio}</CardDescription>
              )}
            </div>
          </div>
          <Button 
            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)} 
            variant="outline" 
            size="sm" 
            className="absolute right-6 top-6 gap-2 bg-background/20 text-primary-foreground hover:bg-background/40 border-primary-foreground/50 hover:border-primary-foreground"
          >
            {isEditing ? <Save size={16}/> : <Edit3 size={16} />}
            {isEditing ? "Salvar" : "Editar Perfil"}
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="myBots" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="myBots"><Bot className="mr-1 inline-block h-4 w-4"/>Meus Bots</TabsTrigger>
              <TabsTrigger value="social"><LinkIcon className="mr-1 inline-block h-4 w-4"/>Redes Sociais</TabsTrigger>
              {user.isAdmin && <TabsTrigger value="adminSettings" className="hidden md:inline-flex"><Settings className="mr-1 inline-block h-4 w-4"/>Admin</TabsTrigger> }
            </TabsList>
            
            <TabsContent value="myBots" className="mt-6">
              <h3 className="mb-4 text-xl font-semibold">Bots Criados</h3>
              {profileData.myBots && profileData.myBots.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {profileData.myBots.map(bot => (
                    <RouterLink key={bot.id} to={`/bots/${bot.id}`}>
                      <Card className="h-full cursor-pointer transition-all hover:shadow-md hover:border-primary/50">
                        <CardHeader>
                          <CardTitle className="text-lg">{bot.name}</CardTitle>
                          <CardDescription className="text-xs">{bot.shortDescription}</CardDescription>
                        </CardHeader>
                      </Card>
                    </RouterLink>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Você ainda não adicionou nenhum bot. <RouterLink to="/add-bot" className="text-primary hover:underline">Adicionar agora?</RouterLink></p>
              )}
            </TabsContent>

            <TabsContent value="social" className="mt-6">
              <h3 className="mb-4 text-xl font-semibold">Conecte-se</h3>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Github size={20} className="text-muted-foreground"/>
                      <Input name="github" value={profileData.socialLinks.github} onChange={(e) => handleSocialLinkChange('github', e.target.value)} placeholder="Seu GitHub (ex: username)"/>
                    </div>
                    <div className="flex items-center gap-2">
                      <Twitter size={20} className="text-muted-foreground"/>
                      <Input name="twitter" value={profileData.socialLinks.twitter} onChange={(e) => handleSocialLinkChange('twitter', e.target.value)} placeholder="Seu Twitter (ex: @username)"/>
                    </div>
                     <div className="flex items-center gap-2">
                      <LinkIcon size={20} className="text-muted-foreground"/>
                      <Input name="website" value={profileData.socialLinks.website} onChange={(e) => handleSocialLinkChange('website', e.target.value)} placeholder="Seu Website (ex: https://meusite.com)"/>
                    </div>
                  </>
                ) : (
                  <>
                    {profileData.socialLinks.github && <p><a href={`https://github.com/${profileData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline"><Github size={16}/> GitHub</a></p>}
                    {profileData.socialLinks.twitter && <p><a href={`https://twitter.com/${profileData.socialLinks.twitter.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline"><Twitter size={16}/> Twitter</a></p>}
                    {profileData.socialLinks.website && <p><a href={profileData.socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline"><LinkIcon size={16}/> Website</a></p>}
                    {!profileData.socialLinks.github && !profileData.socialLinks.twitter && !profileData.socialLinks.website && (
                      <p className="text-muted-foreground">Nenhum link social adicionado. Edite seu perfil para adicionar.</p>
                    )}
                  </>
                )}
              </div>
            </TabsContent>
            
            {user.isAdmin && (
              <TabsContent value="adminSettings" className="mt-6">
                <h3 className="mb-4 text-xl font-semibold">Configurações de Administrador</h3>
                <p className="text-muted-foreground">Esta área é reservada para funcionalidades administrativas.</p>
                <Button asChild className="mt-4">
                  <RouterLink to="/admin">Acessar Painel Admin</RouterLink>
                </Button>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfilePage;