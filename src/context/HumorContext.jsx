import React, { createContext, useContext, useState, useEffect } from 'react';

const HumorContext = createContext();

export const HumorProvider = ({ children }) => {
  const [humorLevel, setHumorLevel] = useState(() => {
    return localStorage.getItem('humorLevel') || 'neutral';
  });

  useEffect(() => {
    localStorage.setItem('humorLevel', humorLevel);
  }, [humorLevel]);

  return (
    <HumorContext.Provider value={{ humorLevel, setHumorLevel }}>
      {children}
    </HumorContext.Provider>
  );
};

export const useHumor = () => {
  const context = useContext(HumorContext);
  if (!context) {
    throw new Error('useHumor deve ser usado dentro de um HumorProvider. Se já fez isso, talvez precise de um café ☕ ou de um abraço de um bot fofinho.');
  }
  return context;
};