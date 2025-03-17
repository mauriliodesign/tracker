import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.section`
  background-color: #111111;
  border-radius: 1rem;
  padding: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatCard = styled.div`
  background-color: rgba(30, 30, 30, 0.5);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 0.75rem;
`;

const StatLabel = styled.div`
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const NextClassCard = styled.div`
  background-color: rgba(30, 30, 30, 0.5);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ClassHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClassName = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
`;

const ClassTime = styled.div`
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const ClassDetails = styled.div`
  display: flex;
  gap: 1rem;
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const BeltProgressCard = styled.div`
  background-color: rgba(30, 30, 30, 0.5);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #1e1e1e;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #2563eb;
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const Dashboard: React.FC = () => {
  const nextClass = {
    name: 'Jiu-jitsu Fundamentos',
    time: 'Hoje, 19:00',
    instructor: 'Prof. André',
    duration: '60 minutos'
  };

  const stats = [
    { value: '12', label: 'Treinos no Mês' },
    { value: '85%', label: 'Frequência' },
    { value: '24h', label: 'Horas Treinadas' },
    { value: '3', label: 'Aulas Restantes' }
  ];

  const beltProgress = {
    current: 2,
    total: 4,
    nextGraduation: 'Junho 2024'
  };

  return (
    <Container>
      <Section>
        <SectionTitle>Bem-vindo de volta, João!</SectionTitle>
        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </Section>

      <Section>
        <SectionTitle>Próxima Aula</SectionTitle>
        <NextClassCard>
          <ClassHeader>
            <ClassName>{nextClass.name}</ClassName>
            <ClassTime>{nextClass.time}</ClassTime>
          </ClassHeader>
          <ClassDetails>
            <span>{nextClass.instructor}</span>
            <span>•</span>
            <span>{nextClass.duration}</span>
          </ClassDetails>
          <Link to="/aulas" style={{ textDecoration: 'none' }}>
            <Button variant="primary">
              Ver Detalhes
            </Button>
          </Link>
        </NextClassCard>
      </Section>

      <Section>
        <SectionTitle>Progresso na Faixa</SectionTitle>
        <BeltProgressCard>
          <ProgressBar>
            <ProgressFill progress={(beltProgress.current / beltProgress.total) * 100} />
          </ProgressBar>
          <ProgressInfo>
            <span>{beltProgress.current} de {beltProgress.total} graus</span>
            <span>Próxima graduação: {beltProgress.nextGraduation}</span>
          </ProgressInfo>
          <Link to="/perfil" style={{ textDecoration: 'none' }}>
            <Button variant="primary">
              Ver Graduação
            </Button>
          </Link>
        </BeltProgressCard>
      </Section>
    </Container>
  );
};

export default Dashboard; 