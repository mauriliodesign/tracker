import { useState, useEffect } from 'react';
import { WeekSchedule, WeekDays, ClassDetails } from '../types';
import { initialWeekSchedule } from '../data/initialData';

interface UseScheduleProps {
  userName: string;
  userBelt: string;
  userStripes: number;
}

interface UseScheduleReturn {
  weekSchedule: WeekSchedule;
  selectedDay: WeekDays | null;
  selectedClass: ClassDetails | null;
  weekIndex: number;
  handleDaySelect: (day: WeekDays | null) => void;
  handleClassSelect: (classItem: ClassDetails | null) => void;
  handleWeekChange: (direction: 'next' | 'prev') => void;
  handleEnrollment: (classItem: ClassDetails) => void;
  getCurrentDayKey: () => WeekDays;
}

const getWeekDates = (weekOffset: number = 0) => {
  const today = new Date();
  const currentDay = today.getDay();
  const diff = currentDay === 0 ? -6 : 1 - currentDay;

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
        classes: initialWeekSchedule.days.domingo.classes
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
        classes: initialWeekSchedule.days.sabado.classes
      }
    }
  };
};

export const useSchedule = ({ userName, userBelt, userStripes }: UseScheduleProps): UseScheduleReturn => {
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule>(createWeekSchedule(0));
  const [selectedDay, setSelectedDay] = useState<WeekDays | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassDetails | null>(null);
  const [weekIndex, setWeekIndex] = useState(0);

  useEffect(() => {
    setWeekSchedule(createWeekSchedule(weekIndex));
  }, [weekIndex]);

  const getCurrentDayKey = (): WeekDays => {
    const today = new Date();
    const dayIndex = today.getDay();
    const days: WeekDays[] = [
      WeekDays.domingo,
      WeekDays.segunda,
      WeekDays.terca,
      WeekDays.quarta,
      WeekDays.quinta,
      WeekDays.sexta,
      WeekDays.sabado
    ];
    return days[dayIndex];
  };

  useEffect(() => {
    const currentDayKey = getCurrentDayKey();
    setSelectedDay(currentDayKey);
  }, []);

  const handleDaySelect = (day: WeekDays | null) => {
    setSelectedDay(day);
    setSelectedClass(null);
  };

  const handleClassSelect = (classItem: ClassDetails | null) => {
    setSelectedClass(classItem);
  };

  const handleWeekChange = (direction: 'next' | 'prev') => {
    setWeekIndex(prev => direction === 'next' ? prev + 1 : prev - 1);
    setSelectedDay(null);
    setSelectedClass(null);
  };

  const handleEnrollment = (classItem: ClassDetails) => {
    if (!selectedDay) return;

    const isEnrolled = classItem.students?.some(student => student.name === userName);
    
    if (isEnrolled) {
      const updatedStudents = classItem.students?.filter(student => student.name !== userName) || [];
      const updatedClass = {
        ...classItem,
        students: updatedStudents,
        enrolledStudents: classItem.enrolledStudents - 1
      };
      
      updateClassInSchedule(updatedClass);
    } else {
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

      updateClassInSchedule(updatedClass);
    }
  };

  const updateClassInSchedule = (updatedClass: ClassDetails) => {
    if (!selectedDay) return;

    setSelectedClass(updatedClass);
    
    setWeekSchedule(prevState => ({
      ...prevState,
      days: {
        ...prevState.days,
        [selectedDay]: {
          ...prevState.days[selectedDay],
          classes: prevState.days[selectedDay].classes.map(c => 
            c.id === updatedClass.id ? updatedClass : c
          )
        }
      }
    }));
  };

  return {
    weekSchedule,
    selectedDay,
    selectedClass,
    weekIndex,
    handleDaySelect,
    handleClassSelect,
    handleWeekChange,
    handleEnrollment,
    getCurrentDayKey
  };
}; 