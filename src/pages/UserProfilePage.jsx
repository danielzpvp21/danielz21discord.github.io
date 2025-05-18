import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext.jsx";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileDisplay from "@/components/profile/ProfileDisplay";
import { useToast } from "@/components/ui/use-toast";
import { useHumor } from "@/context/HumorContext.jsx";


const UserProfilePage = () => {
  const { user, updateUser } = useAuth(); 
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { humorLevel } = useHumor();

  const [isEditing, setIsEditing] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    publicName: "",
    email: "",
    age: "",
    bio: "",
    avatarUrl: "",
    socialLinks: { github: "", twitter: "", youtube: "", discord: "", instagram: "", website: "" },
  });
  const [avatarPreview, setAvatarPreview] = React.useState("");

 React.useEffect(() => {
    if (user) {
      const initialSocialLinks = {
        github: "",
        twitter: "",
        youtube: "",
        discord: "",
        instagram: "",
        website: "",
        ...user.socialLinks, 
      };
      const initialAvatar = user.avatarUrl || `https://robohash.org/${user.publicName || user.username || 'user'}.png?set=set${Math.floor(Math.random() * 5) + 1}&size=128x128`;
      setProfileData({
        publicName: user.publicName || user.username || "",
        email: user.email || "",
        age: user.age || "",
        bio: user.bio || "",
        avatarUrl: initialAvatar,
        socialLinks: initialSocialLinks,
      });
      setAvatarPreview(initialAvatar);
    }
  }, [user]);

  const handleSaveProfile = (updatedData) => {
    if (!updatedData.publicName) {
      toast({ title: t('profile_save_error_no_name_title'), description: t('profile_save_error_no_name_desc', {context: humorLevel}), variant: "destructive"});
      return;
    }
    updateUser({ ...user, ...updatedData });
    toast({ 
      title: t('profile_save_success_title'), 
      description: t('profile_save_success_desc', {context: humorLevel})
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>{t('profile_not_logged_in_message', {context: humorLevel})}</p>
        <Button onClick={() => navigate("/login")} className="mt-4 button-effect btn-chrome">{t('profile_not_logged_in_button', {context: humorLevel})}</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-3xl px-2 sm:px-4 py-8"
    >
      <ProfileHeader
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        profileData={profileData}
        avatarPreview={avatarPreview}
        setAvatarPreview={setAvatarPreview}
        setProfileData={setProfileData}
      />
      {isEditing ? (
        <ProfileForm
          initialData={profileData}
          onSave={handleSaveProfile}
          avatarPreview={avatarPreview}
          setAvatarPreview={setAvatarPreview}
        />
      ) : (
        <ProfileDisplay profileData={profileData} />
      )}
    </motion.div>
  );
};

export default UserProfilePage;