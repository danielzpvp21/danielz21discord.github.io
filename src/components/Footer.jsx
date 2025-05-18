
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ShieldCheck, LifeBuoy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-background/90 backdrop-blur-sm fixed bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between p-4 text-sm text-muted-foreground">
        <p className="mb-2 sm:mb-0">
          © {new Date().getFullYear()} {t('header_title')}. {t('footer_all_rights_reserved')}
        </p>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link to="https://github.com/your-repo-placeholder" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
            <Github size={16} /> {t('footer_github')}
          </Link>
          <Link to="/faq" className="hover:text-primary transition-colors flex items-center gap-1">
            <LifeBuoy size={16} /> {t('footer_support')}
          </Link>
          <Link to="/about#privacy" className="hover:text-primary transition-colors flex items-center gap-1">
            <ShieldCheck size={16} /> {t('footer_privacy_policy')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
