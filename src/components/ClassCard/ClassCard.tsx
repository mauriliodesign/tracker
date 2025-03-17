import React from 'react';
import { ClassDetails } from '../../types';
import { getStatusColor } from '../../styles/theme';
import styled from '@emotion/styled';

interface ClassCardProps {
  classItem: ClassDetails;
  onClick: (classItem: ClassDetails) => void;
}

const Card = styled.div`
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2d2d2d;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StatusDot = styled.div<{ $color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: ${props => props.$color};
`;

export const ClassCard: React.FC<ClassCardProps> = ({ classItem, onClick }) => {
  const statusColor = getStatusColor(classItem.enrolledStudents, classItem.capacity);

  return (
    <Card
      onClick={() => onClick(classItem)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(classItem);
        }
      }}
      aria-label={`Aula de ${classItem.name} com ${classItem.instructor} às ${classItem.time}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{classItem.name}</div>
          <div className="text-sm text-gray-400">
            {classItem.time} - {classItem.instructor}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-400">
            {classItem.enrolledStudents}/{classItem.capacity}
          </div>
          <StatusDot $color={statusColor} />
        </div>
      </div>
    </Card>
  );
};

export default ClassCard; 