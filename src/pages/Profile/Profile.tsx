import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styled from '@emotion/styled';
import Button from '../../components/Button';
import Layout from '../../components/Layout/Layout';

const Card = styled.div`
  background-color: #111111;
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.2s ease-in-out;
  border: 1px solid #222222;
`;

const BeltDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 8px;
`;

const BeltStripe = styled.div`
  width: 8px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 2px;
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
  const userStripes = 2;

  return (
    <Layout
      title="Perfil"
      activeTab="perfil"
      onTabChange={() => {}}
      userName={userName}
      userBelt={userBelt}
      userStripes={userStripes}
      onProfileClick={() => {}}
    >
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            onClick={onBack}
            variant="blocked"
            icon={<ArrowLeft size={20} />}
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{userName}</h1>
            <div className="text-gray-400">ID: #12345</div>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Graduação</h2>
            <BeltDisplay>
              <div 
                className="w-32 h-8 rounded"
                style={{ backgroundColor: getBeltColor(userBelt) }}
              />
              <div className="flex gap-1">
                {Array.from({ length: userStripes }).map((_, index) => (
                  <BeltStripe key={index} />
                ))}
              </div>
              <div className="ml-auto text-gray-400">
                {userBelt.charAt(0).toUpperCase() + userBelt.slice(1)} • {userStripes} {userStripes.toString() === '1' ? 'grau' : 'graus'}
              </div>
            </BeltDisplay>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Estatísticas do Mês</h2>
            <div className="grid grid-cols-3 gap-4">
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
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-400">Email</div>
                <div>joao.silva@email.com</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-400">Telefone</div>
                <div>(11) 98765-4321</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-400">Academia</div>
                <div>Team BJJ</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-400">Plano</div>
                <div className="flex items-center">
                  <span className="text-emerald-400 mr-2">●</span>
                  <span>4x por semana</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile; 