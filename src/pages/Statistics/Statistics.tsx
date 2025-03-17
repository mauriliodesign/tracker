import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const Card = styled.div`
  background-color: #111111;
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.2s ease-in-out;
  border: 1px solid #222222;
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 8px;
  text-align: center;

  .value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2563eb;
  }

  .label {
    font-size: 0.875rem;
    color: #a3a3a3;
    margin-top: 0.25rem;
  }
`;

const Statistics = () => {
  const navigate = useNavigate();
  const userName = "João Silva";
  const userBelt = "azul";
  const userStripes = 2;

  return (
    <Layout
      title="Estatísticas"
      activeTab="estatisticas"
      onTabChange={(tab: string) => {
        switch (tab) {
          case 'aulas':
            navigate('/aulas');
            break;
          case 'estatisticas':
            navigate('/estatisticas');
            break;
        }
      }}
      userName={userName}
      userBelt={userBelt}
      userStripes={userStripes}
      onProfileClick={() => navigate('/perfil')}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Resumo do Mês</h2>
            <div className="grid grid-cols-4 gap-4">
              <StatCard>
                <div className="value">12</div>
                <div className="label">Treinos</div>
              </StatCard>
              <StatCard>
                <div className="value">8</div>
                <div className="label">Aulas</div>
              </StatCard>
              <StatCard>
                <div className="value">85%</div>
                <div className="label">Frequência</div>
              </StatCard>
              <StatCard>
                <div className="value">24h</div>
                <div className="label">Horas Treinadas</div>
              </StatCard>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Histórico de Treinos</h2>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <div className="font-medium">Jiu-jitsu Fundamentos</div>
                    <div className="text-sm text-gray-400">Prof. André • 10:00</div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card>
              <h2 className="text-lg font-semibold mb-4">Distribuição por Tipo</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>Jiu-jitsu Fundamentos</div>
                  <div className="text-blue-500">60%</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>Jiu-jitsu Avançado</div>
                  <div className="text-blue-500">25%</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>Crosstraining</div>
                  <div className="text-blue-500">15%</div>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold mb-4">Horários Mais Frequentes</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>10:00</div>
                  <div className="text-blue-500">8 aulas</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>19:00</div>
                  <div className="text-blue-500">6 aulas</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>20:00</div>
                  <div className="text-blue-500">4 aulas</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Statistics; 