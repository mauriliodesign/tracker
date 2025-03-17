import React from 'react';
import styled from '@emotion/styled';
import { DEMO_USER } from '../../constants/demo';

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

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const HistoryItem = styled.div`
  background-color: rgba(30, 30, 30, 0.5);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ClassName = styled.div`
  color: #ffffff;
  font-weight: 500;
`;

const ClassDetails = styled.div`
  color: #a3a3a3;
  font-size: 0.875rem;
  display: flex;
  gap: 0.5rem;
`;

const ClassDate = styled.div`
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const Statistics: React.FC = () => {
  return (
    <Container>
      <Section>
        <SectionTitle>Resumo do Mês</SectionTitle>
        <StatsGrid>
          <StatCard>
            <StatValue>{DEMO_USER.stats.monthlyClasses}</StatValue>
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
          <StatCard>
            <StatValue>24h</StatValue>
            <StatLabel>Horas Treinadas</StatLabel>
          </StatCard>
        </StatsGrid>
      </Section>

      <Section>
        <SectionTitle>Histórico de Treinos</SectionTitle>
        <HistoryList>
          {[...Array(5)].map((_, index) => (
            <HistoryItem key={index}>
              <ClassInfo>
                <ClassName>Jiu-jitsu Fundamentos</ClassName>
                <ClassDetails>
                  <span>Prof. André</span>
                  <span>•</span>
                  <span>10:00</span>
                </ClassDetails>
              </ClassInfo>
              <ClassDate>
                {new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
              </ClassDate>
            </HistoryItem>
          ))}
        </HistoryList>
      </Section>
    </Container>
  );
};

export default Statistics; 