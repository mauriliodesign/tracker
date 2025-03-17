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