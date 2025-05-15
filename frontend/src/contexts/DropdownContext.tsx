import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface DropdownContextType {
  isDropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
  toggleDropdown: () => void;
  blocksInteraction: boolean;
  setBlocksInteraction: (blocks: boolean) => void;
}

const defaultState: DropdownContextType = {
  isDropdownOpen: false,
  setDropdownOpen: () => {},
  toggleDropdown: () => {},
  blocksInteraction: false,
  setBlocksInteraction: () => {},
};

const DropdownContext = createContext<DropdownContextType>(defaultState);

export const useDropdown = () => useContext(DropdownContext);

export const DropdownProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // By default, don't block interactions
  const [blocksInteraction, setBlocksInteraction] = useState(false);
  
  const toggleDropdown = useCallback(() => {
    setDropdownOpen(prev => !prev);
  }, []);

  return (
    <DropdownContext.Provider value={{ 
      isDropdownOpen, 
      setDropdownOpen, 
      toggleDropdown,
      blocksInteraction,
      setBlocksInteraction
    }}>
      {children}
    </DropdownContext.Provider>
  );
}; 