import React from 'react';
import styled from '@emotion/styled';

interface HeaderProps {
  title: string;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const HeaderContainer = styled.header`
  background-color: #111111;
  border-bottom: 1px solid #222222;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  z-index: 40;
  height: 72px;
`;

const MenuButton = styled.button`
  display: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #1e1e1e;
  color: #ffffff;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2d2d2d;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MenuIcon = () => (
  <svg viewBox="0 0 24 24">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const Header: React.FC<HeaderProps> = ({
  title,
  isSidebarOpen,
  onToggleSidebar
}) => {
  return (
    <HeaderContainer>
      <MenuButton
        onClick={onToggleSidebar}
        aria-label={isSidebarOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </MenuButton>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default Header; 