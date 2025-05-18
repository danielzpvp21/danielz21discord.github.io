import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip.jsx";
import { useTranslation } from 'react-i18next';
import { useHumor } from '@/context/HumorContext.jsx';

const SocialLinksDisplaySection = ({ socialLinks, platforms }) => {
  const { t } = useTranslation();
  const { humorLevel } = useHumor();

  const hasLinks = platforms.some(p => socialLinks[p.id] && socialLinks[p.id].trim() !== '');

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">{t('profile_section_social_links')}</h3>
      {hasLinks ? (
        <div className="mt-2 flex flex-wrap gap-3 sm:gap-4">
          {platforms.map(platform => {
            const link = socialLinks[platform.id];
            if (!link || link.trim() === '') return null;
            const IconComponent = platform.icon;
            const fullLink = link.startsWith('http://') || link.startsWith('https://') ? link : `https://${link}`;
            return (
              <TooltipProvider key={platform.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href={fullLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent flex items-center gap-2 border"
                      aria-label={t('profile_social_link_aria', { platform: platform.label })}
                    >
                      <IconComponent size={20} />
                      <span className="hidden sm:inline text-xs">{platform.label}</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent><p className="capitalize">{platform.label}: {link}</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      ) : (
        <p className="mt-1 text-sm text-foreground/70 italic">
          {humorLevel === 'fun' ? t('profile_social_links_empty_fun') : t('profile_social_links_empty_neutral')}
        </p>
      )}
    </div>
  );
};

export default SocialLinksDisplaySection;