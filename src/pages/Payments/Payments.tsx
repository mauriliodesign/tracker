import React from 'react';
import styled from '@emotion/styled';
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

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: rgba(30, 30, 30, 0.5);
  border-radius: 1rem;
`;

const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const TransactionTitle = styled.div`
  color: #ffffff;
  font-weight: 500;
`;

const TransactionDate = styled.div`
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const TransactionAmount = styled.div<{ type: 'income' | 'expense' }>`
  font-weight: 600;
  color: ${props => props.type === 'income' ? '#34d399' : '#ef4444'};
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

const PlanCard = styled.div<{ isCurrent?: boolean }>`
  background-color: ${props => props.isCurrent ? 'rgba(37, 99, 235, 0.1)' : 'rgba(30, 30, 30, 0.5)'};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: ${props => props.isCurrent ? '1px solid #2563eb' : '1px solid transparent'};
`;

const PlanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlanName = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
`;

const PlanPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #a3a3a3;
  font-size: 0.875rem;

  svg {
    width: 1rem;
    height: 1rem;
    color: #34d399;
  }
`;

const Payments: React.FC = () => {
  const currentPlan = {
    name: 'Plano 4x por Semana',
    price: 'R$ 199,90',
    features: [
      '4 aulas por semana',
      'Acesso a todas as modalidades',
      'Aulas em grupo',
      'Avaliação mensal',
      'Suporte prioritário'
    ]
  };

  const availablePlans = [
    {
      name: 'Plano 2x por Semana',
      price: 'R$ 129,90',
      features: [
        '2 aulas por semana',
        'Acesso a todas as modalidades',
        'Aulas em grupo',
        'Avaliação mensal'
      ]
    },
    {
      name: 'Plano 3x por Semana',
      price: 'R$ 159,90',
      features: [
        '3 aulas por semana',
        'Acesso a todas as modalidades',
        'Aulas em grupo',
        'Avaliação mensal'
      ]
    },
    {
      name: 'Plano 5x por Semana',
      price: 'R$ 229,90',
      features: [
        '5 aulas por semana',
        'Acesso a todas as modalidades',
        'Aulas em grupo',
        'Avaliação mensal',
        'Suporte prioritário',
        'Acesso a aulas especiais'
      ]
    }
  ];

  const transactions = [
    {
      id: 1,
      title: 'Mensalidade - Plano 4x por Semana',
      date: '01/03/2024',
      amount: 'R$ 199,90',
      type: 'expense' as const
    },
    {
      id: 2,
      title: 'Mensalidade - Plano 4x por Semana',
      date: '01/02/2024',
      amount: 'R$ 199,90',
      type: 'expense' as const
    },
    {
      id: 3,
      title: 'Mensalidade - Plano 4x por Semana',
      date: '01/01/2024',
      amount: 'R$ 199,90',
      type: 'expense' as const
    }
  ];

  return (
    <Container>
      <Section>
        <SectionTitle>Histórico de Pagamentos</SectionTitle>
        <TransactionList>
          {transactions.map(transaction => (
            <TransactionItem key={transaction.id}>
              <TransactionInfo>
                <TransactionTitle>{transaction.title}</TransactionTitle>
                <TransactionDate>{transaction.date}</TransactionDate>
              </TransactionInfo>
              <TransactionAmount type={transaction.type}>
                {transaction.amount}
              </TransactionAmount>
            </TransactionItem>
          ))}
        </TransactionList>
      </Section>

      <Section>
        <SectionTitle>Planos Disponíveis</SectionTitle>
        <PlansGrid>
          <PlanCard isCurrent>
            <PlanHeader>
              <PlanName>{currentPlan.name}</PlanName>
              <PlanPrice>{currentPlan.price}</PlanPrice>
            </PlanHeader>
            <PlanFeatures>
              {currentPlan.features.map((feature, index) => (
                <FeatureItem key={index}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {feature}
                </FeatureItem>
              ))}
            </PlanFeatures>
            <Button variant="muted" disabled>
              Plano Atual
            </Button>
          </PlanCard>

          {availablePlans.map((plan, index) => (
            <PlanCard key={index}>
              <PlanHeader>
                <PlanName>{plan.name}</PlanName>
                <PlanPrice>{plan.price}</PlanPrice>
              </PlanHeader>
              <PlanFeatures>
                {plan.features.map((feature, featureIndex) => (
                  <FeatureItem key={featureIndex}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {feature}
                  </FeatureItem>
                ))}
              </PlanFeatures>
              <Button variant="primary">
                Alterar Plano
              </Button>
            </PlanCard>
          ))}
        </PlansGrid>
      </Section>
    </Container>
  );
};

export default Payments; 