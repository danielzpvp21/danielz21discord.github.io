import React from "react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { BotCard } from "@/components/BotCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Gift, Users, ShieldCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";


const HomePage = ({ bots }) => {
  const { toast } = useToast();

  const featuredBots = bots.filter(bot => bot.popular).sort((a,b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4);
  const newBots = bots.sort((a,b) => new Date(b.addedDate || 0) - new Date(a.addedDate || 0) || b.id - a.id).slice(0, 4);

  const handleDummyAction = (actionName, botName) => {
    toast({
      title: "Ação Registrada... ou Quase! 😉",
      description: `Você tentou "${actionName}" o bot ${botName}. Nossos minions estão trabalhando nisso (ou tirando uma soneca).`,
      duration: 3000,
    });
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      
      <div className="container mx-auto px-4 py-16">
        <section className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              <Zap className="mr-2 inline-block h-8 w-8 text-yellow-400" />
              Bots em <span className="text-primary">Destaque</span>
            </h2>
            <Button variant="link" asChild className="text-primary hover:underline">
              <Link to="/bots?filter=populares&sort=rating_desc">
                Ver Todos Populares <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {featuredBots.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredBots.map(bot => (
                <BotCard key={bot.id} bot={bot} onAddBot={() => handleDummyAction(`Adicionar`, bot.name)} onRemoveBot={() => handleDummyAction(`Remover`, bot.name)} />
              ))}
            </div>
          ) : (
             <p className="text-muted-foreground text-center py-8">Nossos bots em destaque tiraram férias. Volte mais tarde! 🏖️</p>
          )}
        </section>

        <section className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              <Gift className="mr-2 inline-block h-8 w-8 text-green-400" />
              Recém-Chegados <span className="text-accent">Fresquinhos</span>
            </h2>
            <Button variant="link" asChild className="text-accent hover:underline">
               <Link to="/bots?sort=newest">
                Ver Todas as Novidades <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
           {newBots.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {newBots.map(bot => (
                <BotCard key={bot.id} bot={bot} onAddBot={() => handleDummyAction(`Adicionar`, bot.name)} onRemoveBot={() => handleDummyAction(`Remover`, bot.name)} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">A cegonha dos bots ainda não passou por aqui hoje...  stork</p>
          )}
        </section>

        <section className="mb-16 rounded-xl bg-gradient-to-br from-primary/90 via-purple-600 to-pink-600 p-8 text-center text-primary-foreground shadow-2xl md:p-12">
          <motion.h2 
            className="mb-4 text-4xl font-bold"
            initial={{ y:20, opacity:0}}
            whileInView={{ y:0, opacity:1}}
            viewport={{once: true}}
            transition={{duration:0.5, ease: "easeOut"}}
          >
            Pronto para a <span className="italic">Revolução</span> dos Bots? 🤖💥
          </motion.h2>
          <motion.p 
            className="mb-8 text-lg opacity-90 md:text-xl"
            initial={{ y:20, opacity:0}}
            whileInView={{ y:0, opacity:1}}
            viewport={{once: true}}
            transition={{duration:0.5, delay:0.2, ease: "easeOut"}}
          >
            Navegue, descubra, adicione... e talvez encontre um bot que faça seu café da manhã (não garantimos nada!).
          </motion.p>
          <motion.div
            initial={{ y:20, opacity:0}}
            whileInView={{ y:0, opacity:1}}
            viewport={{once: true}}
            transition={{duration:0.5, delay:0.4, ease: "easeOut"}}
          >
            <Button size="lg" variant="outline" className="border-2 border-primary-foreground bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground hover:text-primary button-effect px-8 py-3 text-lg font-semibold" asChild>
              <Link to="/bots">Quero Ver Todos os Bots AGORA!</Link>
            </Button>
          </motion.div>
        </section>
        
        <section>
          <h2 className="mb-10 text-center text-3xl font-bold tracking-tight md:text-4xl">Por que este é O Lugar dos Bots?</h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-3">
            {[
              { icon: Users, title: "Comunidade Top", description: "Avaliações, comentários e dicas de quem realmente usa e ama bots. Sem bots falsos aqui (a gente espera 🤞)." },
              { icon: Star, title: "Qualidade Garantida", description: "Só os melhores bots, verificados e aprovados pela nossa equipe de... hamsters especialistas. 🐹✨" },
              { icon: ShieldCheck, title: "Seguro e Confiável", description: "Navegue com tranquilidade. Seus dados estão mais seguros que segredo de estado (ou quase)." }
            ].map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="rounded-lg border bg-card p-6 text-center shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:scale-105"
                initial={{ opacity:0, y:30 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              >
                <feature.icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold text-primary">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default HomePage;