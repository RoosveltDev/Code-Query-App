// src/components/Menu/Header.tsx
import React, { useState } from 'react';
import './header.css';
import Hamburger from './hambuger';

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleMenuClick = (): void => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="floating-btn" onClick={handleMenuClick}>
        <Hamburger />
      </div>
    </>
  );
};

export default Header;
