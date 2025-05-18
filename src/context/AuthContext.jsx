import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const ADMIN_EMAIL = "danieldemenezesqueiroz@gmail.com";
const ADMIN_PASS = "12345677Dqq;;;"; 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('discordBotManagerUsers');
    let initialUsers = savedUsers ? JSON.parse(savedUsers) : [];

    // Check if admin exists, if not, create or update
    let adminUser = initialUsers.find(u => u.email === ADMIN_EMAIL);
    if (adminUser) {
      if (!adminUser.isAdmin || adminUser.password !== ADMIN_PASS) {
        adminUser.isAdmin = true;
        adminUser.password = ADMIN_PASS; // Update password if necessary
      }
    } else {
      initialUsers.push({
        id: Date.now().toString() + "_admin",
        username: "SiteAdmin",
        email: ADMIN_EMAIL,
        password: ADMIN_PASS,
        isAdmin: true,
        bio: 'Dono e Mestre Supremo deste site! 👑 Se precisar de algo, reze três vezes e talvez eu apareça. Ou não. 😜',
        avatarUrl: `https://robohash.org/SiteAdmin.png?set=set2&size=128x128`,
        socialLinks: { github: '', twitter: '', website: '' },
        myBots: []
      });
    }
    localStorage.setItem('discordBotManagerUsers', JSON.stringify(initialUsers));
    return initialUsers;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('discordBotManagerUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('discordBotManagerUsers', JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('discordBotManagerUser', JSON.stringify(foundUser));
      toast({
        title: "Login efetuado, chefia!",
        description: "Você entrou no sistema. Agora vá dominar o mundo... ou só adicionar uns bots. 🤖",
      });
      return true;
    }
    toast({
      title: "Eita! Algo deu errado 🧐",
      description: "Email ou senha incorretos. Tenta de novo, vai que cola!",
      variant: "destructive",
    });
    return false;
  };

  const register = (username, email, password) => {
    const existingUser = users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      toast({
        title: "Ops! Usuário já existe 🤔",
        description: "Parece que esse e-mail ou nome de usuário já foi abduzido. Tente outro!",
        variant: "destructive",
      });
      return false; 
    }
    
    const isAdminUser = email === ADMIN_EMAIL && password === ADMIN_PASS;

    const newUser = { 
      id: Date.now().toString(), 
      username, 
      email, 
      password, 
      isAdmin: isAdminUser,
      bio: isAdminUser ? 'Dono e Mestre Supremo deste site! 👑 Se precisar de algo, reze três vezes e talvez eu apareça. Ou não. 😜' : 'Apenas um(a) humilde explorador(a) de bots... por enquanto! 😏',
      avatarUrl: `https://robohash.org/${username}.png?set=set${Math.floor(Math.random() * 5) + 1}&size=128x128`,
      socialLinks: { github: '', twitter: '', website: '' },
      myBots: [] 
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    toast({
      title: "Bem-vindo(a) ao clube! 🎉",
      description: "Sua conta foi criada. Prepare-se para a jornada dos bots!",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('discordBotManagerUser');
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('discordBotManagerUser', JSON.stringify(updatedUserData));
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUserData.id ? updatedUserData : u));
  };

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider. Se você já fez isso, talvez precise de um café ☕.');
  }
  return context;
};

// Dummy toast for context, actual toast is imported in components
const toast = (options) => console.log("Toast from AuthContext (dummy):", options.title, options.description);