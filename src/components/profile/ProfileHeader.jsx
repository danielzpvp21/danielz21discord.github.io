import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Palette, Edit3, UploadCloud, SmilePlus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip.jsx";
import { useTranslation } from 'react-i18next';

const ProfileHeader = ({ isEditing, setIsEditing, profileData, avatarPreview, setAvatarPreview, setProfileData }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setProfileData(prev => ({ ...prev, avatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const selectRandomAvatar = () => {
    const randomSet = Math.floor(Math.random() * 5) + 1;
    const randomSeed = Math.random().toString(36).substring(7);
    const randomAvatarUrl = `https://robohash.org/${randomSeed}.png?set=set${randomSet}&size=128x128`;
    setAvatarPreview(randomAvatarUrl);
    setProfileData(prev => ({ ...prev, avatarUrl: randomAvatarUrl}));
  };

  return (
    <div className="relative p-0 mb-20"> {/* Increased mb for spacing */}
      <div className="h-48 w-full bg-gradient-to-br from-primary/70 via-purple-500/70 to-accent/70 rounded-t-lg" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 transform"> {/* Adjusted top for better positioning */}
        <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
          <AvatarImage src={avatarPreview} alt={profileData.publicName} />
          <AvatarFallback className="text-5xl bg-muted text-muted-foreground">
            {profileData.publicName ? profileData.publicName.substring(0, 2).toUpperCase() : (profileData.username ? profileData.username.substring(0,2).toUpperCase(): "??")}
          </AvatarFallback>
        </Avatar>
        {isEditing && (
          <div className="absolute -bottom-2 -right-2 flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-background/80 hover:bg-background" onClick={() => fileInputRef.current?.click()}>
                    <UploadCloud size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>{t('profile_avatar_upload_tooltip')}</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-background/80 hover:bg-background" onClick={selectRandomAvatar}>
                    <SmilePlus size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent><p>{t('profile_avatar_random_tooltip')}</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" />
          </div>
        )}
      </div>
      <Button 
        variant={isEditing ? "destructive" : "outline"} 
        size="icon" 
        onClick={() => setIsEditing(!isEditing)} 
        className="absolute right-4 top-4 bg-background/70 hover:bg-background text-foreground h-9 w-9"
      >
        {isEditing ? <Palette size={18} /> : <Edit3 size={18} />}
        <span className="sr-only">{isEditing ? t('profile_button_cancel_edit_sr') : t('profile_button_edit_sr')}</span>
      </Button>
    </div>
  );
};

export default ProfileHeader;