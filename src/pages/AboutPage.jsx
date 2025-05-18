
import React from 'react';
import { motion } from 'framer-motion';
import { Info, Construction, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { useHumor } from '@/context/HumorContext.jsx';

const AboutPage = () => {
  const { t } = useTranslation();
  const { humorLevel } = useHumor();

  const pageDescription = {
    formal: t('about_page_description_formal'),
    neutral: t('about_page_description_neutral'),
    fun: t('about_page_description_fun')
  };

  const contentPlaceholder = t('about_page_content_placeholder');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-3xl px-4 py-8"
    >
      <CardHeader className="mb-6 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.1}}
          className="inline-block p-4 rounded-full bg-primary/10 mb-4"
        >
          <Info className="h-12 w-12 text-primary" />
        </motion.div>
        <CardTitle className="text-4xl font-bold tracking-tight text-primary">
          {t('about_page_title')}
        </CardTitle>
        <CardDescription className="mt-2 text-lg text-muted-foreground max-w-xl mx-auto">
          {pageDescription[humorLevel]}
        </CardDescription>
      </CardHeader>

      <Card className="shadow-lg mb-8">
        <CardContent className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Construction className="h-6 w-6 mr-3 text-yellow-500 animate-pulse" />
            Nossa Missão (em construção, claro!)
          </h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {contentPlaceholder}
          </p>
          {humorLevel === 'fun' && (
             <img  alt="Desenvolvedor cansado com café" className="mt-6 w-full max-w-xs mx-auto rounded-md opacity-70" src="https://images.unsplash.com/photo-1544733422-aba440585de0" />
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-lg" id="privacy">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center">
            <ShieldCheck className="h-6 w-6 mr-3 text-green-500" />
            Política de Privacidade (A Versão Curta e Divertida)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 text-muted-foreground space-y-3 leading-relaxed">
          <p><strong>1. Seus Dados:</strong> Guardamos o mínimo possível, tipo o seu nome de usuário e e-mail pra você poder logar. Se você colocar mais coisas no seu perfil, é por sua conta e risco (e diversão!).</p>
          <p><strong>2. Cookies 🍪:</strong> Usamos cookies pra lembrar suas preferências (tipo tema escuro, porque é mais legal) e pra saber que idioma você fala. Não usamos pra te seguir pela internet e te vender coisas que você não precisa. A menos que seja um bot muito legal, aí a gente recomenda.</p>
          <p><strong>3. Compartilhamento:</strong> Seus dados são seus. Não vendemos, alugamos, nem trocamos por figurinhas raras de bots. A não ser que a lei obrigue, aí não tem choro.</p>
          <p><strong>4. Bots:</strong> Os bots que você cadastra são sua responsabilidade. Se seu bot tentar dominar o mundo, a culpa não é nossa (mas avisa a gente pra pegarmos pipoca!).</p>
          <p><strong>5. Mudanças:</strong> Se mudarmos algo aqui, a gente tenta avisar. Ou não. Surpresas são legais, né? (Brincadeira, a gente avisa se for importante).</p>
          <p className="mt-4 italic text-sm">
            {humorLevel === 'fun' 
              ? "Resumindo: seja legal, não faça besteira, e divirta-se! Se tiver dúvidas, pergunte aos universitários (ou pra gente, no FAQ)."
              : "Esta é uma política simplificada. Para detalhes completos, consulte um advogado ou imagine um documento muito longo e chato."
            }
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AboutPage;