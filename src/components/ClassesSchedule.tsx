/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import styled from '@emotion/styled';
import Button from './Button';
import Header from './Header/Header';
import { default as SidebarComponent } from './Sidebar/Sidebar';

// Types
export interface Student {
  id: string;
  name: string;
  belt: string;
  stripes: number;
}

export interface ClassDetails {
  id: string;
  name: string;
  time: string;
  instructor: string;
  type: string;
  description: string;
  capacity: number;
  enrolledStudents: number;
  students?: Student[];
}

export interface DaySchedule {
  date: string;
  classes: ClassDetails[];
}

export interface WeekSchedule {
  name: string;
  days: {
    [key in keyof typeof WeekDays]: DaySchedule;
  };
}

export interface WeekDay {
  key: keyof typeof WeekDays;
  label: string;
}

export enum WeekDays {
  domingo = 'domingo',
  segunda = 'segunda',
  terca = 'terca',
  quarta = 'quarta',
  quinta = 'quinta',
  sexta = 'sexta',
  sabado = 'sabado'
}

// Dados de exemplo expandidos para uma semana completa
const initialWeekSchedule: WeekSchedule = {
  name: "Semana Atual",
  days: {
    domingo: {
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      classes: []
    },
    segunda: {
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      classes: [
        {
          id: '1',
          name: 'Crosstraining',
          time: '09:00',
          instructor: 'Prof. Carlos',
          enrolledStudents: 5,
          capacity: 12,
          type: 'crosstraining',
          description: 'Treino funcional focado em desenvolver força, resistência e mobilidade para o Jiu-jitsu.',
          students: [
            { id: '1', name: 'Ana Silva', belt: 'roxa', stripes: 2 },
            { id: '2', name: 'Pedro Santos', belt: 'azul', stripes: 4 },
            { id: '3', name: 'Maria Oliveira', belt: 'branca', stripes: 3 }
          ]
        },
        {
          id: '2',
          name: 'Jiu-jitsu Fundamentos',
          time: '10:00',
          instructor: 'Prof. André',
          enrolledStudents: 8,
          capacity: 15,
          type: 'jiu-jitsu',
          description: 'Aula focada em técnicas fundamentais do Jiu-jitsu.',
          students: [
            { id: '6', name: 'Carlos Eduardo', belt: 'branca', stripes: 1 },
            { id: '7', name: 'Fernanda Lima', belt: 'azul', stripes: 2 }
          ]
        }
      ]
    },
    terca: {
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      classes: [
        {
          id: '3',
          name: 'Jiu-jitsu Avançado',
          time: '19:00',
          instructor: 'Prof. André',
          enrolledStudents: 12,
          capacity: 15,
          type: 'jiu-jitsu',
          description: 'Aula avançada com foco em técnicas complexas.',
          students: [
            { id: '9', name: 'Ricardo Silva', belt: 'marrom', stripes: 2 },
            { id: '10', name: 'Patricia Santos', belt: 'roxa', stripes: 3 }
          ]
        }
      ]
    },
    quarta: {
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      classes: [
        {
          id: '4',
          name: 'Yoga',
          time: '14:00',
          instructor: 'Prof. Maria',
          enrolledStudents: 6,
          capacity: 10,
          type: 'yoga',
          description: 'Aula de yoga focada em flexibilidade e recuperação.',
          students: [
            { id: '12', name: 'Amanda Reis', belt: 'roxa', stripes: 1 },
            { id: '13', name: 'Bruno Oliveira', belt: 'preta', stripes: 2 }
          ]
        }
      ]
    },
    quinta: {
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      classes: [
        {
          id: '5',
          name: 'Jiu-jitsu Fundamentos',
          time: '20:00',
          instructor: 'Prof. André',
          enrolledStudents: 7,
          capacity: 15,
          type: 'jiu-jitsu',
          description: 'Aula focada em técnicas fundamentais do Jiu-jitsu.',
          students: []
        }
      ]
    },
    sexta: {
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      classes: [
        {
          id: '6',
          name: 'Crosstraining',
          time: '18:00',
          instructor: 'Prof. Carlos',
          enrolledStudents: 8,
          capacity: 12,
          type: 'crosstraining',
          description: 'Treino funcional focado em desenvolver força.',
          students: []
        }
      ]
    },
    sabado: {
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      classes: []
    }
  }
};

const Container = styled.div`
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #ffffff;
  display: flex;
`;

const MainContent = styled.div<{ $isSidebarOpen: boolean, $isSidebarCollapsed: boolean }>`
  flex: 1;
  margin-left: 280px;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const PageContent = styled.main`
  flex: 1;
  padding: 1.5rem;
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #222222;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SidebarNav = styled.nav`
  padding: 1.5rem;
  flex: 1;
`;

const SidebarLink = styled(Link)<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: ${props => props.$active ? '#ffffff' : '#a3a3a3'};
  text-decoration: none;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease-in-out;
  background-color: ${props => props.$active ? '#2563eb' : 'transparent'};

  &:hover {
    background-color: ${props => props.$active ? '#2563eb' : '#1e1e1e'};
    color: #ffffff;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.75rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 60;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #1e1e1e;
  color: #ffffff;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2d2d2d;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #222222;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: #1e1e1e;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2d2d2d;
  }

  .user-details {
    flex: 1;
    
    .name {
      font-weight: 500;
    }
    
    .belt {
      font-size: 0.875rem;
      color: #a3a3a3;
    }
  }
`;

