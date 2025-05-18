import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Info, XCircle, X } from 'lucide-react';

const AnnouncementBar = ({ message, type = 'info', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  const barStyles = {
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-black',
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
  };

  const Icon = {
    info: <Info className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    success: <CheckCircle2 className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`fixed top-0 left-0 right-0 z-[60] p-3 sm:p-2 flex items-center justify-center text-sm ${barStyles[type] || barStyles.info}`}
        >
          <div className="container mx-auto flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              {Icon[type] || Icon.info}
              {message}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-7 w-7 hover:bg-white/20 focus:bg-white/20 text-current"
              aria-label="Fechar anúncio"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;