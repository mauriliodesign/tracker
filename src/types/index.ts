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
    [key in WeekDays]: DaySchedule;
  };
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

export interface WeekDay {
  key: WeekDays;
  label: string;
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    muted: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  belt: string;
  stripes: number;
  academy: string;
  plan: string;
  monthlyStats: {
    trainings: number;
    classes: number;
    attendance: number;
  };
} 