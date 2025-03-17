import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { UserProfile, ClassDetails } from '../../types';
import { getBeltColor } from '../../styles/theme';
import Button from '../Button';
import styled from '@emotion/styled';

interface ProfileProps {
  user: UserProfile;
  upcomingClasses: ClassDetails[];
  onBack: () => void;
  onCancelClass: (classItem: ClassDetails) => void;
}

const Card = styled.div`
  background-color: #111111;
  border-radius: 12px;
  padding: 1.25rem;
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

export const Profile: React.FC<ProfileProps> = ({
  user,
  upcomingClasses,
  onBack,
  onCancelClass
}) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center mb-8">
        <Button 
          onClick={onBack}
          variant="blocked"
          icon={<ArrowLeft size={20} />}
          aria-label="Voltar"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="text-gray-400">ID: #{user.id}</div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-4">Graduação</h2>
          <BeltDisplay>
            <div 
              className="w-32 h-8 rounded"
              style={{ backgroundColor: getBeltColor(user.belt) }}
              role="img"
              aria-label={`Faixa ${user.belt}`}
            />
            <div className="flex gap-1">
              {Array.from({ length: user.stripes }).map((_, index) => (
                <BeltStripe key={index} role="img" aria-label={`Grau ${index + 1}`} />
              ))}
            </div>
            <div className="ml-auto text-gray-400">
              {user.belt.charAt(0).toUpperCase() + user.belt.slice(1)} • {user.stripes} {user.stripes === 1 ? 'grau' : 'graus'}
            </div>
          </BeltDisplay>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Estatísticas do Mês</h2>
          <div className="grid grid-cols-3 gap-4">
            <StatCard>
              <div className="value">{user.monthlyStats.trainings}</div>
              <div className="label">Treinos</div>
            </StatCard>
            <StatCard>
              <div className="value">{user.monthlyStats.classes}</div>
              <div className="label">Aulas</div>
            </StatCard>
            <StatCard>
              <div className="value">{user.monthlyStats.attendance}%</div>
              <div className="label">Frequência</div>
            </StatCard>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-400">Email</div>
              <div>{user.email}</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-400">Telefone</div>
              <div>{user.phone}</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-400">Academia</div>
              <div>{user.academy}</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-400">Plano</div>
              <div className="flex items-center">
                <span className="text-emerald-400 mr-2">●</span>
                <span>{user.plan}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Próximas Aulas</h2>
          <div className="space-y-3">
            {upcomingClasses.map(classItem => (
              <div 
                key={classItem.id}
                className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
              >
                <div>
                  <div className="font-medium">{classItem.name}</div>
                  <div className="text-sm text-gray-400">{classItem.time} - {classItem.instructor}</div>
                </div>
                <Button
                  variant="muted"
                  onClick={() => onCancelClass(classItem)}
                  aria-label={`Cancelar inscrição na aula de ${classItem.name}`}
                >
                  Cancelar
                </Button>
              </div>
            ))}
            {upcomingClasses.length === 0 && (
              <div className="text-center text-gray-400 py-4">
                Nenhuma aula agendada
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile; 