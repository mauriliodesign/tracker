import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styled from '@emotion/styled';
import Button from '../../components/Button';

const Container = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const UserID = styled.div`
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const Card = styled.div`
  background-color: #111111;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid #222222;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const BeltDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(30, 30, 30, 0.5);
  border-radius: 0.75rem;
`;

const BeltStripe = styled.div`
  width: 8px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 2px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const StatCard = styled.div`
  background-color: rgba(30, 30, 30, 0.5);
  border-radius: 0.75rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(30, 30, 30, 0.5);
  border-radius: 0.75rem;
`;

const InfoLabel = styled.div`
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const InfoValue = styled.div`
  color: #ffffff;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const getBeltColor = (belt: string) => {
  switch (belt) {
    case 'branca': return '#FFFFFF';
    case 'azul': return '#0066CC';
    case 'roxa': return '#660099';
    case 'marrom': return '#663300';
    case 'preta': return '#000000';
    default: return '#CCCCCC';
  }
};

interface ProfileProps {
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const userName = "João Silva";
  const userBelt = "azul";
  const userStripes: number = 2;

  return (
    <Container>
      <UserInfo>
        <Button 
          onClick={onBack}
          variant="blocked"
          icon={<ArrowLeft size={20} />}
        />
        <UserID>ID: #12345</UserID>
      </UserInfo>

      <Card>
        <SectionTitle>Graduação</SectionTitle>
        <BeltDisplay>
          <div 
            style={{ 
              width: '8rem',
              height: '2rem',
              backgroundColor: getBeltColor(userBelt),
              borderRadius: '0.375rem'
            }}
          />
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {Array.from({ length: userStripes }).map((_, index) => (
              <BeltStripe key={index} />
            ))}
          </div>
          <div style={{ marginLeft: 'auto', color: '#a3a3a3' }}>
            {userBelt.charAt(0).toUpperCase() + userBelt.slice(1)} • {userStripes} {userStripes === 1 ? 'grau' : 'graus'}
          </div>
        </BeltDisplay>
      </Card>

      <Card>
        <SectionTitle>Estatísticas do Mês</SectionTitle>
        <StatsGrid>
          <StatCard>
            <StatValue>12</StatValue>
            <StatLabel>Treinos</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>8</StatValue>
            <StatLabel>Aulas</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>85%</StatValue>
            <StatLabel>Frequência</StatLabel>
          </StatCard>
        </StatsGrid>
      </Card>

      <Card>
        <SectionTitle>Informações Pessoais</SectionTitle>
        <InfoList>
          <InfoItem>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>joao.silva@email.com</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Telefone</InfoLabel>
            <InfoValue>(11) 98765-4321</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Academia</InfoLabel>
            <InfoValue>Team BJJ</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Plano</InfoLabel>
            <InfoValue>
              <span style={{ color: '#34d399' }}>●</span>
              <span>4x por semana</span>
            </InfoValue>
          </InfoItem>
        </InfoList>
      </Card>
    </Container>
  );
};

export default Profile; 