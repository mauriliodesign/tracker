/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import styled from '@emotion/styled';
import Button from '../../components/Button';
import Layout from '../../components/Layout/Layout';
import { WeekDays, ClassDetails, WeekSchedule } from '../../types/schedule';
import { createWeekSchedule } from '../../utils/schedule';

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

const ClassesSchedule = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('aulas');
  const [showProfile, setShowProfile] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassDetails | null>(null);
  const [weekIndex, setWeekIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [weekScheduleState, setWeekScheduleState] = useState<WeekSchedule>(createWeekSchedule(0));
  const userName = "João Silva";
  const userBelt = "azul";
  const userStripes = 2;

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
                    {student.belt.charAt(0).toUpperCase() + student.belt.slice(1)} • {student.stripes} {student.stripes.toString() === '1' ? 'grau' : 'graus'}
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
      <div className="max-w-2xl mx-auto">
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
    <Layout
      title={showProfile ? "Perfil" : "Aulas"}
      activeTab={activeTab}
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
      {showProfile 
        ? renderProfile() 
        : selectedClass
        ? renderClassDetails()
        : renderSchedule()}
    </Layout>
  );
};

export default ClassesSchedule; 