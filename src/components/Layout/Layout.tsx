import React, { useState } from 'react';
import styled from '@emotion/styled';
import Header from '../Header/Header';
import { default as SidebarComponent } from '../Sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  userName: string;
  userBelt: string;
  userStripes: number;
  onProfileClick: () => void;
  onLogout: () => void;
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #ffffff;
  display: flex;
`;

const MainContent = styled.div<{ $isSidebarOpen: boolean; $isSidebarCollapsed: boolean }>`
  flex: 1;
  margin-left: ${props => props.$isSidebarCollapsed ? '72px' : '280px'};
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const PageContent = styled.main`
  flex: 1;
  padding: 1.5rem;
`;

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  activeTab,
  onTabChange,
  userName,
  userBelt,
  userStripes,
  onProfileClick,
  onLogout
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <Container>
      <SidebarComponent
        $isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTab={activeTab}
        onTabChange={(tab: string) => {
          onTabChange(tab);
          setIsSidebarOpen(false);
        }}
        userName={userName}
        userBelt={userBelt}
        userStripes={userStripes}
        onProfileClick={() => {
          onProfileClick();
          setIsSidebarOpen(false);
        }}
        onLogout={() => {
          onLogout();
          setIsSidebarOpen(false);
        }}
        isCollapsed={isSidebarCollapsed}
        onCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <MainContent 
        $isSidebarOpen={isSidebarOpen}
        $isSidebarCollapsed={isSidebarCollapsed}
      >
        <Header
          title={title}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <PageContent>
          {children}
        </PageContent>
      </MainContent>
    </Container>
  );
};

export default Layout; 