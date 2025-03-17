/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import styled from '@emotion/styled';
import Button from '../../components/Button';
import { WeekDays, ClassDetails, WeekSchedule } from '../../types/schedule';
import { createWeekSchedule } from '../../utils/schedule';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Card = styled.div<{ clickable?: boolean }>`
  background-color: #111111;
  border-radius: 1rem;
  padding: 1.5rem;
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
  margin-bottom: 1rem;
`;

const ClassTime = styled.div`
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ClassName = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  color: #ffffff;
`;

const ClassStatus = styled.div<{ $status: 'scheduled' | 'available' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => props.$status === 'scheduled' ? 'rgba(37, 99, 235, 0.1)' : 'rgba(34, 197, 94, 0.1)'};
  color: ${props => props.$status === 'scheduled' ? '#2563eb' : '#22c55e'};
`;

const ClassCard = styled.div<{ $isSelected?: boolean }>`
  background-color: ${props => props.$isSelected ? 'rgba(37, 99, 235, 0.1)' : 'rgba(30, 30, 30, 0.5)'};
  border-radius: 1rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: ${props => props.$isSelected ? '2px solid #2563eb' : 'none'};

  &:hover {
    background-color: ${props => props.$isSelected ? 'rgba(37, 99, 235, 0.15)' : 'rgba(30, 30, 30, 0.7)'};
  }
`;

const CheckInStatus = styled.div<{ $status: 'available' | 'not_available' | 'expired' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.$status) {
      case 'available': return 'rgba(34, 197, 94, 0.1)';
      case 'not_available': return 'rgba(234, 179, 8, 0.1)';
      case 'expired': return 'rgba(239, 68, 68, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'available': return '#22c55e';
      case 'not_available': return '#eab308';
      case 'expired': return '#ef4444';
    }
  }};
`;

interface ExtendedClassDetails {
  id: string;
  name: string;
  time: string;
  instructor: string;
  duration: string;
  status: 'scheduled' | 'available';
  type: string;
  description: string;
  capacity: number;
  enrolledStudents: number;
  students?: Array<{
    id: string;
    name: string;
    belt: string;
    stripes: number;
  }>;
}

