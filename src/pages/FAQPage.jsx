import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle as MessageCircleQuestion, Send, Trash2 } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext.jsx';
import { useToast } from "@/components/ui/use-toast";
import { useHumor } from '@/context/HumorContext.jsx';

const FAQPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const { humorLevel } = useHumor();
  const [userQuestions, setUserQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  const staticFaqItems = [
    {
      id: "static-1",
      questionKey: "faq_static_q1_question",
      answerKey: "faq_static_q1_answer",
    },
    {
      id: "static-2",
      questionKey: "faq_static_q2_question",
      answerKey: "faq_static_q2_answer",
    },
    {
      id: "static-3",
      questionKey: "faq_static_q3_question",
      answerKey: "faq_static_q3_answer",
    },
    {
      id: "static-4",
      questionKey: "faq_static_q4_question",
      answerKey: "faq_static_q4_answer",
    },
    {
      id: "static-5",
      questionKey: "faq_static_q5_question",
      answerKey: "faq_static_q5_answer",
    },
  ];

  useEffect(() => {
    const storedQuestions = localStorage.getItem('userFaqQuestions');
    if (storedQuestions) {
      setUserQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userFaqQuestions', JSON.stringify(userQuestions));
  }, [userQuestions]);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) {
      toast({
        title: t('faq_submit_error_empty_title'),
        description: t('faq_submit_error_empty_desc', {context: humorLevel}),
        variant: "destructive",
      });
      return;
    }
    if (!user) {
      toast({
        title: t('faq_submit_error_not_logged_in_title'),
        description: t('faq_submit_error_not_logged_in_desc', {context: humorLevel}),
        variant: "destructive",
      });
      return;
    }

    const questionData = {
      id: Date.now().toString(),
      question: newQuestion,
      user: {
        name: user.publicName || user.username,
        id: user.id,
      },
      timestamp: new Date().toISOString(),
      answer: null, // Admin can answer later
    };
    setUserQuestions(prev => [questionData, ...prev]);
    setNewQuestion("");
    toast({
      title: t('faq_submit_success_title'),
      description: t('faq_submit_success_desc', {context: humorLevel}),
    });
  };
  
  const handleDeleteQuestion = (questionId) => {
     setUserQuestions(prev => prev.filter(q => q.id !== questionId));
     toast({
        title: t('faq_delete_success_title'),
        description: t('faq_delete_success_desc', {context: humorLevel}),
        variant: "destructive"
     });
  };

  const humorPlaceholders = {
    formal: t('faq_input_placeholder_formal'),
    neutral: t('faq_input_placeholder_neutral'),
    fun: t('faq_input_placeholder_fun'),
  };

  const humorSendButton = {
    formal: t('faq_send_button_formal'),
    neutral: t('faq_send_button_neutral'),
    fun: t('faq_send_button_fun'),
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-3xl px-4 py-8"
    >
      <CardHeader className="mb-8 text-center">
         <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1}}
          className="inline-block p-4 rounded-full bg-primary/10 mb-4"
        >
          <HelpCircle className="h-12 w-12 text-primary" />
        </motion.div>
        <CardTitle className="text-4xl font-bold tracking-tight text-primary">
          {t('faq_page_title')}
        </CardTitle>
        <CardDescription className="mt-2 text-lg text-muted-foreground">
          {t('faq_page_description', {context: humorLevel})}
        </CardDescription>
      </CardHeader>

      <Accordion type="single" collapsible className="w-full space-y-3 mb-12">
        {staticFaqItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <AccordionItem value={item.id} className="rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                <span className="flex items-center font-medium text-base">
                  <MessageCircleQuestion className="mr-3 h-5 w-5 text-primary/80 flex-shrink-0" />
                  {t(item.questionKey)}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0 text-muted-foreground leading-relaxed">
                {t(item.answerKey, {context: humorLevel})}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
      
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">{t('faq_ask_question_title')}</CardTitle>
          <CardDescription>{t('faq_ask_question_desc', {context: humorLevel})}</CardDescription>
        </CardHeader>
        <form onSubmit={handleQuestionSubmit}>
          <CardContent>
            <Textarea 
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder={humorPlaceholders[humorLevel]}
              rows={4}
              className="resize-none"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto button-effect btn-chrome">
              <Send size={16} className="mr-2" />
              {humorSendButton[humorLevel]}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {userQuestions.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">{t('faq_user_questions_title')}</h3>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {userQuestions.map((uq, index) => (
              <motion.div
                key={uq.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem value={uq.id} className="rounded-lg border bg-card shadow-sm">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <div className="flex-1">
                      <span className="flex items-center font-medium text-base">
                        <MessageCircleQuestion className="mr-3 h-5 w-5 text-primary/80 flex-shrink-0" />
                        {uq.question}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1 ml-8">
                        {t('faq_asked_by', {name: uq.user.name})} - {new Date(uq.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    {user && user.id === uq.user.id && (
                        <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDeleteQuestion(uq.id); }} className="ml-2 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/50">
                            <Trash2 size={16} />
                            <span className="sr-only">{t('faq_delete_question_button_sr')}</span>
                        </Button>
                    )}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0 text-muted-foreground leading-relaxed">
                    {uq.answer ? uq.answer : t('faq_answer_pending', {context: humorLevel})}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      )}

    </motion.div>
  );
};

export default FAQPage;