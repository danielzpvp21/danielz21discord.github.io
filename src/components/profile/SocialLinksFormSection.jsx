import React from 'react';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { useHumor } from '@/context/HumorContext.jsx';

const SocialLinksFormSection = ({ socialLinks, onChange, platforms }) => {
  const { t } = useTranslation();
  const { humorLevel } = useHumor();

  return (
    <Card className="bg-muted/30 p-4 mt-6">
      <CardTitle className="text-lg mb-3">{t('profile_section_social_links')}</CardTitle>
      <p className="text-xs text-muted-foreground mb-4">
        {t('profile_social_links_form_hint', {context: humorLevel})}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        {platforms.map(platform => (
          <div key={platform.id}>
            <Label htmlFor={`social-${platform.id}`} className="capitalize flex items-center text-sm">
              <platform.icon className="h-4 w-4 mr-2 text-primary"/>
              {platform.label}
            </Label>
            <Input 
              id={`social-${platform.id}`} 
              value={socialLinks[platform.id] || ''} 
              onChange={(e) => onChange(platform.id, e.target.value)} 
              placeholder={t('profile_placeholder_social_link', { platform: platform.label, context: humorLevel })}
            />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SocialLinksFormSection;