const ClassesSchedule: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedClass, setSelectedClass] = useState<ClassDetails | null>(null);
  const [weekIndex, setWeekIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [weekScheduleState, setWeekScheduleState] = useState<WeekSchedule>(createWeekSchedule(0));
  const userName = "João Silva";
  const userBelt = "azul";
  const userStripes: number = 2;
  const navigate = useNavigate();

  useEffect(() => {
    const classId = searchParams.get('class');
    if (classId) {
      // Encontrar a aula em todos os dias da semana
      for (const dayKey of Object.keys(WeekDays)) {
        const daySchedule = weekScheduleState.days[dayKey as keyof typeof WeekDays];
        const foundClass = daySchedule.classes.find(c => c.id === classId);
        if (foundClass) {
          setSelectedClass(foundClass);
          setSelectedDay(dayKey as keyof typeof WeekDays);
          // Scroll to the class card after a short delay to ensure the DOM is ready
          setTimeout(() => {
            const element = document.getElementById(`class-${classId}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
          break;
        }
      }
    }
  }, [searchParams, weekScheduleState]);

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

  const handleEnrollment = (classItem: ExtendedClassDetails) => {
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

        // Atualizar a classe selecionada com os novos dados
        setSelectedClass(updatedClass);
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

        // Atualizar a classe selecionada com os novos dados
        setSelectedClass(updatedClass);
      }
    }
  };

  const handleEnroll = (classItem: ExtendedClassDetails) => {
    // ... existing code ...
  };

  const isCheckInAvailable = (classTime: string): 'available' | 'not_available' | 'expired' => {
    const now = new Date();
    const [hours, minutes] = classTime.split(':').map(Number);
    const classDate = new Date();
    classDate.setHours(hours, minutes, 0, 0);

    const fifteenMinutesBefore = new Date(classDate.getTime() - 15 * 60000);
    const fifteenMinutesAfter = new Date(classDate.getTime() + 15 * 60000);

    if (now < fifteenMinutesBefore) {
      return 'not_available';
    }

    if (now > fifteenMinutesAfter) {
      return 'expired';
    }

    return 'available';
  };

  const renderClassDetails = () => {
    if (!selectedClass) return null;

    const selectedClassItem = weekScheduleState.days[selectedDay as keyof typeof WeekDays].classes.find(c => c.id === selectedClass.id);
    if (!selectedClassItem) return null;

    const isEnrolled = selectedClassItem.students?.some(student => student.name === userName);
    const isFull = selectedClassItem.enrolledStudents >= selectedClassItem.capacity;
    const checkInStatus = isCheckInAvailable(selectedClassItem.time);

    const handleCheckIn = () => {
      if (checkInStatus !== 'available') return;
      
      // Aqui você pode adicionar a lógica para registrar o check-in
      alert('Check-in realizado com sucesso!');
    };

    return (
      <ClassDetailsContainer>
        <div>
          <ClassHeader>
            <Button 
              onClick={() => setSelectedClass(null)}
              variant="blocked"
              icon={<ArrowLeft size={20} />}
            />
          </ClassHeader>

          <ClassTime>
            {selectedClassItem.time} • 60 minutos • {selectedClassItem.instructor}
          </ClassTime>
        </div>

        <Card>
          <SectionTitle>Sobre a Aula</SectionTitle>
          <p style={{ color: '#a3a3a3', marginBottom: '1.5rem' }}>{selectedClassItem.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                {selectedClassItem.enrolledStudents}/{selectedClassItem.capacity} alunos
              </span>
            </div>
            {isEnrolled && (
              <CheckInStatus $status={checkInStatus}>
                {checkInStatus === 'available' && 'Check-in disponível'}
                {checkInStatus === 'not_available' && 'Check-in em breve'}
                {checkInStatus === 'expired' && 'Check-in expirado'}
              </CheckInStatus>
            )}
          </div>
        </Card>

        <Card>
          <SectionTitle>Alunos Inscritos</SectionTitle>
          <div className="space-y-4">
            {selectedClassItem.students?.map((student, index) => (
              <div 
                key={student.id}
                className="p-4 rounded-xl bg-[rgba(30,30,30,0.5)] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold"
                  >
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-400">
                      {student.belt.charAt(0).toUpperCase() + student.belt.slice(1)} • {student.stripes} {student.stripes === 1 ? 'grau' : 'graus'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Button
            onClick={() => handleEnrollment(selectedClassItem as ExtendedClassDetails)}
            disabled={!isEnrolled && isFull}
            variant={isEnrolled ? 'muted' : 'primary'}
            fullWidth
          >
            {isEnrolled ? 'Cancelar Inscrição' : isFull ? 'Turma Lotada' : 'Inscrever-se'}
          </Button>
          {isEnrolled && checkInStatus === 'available' && (
            <Button
              onClick={handleCheckIn}
              variant="primary"
              fullWidth
            >
              Fazer Check-in
            </Button>
          )}
        </div>
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
      <div className="space-y-8">
        <div>
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

          <div className="grid grid-cols-5 gap-4">
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
                    relative p-4 rounded-xl text-center cursor-pointer transition-all duration-200
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
          <Card>
            <div className="space-y-4">
              {weekScheduleState.days[selectedDay as keyof typeof WeekDays].classes.map((classItem) => (
                <div
                  key={classItem.id}
                  id={`class-${classItem.id}`}
                  onClick={() => setSelectedClass(classItem)}
                  className="p-4 rounded-xl bg-[rgba(30,30,30,0.5)] hover:bg-[rgba(30,30,30,0.7)] cursor-pointer"
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