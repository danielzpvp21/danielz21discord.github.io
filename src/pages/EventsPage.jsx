import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Construction } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const EventsPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <CardHeader className="mb-6 text-center">
        <motion.div 
          initial={{ rotate: -15, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1}}
          className="inline-block p-4 rounded-full bg-primary/10 mb-4"
        >
          <CalendarDays className="h-12 w-12 text-primary" />
        </motion.div>
        <CardTitle className="text-4xl font-bold tracking-tight text-primary">
          {t('events_page_title')}
        </CardTitle>
        <CardDescription className="mt-2 text-lg text-muted-foreground">
          {t('events_page_description')}
        </CardDescription>
      </CardHeader>

      <Card className="shadow-lg">
        <CardContent className="p-8 text-center">
          <Construction className="h-24 w-24 mx-auto text-yellow-500 mb-6 animate-bounce" />
          <h3 className="text-2xl font-semibold mb-3">Página em Construção! 🚧</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Nossos gnomos engenheiros estão trabalhando duro para trazer um calendário de eventos épico.
            Enquanto isso, por que não explora alguns bots ou toma um café? ☕
          </p>
          <img  alt="Gnomos trabalhando em uma construção com ferramentas" className="mt-8 w-full max-w-sm mx-auto rounded-md opacity-80" src="https://images.unsplash.com/photo-1693915156018-27a807fa2ea2" />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventsPage;