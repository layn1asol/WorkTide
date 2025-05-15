import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DropdownContextType {
  isDropdownOpen: boolean;
  setDropdownOpen: (isOpen: boolean) => void;
}

const defaultState: DropdownContextType = {
  isDropdownOpen: false,
  setDropdownOpen: () => {},
};

const DropdownContext = createContext<DropdownContextType>(defaultState);

export const useDropdown = () => useContext(DropdownContext);

export const DropdownProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isDropdownOpen, setDropdownOpen }}>
      {children}
    </DropdownContext.Provider>
  );
}; 