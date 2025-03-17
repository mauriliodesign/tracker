import { WeekSchedule } from '../types';

export const initialWeekSchedule: WeekSchedule = {
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