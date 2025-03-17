import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ClassDetails as ClassDetailsType } from '../../types';
import { getBeltColor } from '../../styles/theme';
import Button from '../Button';
import styled from '@emotion/styled';

interface ClassDetailsProps {
  classItem: ClassDetailsType;
  isEnrolled: boolean;
  onBack: () => void;
  onEnrollment: (classItem: ClassDetailsType) => void;
  userName: string;
}

const Card = styled.div`
  background-color: #111111;
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid #222222;
`;

export const ClassDetails: React.FC<ClassDetailsProps> = ({
  classItem,
  isEnrolled,
  onBack,
  onEnrollment,
  userName
}) => {
  const isFull = classItem.enrolledStudents >= classItem.capacity;

  return (
    <div className="p-4">
      <div className="mb-6 flex items-center">
        <Button 
          onClick={onBack}
          variant="blocked"
          icon={<ArrowLeft size={20} />}
          aria-label="Voltar para a lista de aulas"
        />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{classItem.name}</h1>
          <div className="text-gray-400">{classItem.time} - {classItem.instructor}</div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <h2 className="text-lg font-semibold mb-2">Sobre a Aula</h2>
          <p className="text-gray-400">{classItem.description}</p>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="mr-2 text-gray-400"
                aria-hidden="true"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="text-gray-400">
                {classItem.enrolledStudents}/{classItem.capacity} alunos
              </span>
            </div>
          </div>
          <Button
            variant={isEnrolled ? 'muted' : isFull ? 'blocked' : 'primary'}
            fullWidth
            onClick={() => onEnrollment(classItem)}
            disabled={isFull && !isEnrolled}
            className="mt-4"
            aria-label={isEnrolled ? 'Cancelar inscrição' : isFull ? 'Turma lotada' : 'Inscrever-se na aula'}
          >
            {isEnrolled 
              ? 'Cancelar Inscrição' 
              : isFull
                ? 'Turma Lotada'
                : 'Inscrever-se'}
          </Button>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Alunos Inscritos</h2>
          <div className="space-y-3">
            {classItem.students?.map(student => (
              <div 
                key={student.id} 
                className="flex items-center justify-between p-3 rounded-lg bg-gray-800"
              >
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: getBeltColor(student.belt) }}
                    role="img"
                    aria-label={`Faixa ${student.belt}`}
                  />
                  <span>{student.name}</span>
                </div>
                <div className="text-sm text-gray-400">
                  {student.belt.charAt(0).toUpperCase() + student.belt.slice(1)} • {student.stripes} {student.stripes === 1 ? 'grau' : 'graus'}
                </div>
              </div>
            ))}
            {(!classItem.students || classItem.students.length === 0) && (
              <div className="text-center text-gray-400 py-4">
                Nenhum aluno inscrito
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ClassDetails; 