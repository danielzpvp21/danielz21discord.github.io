import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Github, Twitter, Youtube, Link as LinkIcon, Disc3 as DiscordIcon, Instagram } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip.jsx";
import { useHumor } from "@/context/HumorContext.jsx";
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from "@/components/ThemeToggle";
import SocialLinksDisplaySection from "./SocialLinksDisplaySection";

const ProfileDisplay = ({ profileData }) => {
  const { humorLevel } = useHumor();
  const { t } = useTranslation();

  const humorMessages = {
    formal: { greeting: t('profile_greeting_formal', { name: profileData.publicName }) },
    neutral: { greeting: t('profile_greeting_neutral', { name: profileData.publicName }) },
    fun: { greeting: t('profile_greeting_fun', { name: profileData.publicName }) }
  };
  
  const socialPlatforms = [
    { id: 'discord', icon: DiscordIcon, label: 'Discord' },
    { id: 'youtube', icon: Youtube, label: 'YouTube' },
    { id: 'github', icon: Github, label: 'GitHub' },
    { id: 'instagram', icon: Instagram, label: 'Instagram' },
    { id: 'twitter', icon: Twitter, label: 'Twitter' },
    { id: 'website', icon: LinkIcon, label: 'Website' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="bg-card p-6 rounded-lg shadow-xl"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{profileData.publicName || t('profile_mystery_person_name', {context: humorLevel})}</h1>
        <p className="text-sm text-muted-foreground">{profileData.email}</p>
        <p className="mt-2 text-base text-foreground italic">{humorMessages[humorLevel].greeting}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">{t('profile_label_bio')}</h3>
        <p className="mt-1 whitespace-pre-wrap text-foreground/90">
          {profileData.bio || (humorLevel === 'fun' ? t('profile_bio_empty_fun') : t('profile_bio_empty_neutral'))}
        </p>
      </div>

      {profileData.age && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider">{t('profile_label_age')}</h3>
          <p className="mt-1 text-foreground/90">{profileData.age}</p>
        </div>
      )}
      
      <SocialLinksDisplaySection 
        socialLinks={profileData.socialLinks}
        platforms={socialPlatforms}
      />
      
      <div className="flex items-center gap-2 mt-8 pt-6 border-t">
        <Label className="text-sm">{t('profile_label_theme_preference')}:</Label>
        <ThemeToggle />
      </div>
    </motion.div>
  );
};

export default ProfileDisplay;