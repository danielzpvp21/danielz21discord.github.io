
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { MessageSquare, Users, Send, ThumbsUp, Heart, Laugh } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useHumor } from '@/context/HumorContext.jsx';
import { useAuth } from '@/context/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip.jsx";


const CommunityPage = () => {
  const { t, i18n } = useTranslation();
  const { humorLevel } = useHumor();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const humorPlaceholders = {
    formal: t('community_chat_input_placeholder_formal'),
    neutral: t('community_chat_input_placeholder_neutral'),
    fun: t('community_chat_input_placeholder_fun'),
  };
  
  const humorSendButton = {
    formal: t('community_chat_send_button_formal'),
    neutral: t('community_chat_send_button_neutral'),
    fun: t('community_chat_send_button_fun'),
  };

  useEffect(() => {
    const storedMessages = localStorage.getItem('communityMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('communityMessages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const messageData = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toISOString(),
      user: {
        name: user?.publicName || user?.username || t('community_anonymous_user'),
        avatar: user?.avatarUrl || `https://robohash.org/${user?.username || 'anon'}.png?set=set${Math.floor(Math.random()*5)+1}&size=40x40`,
        id: user?.id || 'anonymous'
      },
      reactions: { thumbsUp: 0, heart: 0, laugh: 0 } 
    };
    setMessages(prevMessages => [...prevMessages, messageData]);
    setNewMessage("");
  };
  
  const handleReaction = (messageId, reactionType) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.id === messageId 
          ? { ...msg, reactions: { ...msg.reactions, [reactionType]: msg.reactions[reactionType] + 1 } }
          : msg
      )
    );
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-2 sm:px-4 py-8 flex flex-col h-[calc(100vh-11rem)] sm:h-[calc(100vh-8rem)]"
    >
      <CardHeader className="mb-4 text-center shrink-0">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.1}}
          className="inline-block p-3 sm:p-4 rounded-full bg-primary/10 mb-2 sm:mb-4"
        >
          <Users className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
        </motion.div>
        <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
          {t('community_page_title_main')}
        </CardTitle>
        <CardDescription className="mt-1 text-md sm:text-lg text-muted-foreground">
          {humorLevel === 'fun' ? t('community_page_description_fun') : t('community_page_description_neutral')}
        </CardDescription>
      </CardHeader>

      <Card className="flex-grow flex flex-col shadow-xl overflow-hidden">
        <CardHeader className="bg-muted/50 border-b p-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">{t('community_public_chat_title')}</h3>
          </div>
        </CardHeader>
        <ScrollArea className="flex-grow p-4 bg-background/30">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <MessageSquare size={48} className="mb-4 opacity-50" />
              <p>{t('community_chat_empty_state_message')}</p>
              <p className="text-sm">{humorLevel === 'fun' ? t('community_chat_empty_state_prompt_fun') : t('community_chat_empty_state_prompt_neutral')}</p>
            </div>
          ) : (
            messages.map(msg => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex mb-4 ${msg.user.id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-2.5 max-w-[75%] ${msg.user.id === user?.id ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                    <AvatarFallback>{msg.user.name.substring(0,1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col w-full p-3 rounded-xl ${msg.user.id === user?.id ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-muted rounded-tl-none'}`}>
                    <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse mb-1">
                        <span className="text-xs font-semibold">{msg.user.name}</span>
                        <span className="text-xs text-muted-foreground/80">
                          {new Date(msg.timestamp).toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <p className="text-sm font-normal whitespace-pre-wrap break-words">{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1.5 ${msg.user.id === user?.id ? 'justify-end' : 'justify-start'}`}>
                      {[
                        { type: 'thumbsUp', icon: ThumbsUp, count: msg.reactions.thumbsUp },
                        { type: 'heart', icon: Heart, count: msg.reactions.heart },
                        { type: 'laugh', icon: Laugh, count: msg.reactions.laugh }
                      ].map(reaction => (
                        <TooltipProvider key={reaction.type}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={`h-6 w-6 p-0.5 rounded-full hover:bg-accent ${ msg.user.id === user?.id ? 'text-primary-foreground/70 hover:text-primary-foreground' : 'text-muted-foreground/70 hover:text-foreground' }`}
                                onClick={() => handleReaction(msg.id, reaction.type)}
                              >
                                <reaction.icon className="h-3.5 w-3.5"/>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="p-1 text-xs">
                                <p>{reaction.count}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
        <CardFooter className="p-2 sm:p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={humorPlaceholders[humorLevel]}
              className="flex-1 resize-none min-h-[40px] max-h-[120px] text-sm"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
            />
            <Button type="submit" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 button-effect btn-chrome">
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="sr-only">{humorSendButton[humorLevel]}</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CommunityPage;
