/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import styled from '@emotion/styled';
import Button from '../../components/Button';
import { WeekDays, ClassDetails, WeekSchedule } from '../../types/schedule';
import { createWeekSchedule } from '../../utils/schedule';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Card = styled.div<{ clickable?: boolean }>`
  background-color: #111111;
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.2s ease-in-out;
  border: 1px solid #222222;

  ${props => props.clickable && `
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      background-color: #161616;
    }

    &:active {
      transform: translateY(0);
    }
  `}
`;

const IconButton = styled(Button)`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem;
  border-radius: 9999px;
  background-color: #1e1e1e;
  
  &:hover {
    background-color: #2d2d2d;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #ffffff;
    margin-right: 0;
  }
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

const ClassDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ClassHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ClassTime = styled.div`
  color: #a3a3a3;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ClassesSchedule = () => {
  const [selectedClass, setSelectedClass] = useState<ClassDetails | null>(null);
  const [weekIndex, setWeekIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [weekScheduleState, setWeekScheduleState] = useState<WeekSchedule>(createWeekSchedule(0));
  const userName = "João Silva";
  const userBelt = "azul";
  const userStripes: number = 2;

  // Atualiza o cronograma quando o índice da semana muda
  useEffect(() => {
    setWeekScheduleState(createWeekSchedule(weekIndex));
  }, [weekIndex]);

  // Função para obter o dia da semana atual (0 = Domingo, 1 = Segunda, etc)
  const getCurrentDayIndex = () => {
    const today = new Date();
    return today.getDay();
  };

  // Função para obter a chave do dia atual
  const getCurrentDayKey = (): keyof typeof WeekDays => {
    const dayIndex = getCurrentDayIndex();
    const days: Array<keyof typeof WeekDays> = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    return days[dayIndex];
  };

  // Inicializa o dia selecionado quando o componente monta
  useEffect(() => {
    const currentDayKey = getCurrentDayKey();
    setSelectedDay(currentDayKey);
  }, []);

  const handleEnrollment = (classItem: ClassDetails) => {
    if (!selectedClass) return;

    const isEnrolled = classItem.students?.some(student => student.name === userName);
    
    if (isEnrolled) {
      // Cancelar inscrição
      const updatedStudents = classItem.students?.filter(student => student.name !== userName) || [];
      const updatedClass = {
        ...classItem,
        students: updatedStudents,
        enrolledStudents: classItem.enrolledStudents - 1
      };
      
      // Atualizar a classe selecionada
      setSelectedClass(updatedClass);
      
      // Atualizar a classe na lista de classes do dia
      if (selectedDay !== null) {
        const dayKey = selectedDay as keyof typeof WeekDays;
        const updatedClasses = weekScheduleState.days[dayKey].classes.map(c => 
          c.id === classItem.id ? updatedClass : c
        );

        setWeekScheduleState(prevState => ({
          ...prevState,
          days: {
            ...prevState.days,
            [dayKey]: {
              ...prevState.days[dayKey],
              classes: updatedClasses
            }
          }
        }));
      }
    } else {
      // Realizar inscrição
      if (classItem.enrolledStudents >= classItem.capacity) {
        alert('Turma lotada!');
        return;
      }

      const newStudent = {
        id: Date.now().toString(),
        name: userName,
        belt: userBelt,
        stripes: userStripes
      };

      const updatedStudents = [...(classItem.students || []), newStudent];
      const updatedClass = {
        ...classItem,
        students: updatedStudents,
        enrolledStudents: classItem.enrolledStudents + 1
      };

      // Atualizar a classe selecionada
      setSelectedClass(updatedClass);

      // Atualizar a classe na lista de classes do dia
      if (selectedDay !== null) {
        const dayKey = selectedDay as keyof typeof WeekDays;
        const updatedClasses = weekScheduleState.days[dayKey].classes.map(c => 
          c.id === classItem.id ? updatedClass : c
        );

        setWeekScheduleState(prevState => ({
          ...prevState,
          days: {
            ...prevState.days,
            [dayKey]: {
              ...prevState.days[dayKey],
              classes: updatedClasses
            }
          }
        }));
      }
    }
  };

  const renderClassDetails = () => {
    if (!selectedClass) return null;

    const isEnrolled = selectedClass.students?.some(student => student.name === userName);
    const isFull = selectedClass.enrolledStudents >= selectedClass.capacity;

    return (
      <ClassDetailsContainer>
        <ClassHeader>
          <Button 
            onClick={() => setSelectedClass(null)}
            variant="blocked"
            icon={<ArrowLeft size={20} />}
          />
        </ClassHeader>

        <div>
          <ClassTime>
            {selectedClass.time} • 60 minutos • {selectedClass.instructor}
          </ClassTime>
        </div>

        <Card>
          <SectionTitle>Sobre a Aula</SectionTitle>
          <p style={{ color: '#a3a3a3' }}>{selectedClass.description}</p>
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                style={{ color: '#a3a3a3' }}
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span style={{ color: '#a3a3a3', fontSize: '0.875rem' }}>
                {selectedClass.enrolledStudents}/{selectedClass.capacity} alunos
              </span>
            </div>
          </div>
        </Card>

        <Card>
          <SectionTitle>Alunos Inscritos</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {selectedClass.students?.map((student, index) => (
              <div 
                key={student.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  backgroundColor: 'rgba(30, 30, 30, 0.5)',
                  borderRadius: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div 
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '9999px',
                      backgroundColor: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontWeight: 600
                    }}
                  >
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{student.name}</div>
                    <div style={{ color: '#a3a3a3', fontSize: '0.875rem' }}>
                      {student.belt.charAt(0).toUpperCase() + student.belt.slice(1)} • {student.stripes} {student.stripes === 1 ? 'grau' : 'graus'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Button
          onClick={() => handleEnrollment(selectedClass)}
          disabled={!isEnrolled && isFull}
          variant={isEnrolled ? 'muted' : 'primary'}
        >
          {isEnrolled ? 'Cancelar Inscrição' : isFull ? 'Turma Lotada' : 'Inscrever-se'}
        </Button>
      </ClassDetailsContainer>
    );
  };

  const renderSchedule = () => {
    const weekDays = [
      { key: 'segunda' as const, label: 'SEG' },
      { key: 'terca' as const, label: 'TER' },
      { key: 'quarta' as const, label: 'QUA' },
      { key: 'quinta' as const, label: 'QUI' },
      { key: 'sexta' as const, label: 'SEX' }
    ];

    const today = new Date().getDay();
    const currentDayIndex = today === 0 ? 6 : today - 1;

    return (
      <div className="p-4">
        <div className="mb-6">
          <div className="flex justify-end mb-6">
            <div className="flex space-x-2">
              <IconButton 
                onClick={() => {
                  if (weekIndex > 0) {
                    setWeekIndex(weekIndex - 1);
                    setSelectedDay(null);
                  }
                }}
                disabled={weekIndex === 0}
                aria-label="Semana Anterior"
              >
                <ChevronLeft size={24} />
              </IconButton>
              <IconButton 
                onClick={() => {
                  setWeekIndex(weekIndex + 1);
                  setSelectedDay(null);
                }}
                aria-label="Próxima Semana"
              >
                <ChevronRight size={24} />
              </IconButton>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {weekDays.map((weekDay, index) => {
              const daySchedule = weekScheduleState.days[weekDay.key];
              const isToday = index === currentDayIndex;
              const isSelected = selectedDay === weekDay.key;

              return (
                <div 
                  key={weekDay.key}
                  onClick={() => {
                    if (daySchedule) {
                      setSelectedDay(isSelected ? null : weekDay.key);
                    }
                  }}
                  className={`
                    relative p-4 rounded-lg text-center cursor-pointer transition-all duration-200
                    hover:bg-gray-800
                    ${isToday ? 'bg-gray-800' : ''}
                    ${isSelected ? 'bg-gray-700 ring-2 ring-blue-500' : ''}
                    ${!daySchedule ? 'bg-gray-900 cursor-not-allowed' : ''}
                  `}
                >
                  <div className={`text-sm font-medium ${isToday ? 'text-blue-500' : ''}`}>
                    {weekDay.label}
                  </div>
                  <div className="text-xs mb-2 text-gray-400">
                    {daySchedule?.date || '-'}
                  </div>
                  {!daySchedule && (
                    <div className="text-xs text-gray-500">
                      Sem aulas
                    </div>
                  )}
                  {daySchedule && (
                    <div className="text-xs text-gray-400">
                      {daySchedule.classes.length} aulas
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {selectedDay !== null && (
          <div className="mt-8">
            <Card>
              <div className="space-y-4">
                {weekScheduleState.days[selectedDay as keyof typeof WeekDays].classes.map((classItem: ClassDetails) => (
                  <div
                    key={classItem.id}
                    onClick={() => setSelectedClass(classItem)}
                    className="p-4 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer"
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
                        <div className={`w-2 h-2 rounded-full ${
                          classItem.enrolledStudents >= classItem.capacity 
                            ? 'bg-red-500' 
                            : classItem.enrolledStudents >= classItem.capacity * 0.8
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  };

  return (
    <Container>
      {selectedClass ? renderClassDetails() : renderSchedule()}
    </Container>
  );
};

export default ClassesSchedule; 