const Avatar = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #ffffff;
  background-color: #2563eb;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const CompletionBadge = styled.div<{ $status: 'completed' | 'available' | 'blocked' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${props => {
    switch (props.$status) {
      case 'completed': return '#10B981';
      case 'available': return '#2563eb';
      case 'blocked': return '#1e1e1e';
    }
  }};
  color: #ffffff;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translateY(1px);
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

const getWeekDates = (weekOffset: number = 0) => {
  const today = new Date();
  const currentDay = today.getDay();
  const diff = currentDay === 0 ? -6 : 1 - currentDay; // Ajusta para começar na segunda-feira

  // Data da segunda-feira da semana atual
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff + (weekOffset * 7));

  return {
    domingo: (() => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + 6);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    })(),
    segunda: monday.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    terca: (() => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + 1);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    })(),
    quarta: (() => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + 2);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    })(),
    quinta: (() => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + 3);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    })(),
    sexta: (() => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + 4);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    })(),
    sabado: (() => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + 5);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    })()
  } as const;
};

const createWeekSchedule = (weekOffset: number = 0): WeekSchedule => {
  const dates = getWeekDates(weekOffset);
  
  return {
    name: weekOffset === 0 ? "Semana Atual" : 
          weekOffset > 0 ? `${weekOffset} semana${weekOffset > 1 ? 's' : ''} à frente` :
          `${Math.abs(weekOffset)} semana${Math.abs(weekOffset) > 1 ? 's' : ''} atrás`,
    days: {
      domingo: {
        date: dates.domingo,
        classes: []
      },
      segunda: {
        date: dates.segunda,
        classes: initialWeekSchedule.days.segunda.classes
      },
      terca: {
        date: dates.terca,
        classes: initialWeekSchedule.days.terca.classes
      },
      quarta: {
        date: dates.quarta,
        classes: initialWeekSchedule.days.quarta.classes
      },
      quinta: {
        date: dates.quinta,
        classes: initialWeekSchedule.days.quinta.classes
      },
      sexta: {
        date: dates.sexta,
        classes: initialWeekSchedule.days.sexta.classes
      },
      sabado: {
        date: dates.sabado,
        classes: []
      }
    }
  };
};

const ClassesSchedule = () => {
  const [activeTab, setActiveTab] = useState('aulas');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassDetails | null>(null);
  const [weekIndex, setWeekIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [weekScheduleState, setWeekScheduleState] = useState<WeekSchedule>(createWeekSchedule(0));
  const navigate = useNavigate();
  const userName = "João Silva";
  const userBelt = "azul";
  const userStripes: number = 2;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  // Função para formatar a data no padrão DD/MM
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

      const newStudent: Student = {
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
      <div className="p-4">
        <div className="mb-6 flex items-center">
          <Button 
            onClick={() => setSelectedClass(null)}
            variant="blocked"
            icon={<ArrowLeft size={20} />}
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{selectedClass.name}</h1>
            <div className="text-gray-400">{selectedClass.time} - {selectedClass.instructor}</div>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <h2 className="text-lg font-semibold mb-2">Sobre a Aula</h2>
            <p className="text-gray-400">{selectedClass.description}</p>
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
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="text-gray-400">
                  {selectedClass.enrolledStudents}/{selectedClass.capacity} alunos
                </span>
              </div>
            </div>
            <Button
              variant={isEnrolled ? 'muted' : isFull ? 'blocked' : 'primary'}
              fullWidth
              onClick={() => handleEnrollment(selectedClass)}
              disabled={isFull && !isEnrolled}
              className="mt-4"
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
              {selectedClass.students?.map(student => (
                <div 
                  key={student.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: getBeltColor(student.belt) }}
                    />
                    <span>{student.name}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {student.belt.charAt(0).toUpperCase() + student.belt.slice(1)} • {student.stripes} {student.stripes === 1 ? 'grau' : 'graus'}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
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
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Aulas da Semana</h1>
            </div>
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

  const renderProfile = () => {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-8">
          <Button 
            onClick={() => {
              setActiveTab('aulas');
              setShowProfile(false);
            }}
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
                {userBelt.charAt(0).toUpperCase() + userBelt.slice(1)} • {userStripes} {userStripes === 1 ? 'grau' : 'graus'}
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

          <Card>
            <h2 className="text-lg font-semibold mb-4">Próximas Aulas</h2>
            <div className="space-y-3">
              {Object.values(weekScheduleState.days)
                .flatMap(day => day.classes)
                .filter(classItem => classItem.students?.some(student => student.name === userName))
                .slice(0, 3)
                .map(classItem => (
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
                      onClick={() => handleEnrollment(classItem)}
                    >
                      Cancelar
                    </Button>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <Container>
      <SidebarComponent
        $isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        activeTab={activeTab}
        onTabChange={(tab: string) => {
          setActiveTab(tab);
          setShowProfile(false);
          setIsSidebarOpen(false);
        }}
        userName={userName}
        userBelt={userBelt}
        userStripes={userStripes}
        onProfileClick={() => {
          setShowProfile(true);
          setSelectedClass(null);
          setSelectedDay(null);
          setIsSidebarOpen(false);
        }}
        isCollapsed={isSidebarCollapsed}
        onCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <MainContent 
        $isSidebarOpen={isSidebarOpen}
        $isSidebarCollapsed={isSidebarCollapsed}
      >
        <Header
          title={showProfile ? "Perfil" : "Aulas"}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <PageContent>
          {showProfile 
            ? renderProfile() 
            : selectedClass
            ? renderClassDetails()
            : renderSchedule()}
        </PageContent>
      </MainContent>
    </Container>
  );
};

export default ClassesSchedule;