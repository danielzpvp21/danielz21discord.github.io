import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, User, Cake, VenetianMask, Link as LinkIcon, Disc3 as DiscordIcon, Instagram } from "lucide-react";
import { Github, Twitter, Youtube } from "lucide-react"; // Already imported in UserProfilePage, ensure consistency
import { useHumor } from "@/context/HumorContext.jsx";
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from "@/components/ThemeToggle";
import SocialLinksFormSection from "./SocialLinksFormSection";


const ProfileForm = ({ initialData, onSave, avatarPreview, setAvatarPreview }) => {
  const [formData, setFormData] = useState(initialData);
  const { humorLevel } = useHumor();
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const humorMessages = {
    formal: {
      editBio: t('profile_bio_placeholder_formal'),
      saveBio: t('profile_button_save_formal'),
    },
    neutral: {
      editBio: t('profile_bio_placeholder_neutral'),
      saveBio: t('profile_button_save_neutral'),
    },
    fun: {
      editBio: t('profile_bio_placeholder_fun'),
      saveBio: t('profile_button_save_fun'),
    }
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
    <motion.form 
      onSubmit={handleSubmit} 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6 bg-card p-6 rounded-lg shadow-xl"
    >
      <div>
        <Label htmlFor="publicName" className="flex items-center text-sm"><User size={14} className="mr-2 text-primary"/>{t('profile_label_public_name')}</Label>
        <Input id="publicName" name="publicName" value={formData.publicName} onChange={handleInputChange} placeholder={t('profile_placeholder_public_name', {context: humorLevel})} />
        <p className="text-xs text-muted-foreground mt-1">{t('profile_public_name_hint', {context: humorLevel})}</p>
      </div>
      <div>
        <Label htmlFor="age" className="flex items-center text-sm"><Cake size={14} className="mr-2 text-primary"/>{t('profile_label_age')} ({t('optional_field')})</Label>
        <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} placeholder={t('profile_placeholder_age', {context: humorLevel})} />
      </div>
      <div>
        <Label htmlFor="bio" className="flex items-center text-sm"><VenetianMask size={14} className="mr-2 text-primary"/>{t('profile_label_bio')}</Label>
        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleInputChange} placeholder={humorMessages[humorLevel].editBio} rows={3}/>
        <p className="text-xs text-muted-foreground mt-1">{t('profile_bio_hint', {context: humorLevel})}</p>
      </div>

      <SocialLinksFormSection 
        socialLinks={formData.socialLinks} 
        onChange={handleSocialLinkChange}
        platforms={socialPlatforms}
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t mt-6">
        <div className="flex items-center gap-2">
            <Label className="text-sm">{t('profile_label_theme')}:</Label>
            <ThemeToggle />
        </div>
        <Button type="submit" className="w-full sm:w-auto button-effect btn-chrome">
          <Save size={16} className="mr-2"/> {humorMessages[humorLevel].saveBio}
        </Button>
      </div>
    </motion.form>
  );
};

export default ProfileForm;