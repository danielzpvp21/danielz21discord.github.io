import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BotCard } from '@/components/BotCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SearchX, Bot as BotIcon, User as UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useHumor } from '@/context/HumorContext.jsx';

const SearchResultsPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { humorLevel } = useHumor();
  const { query, bots, users } = location.state || { query: '', bots: [], users: [] };

  const pageTitle = t('search_results_page_title', { query });
  const noResultsMessages = {
    formal: t('search_results_no_results_formal'),
    neutral: t('search_results_no_results_neutral'),
    fun: t('search_results_no_results_fun', { query }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <CardHeader className="mb-8 text-center">
        <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
          {pageTitle}
        </CardTitle>
      </CardHeader>

      {bots.length === 0 && users.length === 0 ? (
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            <SearchX className="h-24 w-24 mx-auto text-destructive mb-6 animate-pulse" />
            <h3 className="text-2xl font-semibold mb-3">{t('search_results_no_results_title')}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {noResultsMessages[humorLevel]}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-12">
          {bots.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <BotIcon className="mr-3 h-7 w-7 text-primary/80" />
                {t('search_results_bots_section_title')} ({bots.length})
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {bots.map(bot => (
                  <BotCard key={bot.id} bot={bot} onAddBot={() => {}} onRemoveBot={() => {}} />
                ))}
              </div>
            </section>
          )}

          {users.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <UserIcon className="mr-3 h-7 w-7 text-primary/80" />
                {t('search_results_users_section_title')} ({users.length})
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {users.map(user => (
                  <Link to={`/profile`} state={{ userId: user.id }} key={user.id}> {/* This link won't directly show specific user profile yet */}
                    <Card className="hover:shadow-primary/20 transition-shadow duration-300 overflow-hidden">
                      <CardHeader className="p-4 flex flex-row items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatarUrl || `https://robohash.org/${user.publicName || user.username}.png?set=set3`} alt={user.publicName || user.username} />
                          <AvatarFallback>{(user.publicName || user.username || 'U').substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{user.publicName || user.username}</CardTitle>
                          {user.bio && <CardDescription className="text-xs truncate">{user.bio}</CardDescription>}
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SearchResultsPage;