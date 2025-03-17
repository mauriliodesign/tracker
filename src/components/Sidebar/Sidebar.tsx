import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

interface SidebarProps {
  $isOpen: boolean;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
  userBelt: string;
  userStripes: number;
  onProfileClick: () => void;
  isCollapsed: boolean;
  onCollapse: () => void;
}

const SidebarContainer = styled.aside<{ $isOpen: boolean; $isCollapsed: boolean }>`
  width: ${props => props.$isCollapsed ? '72px' : '280px'};
  background-color: #111111;
  border-right: 1px solid #222222;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 50;

  @media (max-width: 768px) {
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
    width: 280px;
  }

  svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }
`;

const SidebarHeader = styled.div<{ $isCollapsed: boolean }>`
  height: 72px;
  padding: 0 1.5rem;
  border-bottom: 1px solid #222222;
  display: flex;
  align-items: center;
  justify-content: ${props => props.$isCollapsed ? 'center' : 'space-between'};
  overflow: hidden;
`;

const CollapseButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #1e1e1e;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #2d2d2d;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarNav = styled.nav<{ $isCollapsed: boolean }>`
  padding: 1.5rem;
  flex: 1;
  overflow: hidden;

  ${props => props.$isCollapsed && `
    padding: 1.5rem 0.75rem;
  `}
`;

const SidebarLink = styled(Link)<{ $active?: boolean; $isCollapsed?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem ${props => props.$isCollapsed ? '0' : '1rem'};
  color: ${props => props.$active ? '#ffffff' : '#a3a3a3'};
  text-decoration: none;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease-in-out;
  background-color: ${props => props.$active ? '#2563eb' : 'transparent'};
  justify-content: ${props => props.$isCollapsed ? 'center' : 'flex-start'};

  &:hover {
    background-color: ${props => props.$active ? '#2563eb' : '#1e1e1e'};
    color: #ffffff;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: ${props => props.$isCollapsed ? '0' : '0.75rem'};
  }

  span {
    display: ${props => props.$isCollapsed ? 'none' : 'inline'};
  }
`;

const SidebarFooter = styled.div<{ $isCollapsed: boolean }>`
  padding: ${props => props.$isCollapsed ? '1rem 0.75rem' : '1rem 1.5rem'};
  border-top: 1px solid #222222;
  display: flex;
  justify-content: ${props => props.$isCollapsed ? 'center' : 'flex-start'};
`;

const Avatar = styled.button`
  width: 3rem;
  height: 3rem;
  min-width: 3rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  color: #ffffff;
  background-color: #2563eb;
  transition: all 0.2s ease-in-out;
  padding: 0;
  border: none;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const UserInfo = styled.div<{ $isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: ${props => props.$isCollapsed ? '0' : '0.75rem'};
  border-radius: 0.5rem;
  background-color: ${props => props.$isCollapsed ? 'transparent' : '#1e1e1e'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background-color: ${props => props.$isCollapsed ? 'transparent' : '#2d2d2d'};
  }

  .user-details {
    flex: 1;
    display: ${props => props.$isCollapsed ? 'none' : 'block'};
    min-width: 0;
    
    .name {
      font-weight: 500;
      font-size: 1rem;
      margin-bottom: 0.125rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .belt {
      font-size: 0.875rem;
      color: #a3a3a3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24">
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({
  $isOpen,
  onToggle,
  activeTab,
  onTabChange,
  userName,
  userBelt,
  userStripes,
  onProfileClick,
  isCollapsed,
  onCollapse
}) => {
  return (
    <SidebarContainer $isOpen={$isOpen} $isCollapsed={isCollapsed}>
      <SidebarHeader $isCollapsed={isCollapsed}>
        {!isCollapsed && <h1 className="text-xl font-bold">Team BJJ</h1>}
        <CollapseButton
          onClick={onCollapse}
          aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
          style={{ transform: isCollapsed ? 'rotate(180deg)' : 'none' }}
        >
          <ChevronIcon />
        </CollapseButton>
        {$isOpen && !isCollapsed && (
          <button 
            className="md:hidden"
            onClick={onToggle}
            aria-label="Fechar menu"
          >
            <CloseIcon />
          </button>
        )}
      </SidebarHeader>

      <SidebarNav $isCollapsed={isCollapsed}>
        <SidebarLink 
          to="/aulas" 
          $active={activeTab === 'aulas'}
          $isCollapsed={isCollapsed}
          onClick={() => onTabChange('aulas')}
          aria-label="Aulas"
        >
          <CalendarIcon />
          <span>Aulas</span>
        </SidebarLink>
        <SidebarLink 
          to="/estatisticas" 
          $active={activeTab === 'estatisticas'}
          $isCollapsed={isCollapsed}
          onClick={() => onTabChange('estatisticas')}
          aria-label="Estatísticas"
        >
          <ChartIcon />
          <span>Estatísticas</span>
        </SidebarLink>
      </SidebarNav>

      <SidebarFooter $isCollapsed={isCollapsed}>
        <UserInfo
          $isCollapsed={isCollapsed}
          onClick={onProfileClick}
          role="button"
          tabIndex={0}
          aria-label="Perfil do usuário"
        >
          <Avatar>{getInitials(userName)}</Avatar>
          <div className="user-details">
            <div className="name">{userName}</div>
            <div className="belt">
              {userBelt.charAt(0).toUpperCase() + userBelt.slice(1)} • {userStripes} {userStripes === 1 ? 'grau' : 'graus'}
            </div>
          </div>
        </UserInfo>
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar; 