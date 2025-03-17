/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import styled from '@emotion/styled';

interface CategoryData {
  total: number;
  completed: number;
  percentage: number;
}

interface TrainingTypeData {
  total: number;
  completed: number;
  percentage: number;
}

interface StatsData {
  categoryData: {
    [key: string]: CategoryData;
  };
  trainingTypeData: {
    [key: string]: TrainingTypeData;
  };
  topExercises: [string, number][];
  totalTrainings: number;
  completedTrainings: number;
  weeklyAverage: number;
  monthlyAverage: number;
}

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  completed: boolean;
}

interface Section {
  name?: string;
  exercises: Exercise[];
}

interface Training {
  name: string;
  sections: Section[];
}

interface Week {
  name: string;
  trainings: {
    [key: string]: Training;
  };
}

interface ExerciseVideoMapping {
  [key: string]: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

const trainingProgram: Week[] = [
  // Semana 1
  {
    name: "Semana 1: Força BJJ",
    trainings: {
      "A": {
        name: "Treino A: Força BJJ A",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Rotação Externa de Ombros", sets: "2", reps: "15", completed: false },
              { name: "Prancha Lateral Adutor", sets: "2", reps: "15\"", completed: false },
              { name: "Rotação de Tronco na Polia ou Band", sets: "2", reps: "10", completed: false },
              { name: "Passada com Rotação Segurando Anilha", sets: "2", reps: "10", completed: false },
              { name: "Half Turkish Get Up", sets: "2", reps: "10", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Back Squat + DB Snatch", sets: "4", reps: "6", completed: false },
              { name: "Passada para Trás Zercher", sets: "3", reps: "6", completed: false },
              { name: "Supino Reto com Pegada Fechada", sets: "3", reps: "6", completed: false },
              { name: "Remada Unilateral com Halter Deadstop", sets: "3", reps: "6", completed: false },
              { name: "Barra Fixa", sets: "3", reps: "6", completed: false }
            ]
          },
          {
            name: "Acessórios",
            exercises: [
              { name: "Flexão de Braço sobre Halter", sets: "3", reps: "12", completed: false },
              { name: "Bíceps Pegada Pronada", sets: "3", reps: "12", completed: false },
              { name: "Plate Grip Hold", sets: "3", reps: "30-60\"", completed: false }
            ]
          }
        ]
      },
      "B": {
        name: "Treino B: Força BJJ B",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Rotação Externa de Ombros", sets: "2", reps: "15", completed: false },
              { name: "Elevação de Quadril com Adução (Bola)", sets: "2", reps: "15", completed: false },
              { name: "One Arm Front Plank", sets: "2", reps: "20\"", completed: false },
              { name: "Zombie Crunch", sets: "2", reps: "20", completed: false },
              { name: "One Arm Farmer Carry", sets: "2", reps: "20m", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Clean High Pull", sets: "4", reps: "6", completed: false },
              { name: "Deadlift Dead Stop", sets: "4", reps: "6", completed: false },
              { name: "Passada para Trás com Halter", sets: "3", reps: "12", completed: false },
              { name: "Supino com Halter no Solo Quadril Alto", sets: "3", reps: "12", completed: false },
              { name: "Gorilla Row", sets: "3", reps: "24", completed: false }
            ]
          },
          {
            name: "Acessórios",
            exercises: [
              { name: "DB Hang Clean High Pull", sets: "3", reps: "12", completed: false },
              { name: "Bíceps Martelo + Desenvolvimento com Halter", sets: "3", reps: "12", completed: false },
              { name: "Farmer Hold (Sem Tocar na Coxa)", sets: "3", reps: "30\"", completed: false },
              { name: "Plate Grip", sets: "3", reps: "12", completed: false }
            ]
          }
        ]
      },
      "C": {
        name: "Treino C: Força BJJ C",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Pallof Press", sets: "2", reps: "15", completed: false },
              { name: "Cossack Squat", sets: "2", reps: "10", completed: false },
              { name: "Prancha com Carga", sets: "2", reps: "1min", completed: false },
              { name: "Knees Up", sets: "2", reps: "15", completed: false },
              { name: "KB Side Bend", sets: "2", reps: "15", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Front DB Squat + Jump Squat", sets: "3/3", reps: "8/12", completed: false },
              { name: "Glute Bridge + Swing Russo", sets: "4/3", reps: "8/12", completed: false },
              { name: "Paralelas + Flexão com Salto", sets: "3/3", reps: "8/8-12", completed: false },
              { name: "Barras + Isometria", sets: "3/3", reps: "3-6/15-20\"", completed: false },
              { name: "Desenvolvimento Semi Ajoelhado", sets: "3", reps: "8", completed: false }
            ]
          },
          {
            name: "Acessórios",
            exercises: [
              { name: "Subida na Prancha (Tríceps)", sets: "3", reps: "8", completed: false },
              { name: "Bíceps Martelo + Isometria", sets: "3", reps: "8", completed: false },
              { name: "Sprawl + Plate Jump", sets: "6", reps: "20\"on/40\"off", completed: false }
            ]
          }
        ]
      }
    }
  },
  // Semana 2
  {
    name: "Semana 2: Força BJJ",
    trainings: {
      "A": {
        name: "Treino A: Força BJJ A",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Crucifixo Inverso no Band", sets: "2", reps: "15", completed: false },
              { name: "Plate Good Morning", sets: "2", reps: "15", completed: false },
              { name: "Russian Twist", sets: "2", reps: "10", completed: false },
              { name: "Landmine Rotation", sets: "2", reps: "10", completed: false },
              { name: "SIT", sets: "2", reps: "20\"", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Deadlift", sets: "4", reps: "6-6-3-3", completed: false },
              { name: "Power Lunges", sets: "4", reps: "6/6", completed: false },
              { name: "Nordic Curl", sets: "3", reps: "6", completed: false },
              { name: "Back Squat", sets: "4", reps: "10-8-6-4", completed: false },
              { name: "DB Snatch", sets: "4", reps: "12", completed: false }
            ]
          },
          {
            name: "Condicionamento",
            exercises: [
              { name: "Burpees", sets: "4", reps: "6", completed: false },
              { name: "Intervalos (diminuindo a cada semana)", sets: "1", reps: "variável", completed: false }
            ]
          }
        ]
      },
      "B": {
        name: "Treino B: Força BJJ B",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Rotação Externa de Ombros", sets: "2", reps: "15", completed: false },
              { name: "Puxadas na Posição de Prancha", sets: "2", reps: "12", completed: false },
              { name: "Zombie Crunch Unilateral", sets: "2", reps: "8", completed: false },
              { name: "Passagem de DB Lado pro Outro", sets: "2", reps: "8", completed: false },
              { name: "Halo Press", sets: "2", reps: "16", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Supino Reto + Flexões com Salto", sets: "4/4", reps: "6/6", completed: false },
              { name: "Pendlay Row + DB Power Row", sets: "4/4", reps: "6/6", completed: false },
              { name: "Barra Fixa", sets: "1", reps: "Máximo", completed: false },
              { name: "Landmine Press", sets: "3", reps: "8", completed: false }
            ]
          },
          {
            name: "Acessórios",
            exercises: [
              { name: "Bíceps Pegada Pronada", sets: "3", reps: "12", completed: false },
              { name: "Troca de Pegada com Anilha", sets: "3", reps: "30", completed: false }
            ]
          }
        ]
      },
      "C": {
        name: "Treino C: Força BJJ C",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Face Pull", sets: "2", reps: "15", completed: false },
              { name: "Glute Bridge Unilateral", sets: "2", reps: "15", completed: false },
              { name: "Cardio (Bike/Corda/Corrida/Remo)", sets: "4", reps: "1min", completed: false },
              { name: "V-Ups", sets: "4", reps: "15", completed: false },
              { name: "BJJ Push Up", sets: "4", reps: "10", completed: false },
              { name: "Agachamentos", sets: "4", reps: "15", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Zercher Squat", sets: "4", reps: "6", completed: false },
              { name: "DB Clean High Pull Base Split", sets: "4", reps: "6", completed: false },
              { name: "Deadlift Deadstop", sets: "4", reps: "3", completed: false },
              { name: "Extensão de Tronco (Romano/GHD)", sets: "3", reps: "12", completed: false }
            ]
          },
          {
            name: "Força e Resistência",
            exercises: [
              { name: "Bíceps Alternado", sets: "3-4", reps: "12", completed: false },
              { name: "Push Ups", sets: "3-4", reps: "12", completed: false },
              { name: "Elevação Frontal com Plate", sets: "3-4", reps: "12", completed: false },
              { name: "Plate Bíceps Hold", sets: "3-4", reps: "20seg", completed: false },
              { name: "Circuito Resistência Muscular Braços", sets: "1", reps: "variável", completed: false }
            ]
          }
        ]
      }
    }
  },
  // Semana 3
  {
    name: "Semana 3: Força BJJ",
    trainings: {
      "A": {
        name: "Treino A: Força BJJ A",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Crucifixo Inverso no Band", sets: "2", reps: "15", completed: false },
              { name: "Plate Good Morning", sets: "2", reps: "15", completed: false },
              { name: "Russian Twist", sets: "2", reps: "10", completed: false },
              { name: "Landmine Rotation", sets: "2", reps: "10", completed: false },
              { name: "SIT", sets: "2", reps: "20\"", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Deadlift", sets: "4", reps: "6-6-3-3", completed: false },
              { name: "Power Lunges", sets: "4", reps: "6/6", completed: false },
              { name: "Nordic Curl", sets: "3", reps: "6", completed: false },
              { name: "Back Squat", sets: "4", reps: "10-8-6-4", completed: false },
              { name: "DB Snatch", sets: "4", reps: "12", completed: false }
            ]
          },
          {
            name: "Condicionamento",
            exercises: [
              { name: "Burpees", sets: "4", reps: "6", completed: false },
              { name: "Intervalos (diminuindo a cada semana)", sets: "1", reps: "variável", completed: false }
            ]
          }
        ]
      },
      "B": {
        name: "Treino B: Força BJJ B",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Rotação Externa de Ombros", sets: "2", reps: "15", completed: false },
              { name: "Puxadas na Posição de Prancha", sets: "2", reps: "12", completed: false },
              { name: "Zombie Crunch Unilateral", sets: "2", reps: "8", completed: false },
              { name: "Passagem de DB Lado pro Outro", sets: "2", reps: "8", completed: false },
              { name: "Halo Press", sets: "2", reps: "16", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Supino Reto + Flexões com Salto", sets: "4/4", reps: "6/6", completed: false },
              { name: "Pendlay Row + DB Power Row", sets: "4/4", reps: "6/6", completed: false },
              { name: "Barra Fixa", sets: "1", reps: "Máximo", completed: false },
              { name: "Landmine Press", sets: "3", reps: "8", completed: false }
            ]
          },
          {
            name: "Acessórios",
            exercises: [
              { name: "Bíceps Pegada Pronada", sets: "3", reps: "12", completed: false },
              { name: "Troca de Pegada com Anilha", sets: "3", reps: "30", completed: false }
            ]
          }
        ]
      },
      "C": {
        name: "Treino C: Força BJJ C",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Face Pull", sets: "2", reps: "15", completed: false },
              { name: "Glute Bridge Unilateral", sets: "2", reps: "15", completed: false },
              { name: "Cardio (Bike/Corda/Corrida/Remo)", sets: "4", reps: "1min", completed: false },
              { name: "V-Ups", sets: "4", reps: "15", completed: false },
              { name: "BJJ Push Up", sets: "4", reps: "10", completed: false },
              { name: "Agachamentos", sets: "4", reps: "15", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Zercher Squat", sets: "4", reps: "6", completed: false },
              { name: "DB Clean High Pull Base Split", sets: "4", reps: "6", completed: false },
              { name: "Deadlift Deadstop", sets: "4", reps: "3", completed: false },
              { name: "Extensão de Tronco (Romano/GHD)", sets: "3", reps: "12", completed: false }
            ]
          },
          {
            name: "Força e Resistência",
            exercises: [
              { name: "Bíceps Alternado", sets: "3-4", reps: "12", completed: false },
              { name: "Push Ups", sets: "3-4", reps: "12", completed: false },
              { name: "Elevação Frontal com Plate", sets: "3-4", reps: "12", completed: false },
              { name: "Plate Bíceps Hold", sets: "3-4", reps: "20seg", completed: false },
              { name: "Circuito Resistência Muscular Braços", sets: "1", reps: "variável", completed: false }
            ]
          }
        ]
      }
    }
  },
  // Semana 4
  {
    name: "Semana 4: Força BJJ",
    trainings: {
      "A": {
        name: "Treino A: Força BJJ A",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Crucifixo Inverso no Band", sets: "2", reps: "15", completed: false },
              { name: "Plate Good Morning", sets: "2", reps: "15", completed: false },
              { name: "Russian Twist", sets: "2", reps: "10", completed: false },
              { name: "Landmine Rotation", sets: "2", reps: "10", completed: false },
              { name: "SIT", sets: "2", reps: "20\"", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Deadlift", sets: "4", reps: "6-6-3-3", completed: false },
              { name: "Power Lunges", sets: "4", reps: "6/6", completed: false },
              { name: "Nordic Curl", sets: "3", reps: "6", completed: false },
              { name: "Back Squat", sets: "4", reps: "10-8-6-4", completed: false },
              { name: "DB Snatch", sets: "4", reps: "12", completed: false }
            ]
          },
          {
            name: "Condicionamento",
            exercises: [
              { name: "Burpees", sets: "4", reps: "6", completed: false },
              { name: "Intervalos (diminuindo a cada semana)", sets: "1", reps: "variável", completed: false }
            ]
          }
        ]
      },
      "B": {
        name: "Treino B: Força BJJ B",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Rotação Externa de Ombros", sets: "2", reps: "15", completed: false },
              { name: "Puxadas na Posição de Prancha", sets: "2", reps: "12", completed: false },
              { name: "Zombie Crunch Unilateral", sets: "2", reps: "8", completed: false },
              { name: "Passagem de DB Lado pro Outro", sets: "2", reps: "8", completed: false },
              { name: "Halo Press", sets: "2", reps: "16", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Supino Reto + Flexões com Salto", sets: "4/4", reps: "6/6", completed: false },
              { name: "Pendlay Row + DB Power Row", sets: "4/4", reps: "6/6", completed: false },
              { name: "Barra Fixa", sets: "1", reps: "Máximo", completed: false },
              { name: "Landmine Press", sets: "3", reps: "8", completed: false }
            ]
          },
          {
            name: "Acessórios",
            exercises: [
              { name: "Bíceps Pegada Pronada", sets: "3", reps: "12", completed: false },
              { name: "Troca de Pegada com Anilha", sets: "3", reps: "30", completed: false }
            ]
          }
        ]
      },
      "C": {
        name: "Treino C: Força BJJ C",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Face Pull", sets: "2", reps: "15", completed: false },
              { name: "Glute Bridge Unilateral", sets: "2", reps: "15", completed: false },
              { name: "Cardio (Bike/Corda/Corrida/Remo)", sets: "4", reps: "1min", completed: false },
              { name: "V-Ups", sets: "4", reps: "15", completed: false },
              { name: "BJJ Push Up", sets: "4", reps: "10", completed: false },
              { name: "Agachamentos", sets: "4", reps: "15", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Zercher Squat", sets: "4", reps: "6", completed: false },
              { name: "DB Clean High Pull Base Split", sets: "4", reps: "6", completed: false },
              { name: "Deadlift Deadstop", sets: "4", reps: "3", completed: false },
              { name: "Extensão de Tronco (Romano/GHD)", sets: "3", reps: "12", completed: false }
            ]
          },
          {
            name: "Força e Resistência",
            exercises: [
              { name: "Bíceps Alternado", sets: "3-4", reps: "12", completed: false },
              { name: "Push Ups", sets: "3-4", reps: "12", completed: false },
              { name: "Elevação Frontal com Plate", sets: "3-4", reps: "12", completed: false },
              { name: "Plate Bíceps Hold", sets: "3-4", reps: "20seg", completed: false },
              { name: "Circuito Resistência Muscular Braços", sets: "1", reps: "variável", completed: false }
            ]
          }
        ]
      }
    }
  },
  // Semana 5
  {
    name: "Semana 5: Força BJJ",
    trainings: {
      "A": {
        name: "Treino A: Força BJJ A",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Crucifixo Inverso no Band", sets: "2", reps: "15", completed: false },
              { name: "Plate Good Morning", sets: "2", reps: "15", completed: false },
              { name: "Russian Twist", sets: "2", reps: "10", completed: false },
              { name: "Landmine Rotation", sets: "2", reps: "10", completed: false },
              { name: "SIT", sets: "2", reps: "20\"", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Deadlift", sets: "4", reps: "6-6-3-3", completed: false },
              { name: "Power Lunges", sets: "4", reps: "6/6", completed: false },
              { name: "Nordic Curl", sets: "3", reps: "6", completed: false },
              { name: "Back Squat", sets: "4", reps: "10-8-6-4", completed: false },
              { name: "DB Snatch", sets: "4", reps: "12", completed: false }
            ]
          },
          {
            name: "Condicionamento",
            exercises: [
              { name: "Burpees", sets: "4", reps: "6", completed: false },
              { name: "Intervalos (diminuindo a cada semana)", sets: "1", reps: "variável", completed: false }
            ]
          }
        ]
      },
      "B": {
        name: "Treino B: Força BJJ B",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Rotação Externa de Ombros", sets: "2", reps: "15", completed: false },
              { name: "Puxadas na Posição de Prancha", sets: "2", reps: "12", completed: false },
              { name: "Zombie Crunch Unilateral", sets: "2", reps: "8", completed: false },
              { name: "Passagem de DB Lado pro Outro", sets: "2", reps: "8", completed: false },
              { name: "Halo Press", sets: "2", reps: "16", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Supino Reto + Flexões com Salto", sets: "4/4", reps: "6/6", completed: false },
              { name: "Pendlay Row + DB Power Row", sets: "4/4", reps: "6/6", completed: false },
              { name: "Barra Fixa", sets: "1", reps: "Máximo", completed: false },
              { name: "Landmine Press", sets: "3", reps: "8", completed: false }
            ]
          },
          {
            name: "Acessórios",
            exercises: [
              { name: "Bíceps Pegada Pronada", sets: "3", reps: "12", completed: false },
              { name: "Troca de Pegada com Anilha", sets: "3", reps: "30", completed: false }
            ]
          }
        ]
      },
      "C": {
        name: "Treino C: Força BJJ C",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Face Pull", sets: "2", reps: "15", completed: false },
              { name: "Glute Bridge Unilateral", sets: "2", reps: "15", completed: false },
              { name: "Cardio (Bike/Corda/Corrida/Remo)", sets: "4", reps: "1min", completed: false },
              { name: "V-Ups", sets: "4", reps: "15", completed: false },
              { name: "BJJ Push Up", sets: "4", reps: "10", completed: false },
              { name: "Agachamentos", sets: "4", reps: "15", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Zercher Squat", sets: "4", reps: "6", completed: false },
              { name: "DB Clean High Pull Base Split", sets: "4", reps: "6", completed: false },
              { name: "Deadlift Deadstop", sets: "4", reps: "3", completed: false },
              { name: "Extensão de Tronco (Romano/GHD)", sets: "3", reps: "12", completed: false }
            ]
          },
          {
            name: "Força e Resistência",
            exercises: [
              { name: "Bíceps Alternado", sets: "3-4", reps: "12", completed: false },
              { name: "Push Ups", sets: "3-4", reps: "12", completed: false },
              { name: "Elevação Frontal com Plate", sets: "3-4", reps: "12", completed: false },
              { name: "Plate Bíceps Hold", sets: "3-4", reps: "20seg", completed: false },
              { name: "Circuito Resistência Muscular Braços", sets: "1", reps: "variável", completed: false }
            ]
          }
        ]
      }
    }
  },
  // Semana 6
  {
    name: "Semana 6: Força BJJ",
    trainings: {
      "A": {
        name: "Treino A: Força BJJ A",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Crucifixo Inverso no Band", sets: "2", reps: "15", completed: false },
              { name: "Plate Good Morning", sets: "2", reps: "15", completed: false },
              { name: "Russian Twist", sets: "2", reps: "10", completed: false },
              { name: "Landmine Rotation", sets: "2", reps: "10", completed: false },
              { name: "SIT", sets: "2", reps: "20\"", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Deadlift", sets: "4", reps: "6-6-3-3", completed: false },
              { name: "Power Lunges", sets: "4", reps: "6/6", completed: false },
              { name: "Nordic Curl", sets: "3", reps: "6", completed: false },
              { name: "Back Squat", sets: "4", reps: "10-8-6-4", completed: false },
              { name: "DB Snatch", sets: "4", reps: "12", completed: false }
            ]
          },
          {
            name: "Condicionamento",
            exercises: [
              { name: "Burpees", sets: "4", reps: "6", completed: false },
              { name: "Intervalos (diminuindo a cada semana)", sets: "1", reps: "variável", completed: false }
            ]
          }
        ]
      },
      "B": {
        name: "Treino B: Força BJJ B",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Rotação Externa de Ombros", sets: "2", reps: "15", completed: false },
              { name: "Puxadas na Posição de Prancha", sets: "2", reps: "12", completed: false },
              { name: "Zombie Crunch Unilateral", sets: "2", reps: "8", completed: false },
              { name: "Passagem de DB Lado pro Outro", sets: "2", reps: "8", completed: false },
              { name: "Halo Press", sets: "2", reps: "16", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Supino Reto + Flexões com Salto", sets: "4/4", reps: "6/6", completed: false },
              { name: "Pendlay Row + DB Power Row", sets: "4/4", reps: "6/6", completed: false },
              { name: "Barra Fixa", sets: "1", reps: "Máximo", completed: false },
              { name: "Landmine Press", sets: "3", reps: "8", completed: false }
            ]
          },
          {
            name: "Acessórios",
            exercises: [
              { name: "Bíceps Pegada Pronada", sets: "3", reps: "12", completed: false },
              { name: "Troca de Pegada com Anilha", sets: "3", reps: "30", completed: false }
            ]
          }
        ]
      },
      "C": {
        name: "Treino C: Força BJJ C",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Face Pull", sets: "2", reps: "15", completed: false },
              { name: "Glute Bridge Unilateral", sets: "2", reps: "15", completed: false },
              { name: "Cardio (Bike/Corda/Corrida/Remo)", sets: "4", reps: "1min", completed: false },
              { name: "V-Ups", sets: "4", reps: "15", completed: false },
              { name: "BJJ Push Up", sets: "4", reps: "10", completed: false },
              { name: "Agachamentos", sets: "4", reps: "15", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Zercher Squat", sets: "4", reps: "6", completed: false },
              { name: "DB Clean High Pull Base Split", sets: "4", reps: "6", completed: false },
              { name: "Deadlift Deadstop", sets: "4", reps: "3", completed: false },
              { name: "Extensão de Tronco (Romano/GHD)", sets: "3", reps: "12", completed: false }
            ]
          },
          {
            name: "Força e Resistência",
            exercises: [
              { name: "Bíceps Alternado", sets: "3-4", reps: "12", completed: false },
              { name: "Push Ups", sets: "3-4", reps: "12", completed: false },
              { name: "Elevação Frontal com Plate", sets: "3-4", reps: "12", completed: false },
              { name: "Plate Bíceps Hold", sets: "3-4", reps: "20seg", completed: false },
              { name: "Circuito Resistência Muscular Braços", sets: "1", reps: "variável", completed: false }
            ]
          }
        ]
      }
    }
  },
  // Semana 7
  {
    name: "Semana 7: Força BJJ",
    trainings: {
      "A": {
        name: "Treino A: Força BJJ A",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "One Leg Deadlift", sets: "2", reps: "6/6", completed: false },
              { name: "Goblet Squat Clean", sets: "2", reps: "10", completed: false },
              { name: "BJJ Glute Bridge", sets: "2", reps: "12", completed: false },
              { name: "Kimura Crunch", sets: "2", reps: "24", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Back Squat", sets: "6", reps: "6-6-3-3-1", completed: false },
              { name: "Deadlift", sets: "4", reps: "3", completed: false },
              { name: "Agachamento com Salto com Peso", sets: "4", reps: "6", completed: false },
              { name: "Levantada Ajoelhado para Passada", sets: "4", reps: "40\"", completed: false }
            ]
          },
          {
            name: "Intervalado",
            exercises: [
              { name: "Flexão de Joelho com Bola + Chinese Plank", sets: "3", reps: "12+20seg", completed: false },
              { name: "Zercher Hold", sets: "3", reps: "40\"", completed: false }
            ]
          }
        ]
      },
      "B": {
        name: "Treino B: Força BJJ B",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Rotação Externa de Ombros", sets: "2", reps: "15", completed: false },
              { name: "Isometria KB Bottom Up", sets: "2", reps: "20\"", completed: false },
              { name: "Rotação de Tronco Base Split com Anilha", sets: "2", reps: "6/6", completed: false },
              { name: "Dragon Flag", sets: "2", reps: "8", completed: false },
              { name: "KB Hold", sets: "2", reps: "30/30\"", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Supino Reto + Barra Fixa com Peso", sets: "4", reps: "6-6-3-3", completed: false },
              { name: "Paralelas + Flexão de Braço", sets: "3", reps: "12+12", completed: false },
              { name: "Remada Unilateral com Halter (Dropset)", sets: "3", reps: "12+12", completed: false },
              { name: "DB Clean Jerk", sets: "3", reps: "8", completed: false }
            ]
          },
          {
            name: "Acessórios",
            exercises: [
              { name: "Bíceps com Barra + Isometria", sets: "3", reps: "8", completed: false },
              { name: "Flexão de Braço Pegada Fechada", sets: "1", reps: "Máximo", completed: false },
              { name: "Antebraço no Rolamento da Barra", sets: "3", reps: "6/6", completed: false }
            ]
          }
        ]
      },
      "C": {
        name: "Treino C: Força BJJ C",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Face Pull", sets: "2", reps: "15", completed: false },
              { name: "Elevação de Quadril Unilateral", sets: "2", reps: "15/15", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Clean High Pull", sets: "6", reps: "3", completed: false },
              { name: "DB Snatch", sets: "6", reps: "6", completed: false },
              { name: "Farmer Carry", sets: "3", reps: "20m", completed: false },
              { name: "Gorilla Row", sets: "3", reps: "20", completed: false },
              { name: "Swing", sets: "3", reps: "20", completed: false },
              { name: "Farmer Carry", sets: "3", reps: "20", completed: false }
            ]
          },
          {
            name: "Força e Resistência",
            exercises: [
              { name: "Nordic Curl + Isometria na Última", sets: "3", reps: "6", completed: false },
              { name: "Circuito Resistência Muscular Braços", sets: "1", reps: "Intervalado de potência", completed: false }
            ]
          }
        ]
      }
    }
  },
  // Semana 8
  {
    name: "Semana 8: Força BJJ",
    trainings: {
      "A": {
        name: "Treino A: Força BJJ A",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "One Leg Deadlift", sets: "2", reps: "6/6", completed: false },
              { name: "Goblet Squat Clean", sets: "2", reps: "10", completed: false },
              { name: "BJJ Glute Bridge", sets: "2", reps: "12", completed: false },
              { name: "Kimura Crunch", sets: "2", reps: "24", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Back Squat", sets: "6", reps: "6-6-3-3-1", completed: false },
              { name: "Deadlift", sets: "4", reps: "3", completed: false },
              { name: "Agachamento com Salto com Peso", sets: "4", reps: "6", completed: false },
              { name: "Levantada Ajoelhado para Passada", sets: "4", reps: "40\"", completed: false }
            ]
          },
          {
            name: "Intervalado",
            exercises: [
              { name: "Flexão de Joelho com Bola + Chinese Plank", sets: "3", reps: "12+20seg", completed: false },
              { name: "Zercher Hold", sets: "3", reps: "40\"", completed: false }
            ]
          }
        ]
      },
      "B": {
        name: "Treino B: Força BJJ B",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Rotação Externa de Ombros", sets: "2", reps: "15", completed: false },
              { name: "Isometria KB Bottom Up", sets: "2", reps: "20\"", completed: false },
              { name: "Rotação de Tronco Base Split com Anilha", sets: "2", reps: "6/6", completed: false },
              { name: "Dragon Flag", sets: "2", reps: "8", completed: false },
              { name: "KB Hold", sets: "2", reps: "30/30\"", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Supino Reto + Barra Fixa com Peso", sets: "4", reps: "6-6-3-3", completed: false },
              { name: "Paralelas + Flexão de Braço", sets: "3", reps: "12+12", completed: false },
              { name: "Remada Unilateral com Halter (Dropset)", sets: "3", reps: "12+12", completed: false },
              { name: "DB Clean Jerk", sets: "3", reps: "8", completed: false }
            ]
          },
          {
            name: "Acessórios",
            exercises: [
              { name: "Bíceps com Barra + Isometria", sets: "3", reps: "8", completed: false },
              { name: "Flexão de Braço Pegada Fechada", sets: "1", reps: "Máximo", completed: false },
              { name: "Antebraço no Rolamento da Barra", sets: "3", reps: "6/6", completed: false }
            ]
          }
        ]
      },
      "C": {
        name: "Treino C: Força BJJ C",
        sections: [
          {
            name: "Ativação e Prevenção",
            exercises: [
              { name: "Face Pull", sets: "2", reps: "15", completed: false },
              { name: "Elevação de Quadril Unilateral", sets: "2", reps: "15/15", completed: false }
            ]
          },
          {
            name: "Força Principal",
            exercises: [
              { name: "Clean High Pull", sets: "6", reps: "3", completed: false },
              { name: "DB Snatch", sets: "6", reps: "6", completed: false },
              { name: "Farmer Carry", sets: "3", reps: "20m", completed: false },
              { name: "Gorilla Row", sets: "3", reps: "20", completed: false },
              { name: "Swing", sets: "3", reps: "20", completed: false },
              { name: "Farmer Carry", sets: "3", reps: "20", completed: false }
            ]
          },
          {
            name: "Força e Resistência",
            exercises: [
              { name: "Nordic Curl + Isometria na Última", sets: "3", reps: "6", completed: false },
              { name: "Circuito Resistência Muscular Braços", sets: "1", reps: "Intervalado de potência", completed: false }
            ]
          }
        ]
      }
    }
  }
];

const Container = styled.div`
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #ffffff;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #111111;
  border-bottom: 1px solid #222222;
`;

const Button = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${props => props.active ? '#2563eb' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#a3a3a3'};
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.active ? '#2563eb' : '#1e1e1e'};
    color: #ffffff;
  }
`;

const IconButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
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

const CompletionBadge = styled.div<{ completed: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: ${props => props.completed ? '#10B981' : '#6B7280'};
  background-color: ${props => props.completed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)'};
`;

const WeekDayCard = styled(Card)<{ completed?: boolean }>`
  position: relative;
  overflow: hidden;
  padding: 1.25rem;
  border: 1px solid ${props => props.completed ? '#10B981' : '#222222'};
  transition: all 0.3s ease-in-out;
  border-radius: 12px;

  &:hover {
    background-color: #161616;
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

interface SelectedExercise {
  name: string;
  weekIndex: number;
  trainingType: string;
  sectionIndex: number;
  exerciseIndex: number;
}

const weekMappings: { [key: number]: string } = {
  0: "semana_1_2",
  1: "semana_1_2",
  2: "semana_3_6",
  3: "semana_3_6",
  4: "semana_3_6",
  5: "semana_3_6",
  6: "semana_7_8",
  7: "semana_7_8"
};

const trainingMappings: { [key: string]: string } = {
  "A": "forca_bjj_a",
  "B": "forca_bjj_b",
  "C": "forca_bjj_c"
};

const exerciseVideos: ExerciseVideoMapping = {
  "semana_1_2": {
    "forca_bjj_a": {
      "Rotação Externa de Ombros": "https://youtu.be/Ipu4ELmNHV0?t=60",
      "Prancha Lateral Adutor": "https://youtu.be/Ipu4ELmNHV0?t=90",
      "Rotação de Tronco na Polia ou Band": "https://youtu.be/Ipu4ELmNHV0?t=120",
      "Passada com Rotação Segurando Anilha": "https://youtu.be/Ipu4ELmNHV0?t=150",
      "Half Turkish Get Up": "https://youtu.be/Ipu4ELmNHV0?t=180",
      "Back Squat + DB Snatch": "https://youtu.be/Ipu4ELmNHV0?t=210",
      "Passada para Trás Zercher": "https://youtu.be/Ipu4ELmNHV0?t=240",
      "Supino Reto com Pegada Fechada": "https://youtu.be/Ipu4ELmNHV0?t=270",
      "Remada Unilateral com Halter Deadstop": "https://youtu.be/Ipu4ELmNHV0?t=300",
      "Barra Fixa": "https://youtu.be/Ipu4ELmNHV0?t=330"
    },
    "forca_bjj_b": {
      "Clean High Pull": "https://youtu.be/XLAvYJ_jhbc?t=60",
      "Deadlift Dead Stop": "https://youtu.be/XLAvYJ_jhbc?t=90",
      "Passada para Trás com Halter": "https://youtu.be/XLAvYJ_jhbc?t=120",
      "Supino com Halter no Solo Quadril Alto": "https://youtu.be/XLAvYJ_jhbc?t=150",
      "Gorilla Row": "https://youtu.be/XLAvYJ_jhbc?t=180",
      "DB Hang Clean High Pull": "https://youtu.be/XLAvYJ_jhbc?t=210"
    },
    "forca_bjj_c": {
      "Pallof Press": "https://youtu.be/Y5SXM_t9Dk4?t=60",
      "Cossack Squat": "https://youtu.be/Y5SXM_t9Dk4?t=90",
      "Prancha com Carga": "https://youtu.be/Y5SXM_t9Dk4?t=120",
      "Front DB Squat + Jump Squat": "https://youtu.be/Y5SXM_t9Dk4?t=150",
      "Glute Bridge + Swing Russo": "https://youtu.be/Y5SXM_t9Dk4?t=180",
      "Paralelas + Flexão com Salto": "https://youtu.be/Y5SXM_t9Dk4?t=210"
    }
  },
  "semana_3_6": {
    "forca_bjj_a": {
      "Crucifixo Inverso no Band": "https://youtu.be/LIMcJCvelmA?t=60",
      "Plate Good Morning": "https://youtu.be/LIMcJCvelmA?t=90",
      "Russian Twist": "https://youtu.be/LIMcJCvelmA?t=120",
      "Landmine Rotation": "https://youtu.be/LIMcJCvelmA?t=150",
      "Deadlift": "https://youtu.be/LIMcJCvelmA?t=180",
      "Power Lunges": "https://youtu.be/LIMcJCvelmA?t=210",
      "Nordic Curl": "https://youtu.be/LIMcJCvelmA?t=240",
      "Back Squat": "https://youtu.be/LIMcJCvelmA?t=270",
      "DB Snatch": "https://youtu.be/LIMcJCvelmA?t=300"
    },
    "forca_bjj_b": {
      "Rotação Externa de Ombros": "https://youtu.be/mcxAfEktW90?t=60",
      "Puxadas na Posição de Prancha": "https://youtu.be/mcxAfEktW90?t=90",
      "Zombie Crunch Unilateral": "https://youtu.be/mcxAfEktW90?t=120",
      "Passagem de DB Lado pro Outro": "https://youtu.be/mcxAfEktW90?t=150",
      "Halo Press": "https://youtu.be/mcxAfEktW90?t=180",
      "Supino Reto + Flexões com Salto": "https://youtu.be/mcxAfEktW90?t=210",
      "Pendlay Row + DB Power Row": "https://youtu.be/mcxAfEktW90?t=240",
      "Barra Fixa": "https://youtu.be/mcxAfEktW90?t=270",
      "Landmine Press": "https://youtu.be/mcxAfEktW90?t=300"
    }
  },
  "semana_7_8": {
    "forca_bjj_a": {
      "One Leg Deadlift": "https://youtu.be/UsbKsC2a0K0?t=60",
      "Goblet Squat Clean": "https://youtu.be/UsbKsC2a0K0?t=90",
      "BJJ Glute Bridge": "https://youtu.be/UsbKsC2a0K0?t=120",
      "Kimura Crunch": "https://youtu.be/UsbKsC2a0K0?t=150",
      "Back Squat": "https://youtu.be/UsbKsC2a0K0?t=180",
      "Deadlift": "https://youtu.be/UsbKsC2a0K0?t=210",
      "Agachamento com Salto com Peso": "https://youtu.be/UsbKsC2a0K0?t=240",
      "Levantada Ajoelhado para Passada": "https://youtu.be/UsbKsC2a0K0?t=270"
    },
    "forca_bjj_b": {
      "Rotação Externa de Ombros": "https://youtu.be/9EyHLb3NO3E?t=60",
      "Isometria KB Bottom Up": "https://youtu.be/9EyHLb3NO3E?t=90",
      "Rotação de Tronco Base Split com Anilha": "https://youtu.be/9EyHLb3NO3E?t=120",
      "Dragon Flag": "https://youtu.be/9EyHLb3NO3E?t=150",
      "KB Hold": "https://youtu.be/9EyHLb3NO3E?t=180",
      "Supino Reto + Barra Fixa com Peso": "https://youtu.be/9EyHLb3NO3E?t=210",
      "Paralelas + Flexão de Braço": "https://youtu.be/9EyHLb3NO3E?t=240",
      "Remada Unilateral com Halter (Dropset)": "https://youtu.be/9EyHLb3NO3E?t=270",
      "DB Clean Jerk": "https://youtu.be/9EyHLb3NO3E?t=300"
    }
  }
};

const JiuJitsuTrackerStatsPreview = () => {
  const [activeTab, setActiveTab] = useState('trainings');
  const [selectedTraining, setSelectedTraining] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<SelectedExercise | null>(null);
  const userName = "João Silva";

  // Inicializar o programa com dados do localStorage ou usar o padrão
  const [program, setProgram] = useState<Week[]>(() => {
    const savedProgress = localStorage.getItem('trainingProgress');
    if (savedProgress) {
      try {
        return JSON.parse(savedProgress);
      } catch (error) {
        console.error('Error loading progress:', error);
        return trainingProgram;
      }
    }
    return trainingProgram;
  });

  const toggleExerciseCompletion = (
    weekIndex: number,
    trainingType: string,
    sectionIndex: number,
    exerciseIndex: number
  ) => {
    setProgram(prevProgram => {
      const updatedProgram = [...prevProgram];
      const exercise = updatedProgram[weekIndex].trainings[trainingType].sections[sectionIndex].exercises[exerciseIndex];
      exercise.completed = !exercise.completed;
      
      // Salvar o progresso atualizado no localStorage
      localStorage.setItem('trainingProgress', JSON.stringify(updatedProgram));
      
      return updatedProgram;
    });
  };

  const calculateWeekProgress = (weekIndex: number) => {
    const week = program[weekIndex];
    let totalExercises = 0;
    let completedExercises = 0;

    Object.values(week.trainings).forEach(training => {
      training.sections.forEach(section => {
        totalExercises += section.exercises.length;
        completedExercises += section.exercises.filter(e => e.completed).length;
      });
    });
    
    return {
      total: totalExercises,
      completed: completedExercises,
      percentage: Math.round((completedExercises / totalExercises) * 100)
    };
  };

  const isTrainingCompleted = (training?: Training) => {
    if (!training) return false;
    return training.sections.every(section =>
      section.exercises.every(exercise => exercise.completed)
    );
  };

  const isWeekCompleted = (week?: Week) => {
    if (!week) return false;
    return Object.values(week.trainings).every(training => isTrainingCompleted(training));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const statsData: StatsData = {
    categoryData: {
      pernas: { total: 24, completed: 18, percentage: 75 },
      superiores: { total: 38, completed: 25, percentage: 66 },
      core: { total: 32, completed: 23, percentage: 72 },
      combinados: { total: 16, completed: 8, percentage: 50 },
      outros: { total: 5, completed: 2, percentage: 40 }
    },
    trainingTypeData: {
      'A': { total: 39, completed: 30, percentage: 77 },
      'B': { total: 38, completed: 25, percentage: 66 },
      'C': { total: 38, completed: 21, percentage: 55 }
    },
    topExercises: [
      ["Rotação Externa", 6],
      ["Deadlift", 5],
      ["Prancha", 4],
      ["Barra Fixa", 4],
      ["Squat", 4]
    ],
    totalTrainings: 0,
    completedTrainings: 0,
    weeklyAverage: 0,
    monthlyAverage: 0
  };
  
  const totalExercises = Object.values(statsData.categoryData).reduce((sum, item) => sum + item.total, 0);
  
  const categoryColors: { [key: string]: string } = {
    pernas: 'bg-red-700',
    superiores: 'bg-blue-700',
    core: 'bg-green-700',
    combinados: 'bg-purple-700',
    outros: 'bg-gray-600'
  };
  
  const typeColors: { [key: string]: string } = {
    'A': 'bg-amber-700',
    'B': 'bg-emerald-700',
    'C': 'bg-sky-700'
  };
  
  const trainingDetails = {
    'A': {
      exercises: [
        { name: 'Rotação Externa', sets: 3, reps: '12x', completed: true },
        { name: 'Deadlift', sets: 4, reps: '8x', completed: true },
        { name: 'Prancha', sets: 3, reps: '30s', completed: false },
        { name: 'Barra Fixa', sets: 3, reps: '8x', completed: true },
        { name: 'Squat', sets: 4, reps: '10x', completed: true }
      ]
    },
    'B': {
      exercises: [
        { name: 'Pull-up', sets: 3, reps: '8x', completed: true },
        { name: 'Push-up', sets: 3, reps: '15x', completed: true },
        { name: 'Leg Press', sets: 4, reps: '12x', completed: false },
        { name: 'Abdominal', sets: 3, reps: '20x', completed: true }
      ]
    },
    'C': {
      exercises: [
        { name: 'Agachamento', sets: 4, reps: '12x', completed: true },
        { name: 'Remada', sets: 3, reps: '12x', completed: false },
        { name: 'Extensão Lombar', sets: 3, reps: '15x', completed: true },
        { name: 'Ponte', sets: 3, reps: '30s', completed: false }
      ]
    }
  };
  
  const exportProgress = () => {
    const data = {
      program,
      stats: calculateOverallStats(),
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jiujitsu-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.program) {
          setProgram(data.program);
          localStorage.setItem('trainingProgress', JSON.stringify(data.program));
        }
      } catch (error) {
        console.error('Error importing progress:', error);
      }
    };
    reader.readAsText(file);
  };

  const renderHome = () => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Início</h2>
        <div className="bg-gray-800 rounded-lg shadow p-4 mb-4">
          <h3 className="font-medium mb-3">Próximos Treinos</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-gray-700">
              <div className="text-sm">Treino A - Hoje</div>
              <div className="text-xs text-gray-400">14:00 - 15:30</div>
            </div>
            <div className="p-3 rounded-lg bg-gray-700">
              <div className="text-sm">Treino B - Amanhã</div>
              <div className="text-xs text-gray-400">16:00 - 17:30</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg shadow p-4 mb-4">
          <h3 className="font-medium mb-3">Resumo da Semana</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-gray-700">
              <div className="text-sm uppercase text-gray-400">Treinos Realizados</div>
              <div className="text-2xl font-bold mt-1">3</div>
            </div>
            <div className="p-3 rounded-lg bg-gray-700">
              <div className="text-sm uppercase text-gray-400">Exercícios Completos</div>
              <div className="text-2xl font-bold mt-1">15</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStats = () => {
    const stats = calculateOverallStats();
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Estatísticas Gerais</h1>
          <div className="flex space-x-2">
            <Button onClick={exportProgress}>
              Exportar Progresso
            </Button>
            <label className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
              Importar Progresso
              <input
                type="file"
                accept=".json"
                onChange={importProgress}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-lg font-medium mb-2">Progresso Total</h3>
            <div className="text-3xl font-bold text-blue-500">
              {Math.round((stats.completedTrainings / stats.totalTrainings) * 100)}%
            </div>
            <div className="text-sm text-gray-400">
              {stats.completedTrainings} de {stats.totalTrainings} exercícios
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-medium mb-2">Média de Conclusão</h3>
            <div className="text-3xl font-bold text-green-500">
              {stats.weeklyAverage}%
            </div>
            <div className="text-sm text-gray-400">por semana</div>
          </Card>
        </div>
      </div>
    );
  };

  const calculateOverallStats = () => {
    let totalTrainings = 0;
    let completedTrainings = 0;
    let totalExercises = 0;
    let completedExercises = 0;
    let weeklyAverage = 0;

    program.forEach(week => {
      Object.values(week.trainings).forEach(training => {
        totalTrainings += 1;
        completedTrainings += training.sections.reduce((sum, section) => sum + section.exercises.filter(e => e.completed).length, 0);
        totalExercises += training.sections.reduce((sum, section) => sum + section.exercises.length, 0);
        completedExercises += training.sections.reduce((sum, section) => sum + section.exercises.filter(e => e.completed).length, 0);
      });
    });

    weeklyAverage = Math.round((completedExercises / totalExercises) * 100);

    return {
      totalTrainings,
      completedTrainings,
      totalExercises,
      completedExercises,
      weeklyAverage,
      monthlyAverage: 0
    };
  };

  const renderProfile = () => {
    const stats = calculateOverallStats();
    
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center mb-8">
          <Button 
            onClick={() => {
              setActiveTab('trainings');
              setShowProfile(false);
            }}
            className="mr-4"
          >
            <ArrowLeft size={20} />
          </Button>
          <Avatar className="w-16 h-16 text-xl mr-4">
            {getInitials(userName)}
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{userName}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Progresso do Programa</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-3xl font-bold text-blue-500">
                  {stats.weeklyAverage}%
                </div>
                <div className="text-sm text-gray-400 mt-1">Média Semanal</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500">
                  {stats.completedTrainings}
                </div>
                <div className="text-sm text-gray-400 mt-1">Treinos Concluídos</div>
              </div>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${stats.weeklyAverage}%` }}
              ></div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-400">Email</div>
                <div>joao.silva@email.com</div>
              </div>
              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-400">Academia</div>
                <div>Team BJJ</div>
              </div>
              <div className="flex items-center">
                <div className="w-24 text-sm text-gray-400">Cidade</div>
                <div>São Paulo, SP</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderExerciseDetails = () => {
    if (!selectedExercise) return null;

    const exercise = program[selectedExercise.weekIndex]
      .trainings[selectedExercise.trainingType]
      .sections[selectedExercise.sectionIndex]
      .exercises[selectedExercise.exerciseIndex];

    const videoUrl = getVideoUrl();
    const embedUrl = getEmbedUrl(videoUrl);

    return (
      <div className="p-4">
        <div className="mb-6 flex items-center">
          <Button 
            onClick={() => setSelectedExercise(null)}
            className="mr-4"
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">{exercise.name}</h1>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              {embedUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title={exercise.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Vídeo não disponível para este exercício
                </div>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Detalhes do Exercício</h2>
            <div className="space-y-4">
              <div>
                <div className="font-medium mb-2">Descrição</div>
                <p className="text-gray-400">
                  {exerciseDescriptions[exercise.name] || 'Descrição não disponível'}
                </p>
              </div>
              <div>
                <div className="font-medium mb-2">Prescrição</div>
                <div className="flex space-x-4">
                  <div>
                    <div className="text-sm text-gray-400">Séries</div>
                    <div className="text-lg font-medium">{exercise.sets}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Repetições</div>
                    <div className="text-lg font-medium">{exercise.reps}</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Status</h2>
              <CompletionBadge completed={exercise.completed}>
                {exercise.completed ? 'Concluído' : 'Pendente'}
              </CompletionBadge>
            </div>
            <Button
              onClick={() => {
                toggleExerciseCompletion(
                  selectedExercise.weekIndex,
                  selectedExercise.trainingType,
                  selectedExercise.sectionIndex,
                  selectedExercise.exerciseIndex
                );
              }}
              className={`
                w-full py-3 mt-4 rounded-lg font-medium transition-all duration-300
                flex items-center justify-center space-x-2
                ${exercise.completed 
                  ? 'bg-green-600 hover:bg-green-700 text-white ring-1 ring-green-500'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'}
              `}
            >
              <svg className="w-5 h-5 text-white stroke-2" viewBox="0 0 24 24">
                <path
                  d="M20 6L9 17l-5-5"
                  className="stroke-current"
                />
              </svg>
              <span>
                {exercise.completed ? 'Exercício Concluído' : 'Marcar como Concluído'}
              </span>
            </Button>
          </Card>
        </div>
      </div>
    );
  };

  const getVideoUrl = (): string | null => {
    if (!selectedExercise) return null;

    const weekKey = weekMappings[selectedExercise.weekIndex];
    const trainingKey = trainingMappings[selectedExercise.trainingType];

    console.log('Looking up video with:', {
      weekKey,
      trainingKey,
      exerciseName: selectedExercise.name
    });

    if (!weekKey || !trainingKey) return null;

    const weekVideos = exerciseVideos[weekKey];
    if (!weekVideos) return null;

    const trainingVideos = weekVideos[trainingKey];
    if (!trainingVideos) return null;

    return trainingVideos[selectedExercise.name] || null;
  };

  const exerciseDescriptions: { [key: string]: string } = {
    'Deadlift': 'O levantamento terra é um exercício composto que trabalha principalmente as costas, glúteos e posteriores da coxa. Mantenha a coluna neutra, quadril para trás e peito para cima durante o movimento.',
    'Back Squat': 'O agachamento é um exercício fundamental que trabalha principalmente quadríceps, glúteos e core. Mantenha os pés na largura dos ombros, peito erguido e desça até a profundidade adequada.',
    'Bench Press': 'O supino é um exercício para peitoral, ombros e tríceps. Mantenha os ombros retraídos, pés firmes no chão e controle o movimento durante toda a execução.',
  };

  const getEmbedUrl = (url: string | null): string | undefined => {
    if (!url) return undefined;
    return url
      .replace('youtu.be/', 'www.youtube.com/embed/')
      .replace('?t=', '?start=');
  };

  const calculateTrainingProgress = (training?: Training) => {
    if (!training) return { total: 0, completed: 0, percentage: 0 };
    const totalExercises = training.sections.reduce((total, section) => 
      total + section.exercises.length, 0);
    const completedExercises = training.sections.reduce((total, section) =>
      total + section.exercises.filter(e => e.completed).length, 0);
    
    return {
      total: totalExercises,
      completed: completedExercises,
      percentage: Math.round((completedExercises / totalExercises) * 100)
    };
  };

  const renderTrainings = () => {
    const currentWeek = program[currentWeekIndex];
    
    if (!currentWeek) {
      return (
        <div className="p-4">
          <div className="text-center text-gray-400">
            Semana não encontrada
          </div>
        </div>
      );
    }
    
    const getFormattedDate = (addDays: number) => {
      const date = new Date();
      date.setDate(date.getDate() + addDays);
      return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
    };

    const today = new Date();
    const currentDay = today.getDay();
    const currentDayIndex = currentDay === 0 ? 6 : currentDay - 1;

    const allWeekDays = [
      { day: 'SEG', fullDay: 'Segunda', training: 'A' },
      { day: 'TER', fullDay: 'Terça', training: 'B' },
      { day: 'QUA', fullDay: 'Quarta', training: 'C' },
      { day: 'QUI', fullDay: 'Quinta', training: 'A' },
      { day: 'SEX', fullDay: 'Sexta', training: 'B' },
      { day: 'SAB', fullDay: 'Sábado', training: 'C' },
      { day: 'DOM', fullDay: 'Domingo', training: null }
    ];

    const weekDays = [...allWeekDays.slice(currentDayIndex), ...allWeekDays.slice(0, currentDayIndex)]
      .slice(0, 5)
      .map((day, index) => ({
        ...day,
        date: getFormattedDate(index)
      }));
    
    return (
      <div className="p-4">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">Semana {String(currentWeekIndex + 1).padStart(2, '0')}</h1>
              <CompletionBadge completed={isWeekCompleted(currentWeek)}>
                {isWeekCompleted(currentWeek) ? 'Semana Concluída' : 'Em Andamento'}
              </CompletionBadge>
            </div>
            <div className="flex space-x-2">
              <IconButton 
                onClick={() => {
                  if (currentWeekIndex > 0) {
                    setCurrentWeekIndex(currentWeekIndex - 1);
                    setSelectedDay(null);
                    setSelectedTraining(null);
                  }
                }}
                disabled={currentWeekIndex === 0}
                aria-label="Semana Anterior"
              >
                <ChevronLeft size={24} />
              </IconButton>
              <IconButton 
                onClick={() => {
                  if (currentWeekIndex < program.length - 1) {
                    setCurrentWeekIndex(currentWeekIndex + 1);
                    setSelectedDay(null);
                    setSelectedTraining(null);
                  }
                }}
                disabled={currentWeekIndex === program.length - 1}
                aria-label="Próxima Semana"
              >
                <ChevronRight size={24} />
              </IconButton>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {weekDays.map((weekDay, index) => {
              const isToday = index === 0;
              const training = weekDay.training ? currentWeek.trainings[weekDay.training] : null;
              const isCompleted = training ? isTrainingCompleted(training) : false;
              const isSelected = selectedDay === index;

              return (
                <div 
                  key={weekDay.day}
                  onClick={() => {
                    if (weekDay.training) {
                      if (selectedDay === index) {
                        setSelectedDay(null);
                        setSelectedTraining(null);
                      } else {
                        setSelectedDay(index);
                        setSelectedTraining(weekDay.training);
                      }
                    }
                  }}
                  className={`
                    relative p-4 rounded-lg text-center cursor-pointer transition-all duration-200
                    hover:bg-gray-800
                    ${isToday ? 'bg-gray-800' : ''}
                    ${isSelected ? 'bg-gray-700 ring-2 ring-blue-500' : ''}
                    ${!weekDay.training ? 'bg-gray-900 cursor-not-allowed' : ''}
                  `}
                >
                  <div className={`text-sm font-medium ${isToday ? 'text-blue-500' : ''}`}>
                    {weekDay.day}
                  </div>
                  <div className="text-xs mb-2 text-gray-400">
                    {weekDay.date}
                  </div>
                  {!weekDay.training && (
                    <div className="text-xs text-gray-500">
                      Descanso
                    </div>
                  )}
                  {isCompleted && (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {selectedTraining && (
          <div className="mt-8">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {currentWeek.trainings[selectedTraining].name}
                </h2>
                <CompletionBadge completed={isTrainingCompleted(currentWeek.trainings[selectedTraining])}>
                  {isTrainingCompleted(currentWeek.trainings[selectedTraining]) ? 'Concluído' : 'Em Andamento'}
                </CompletionBadge>
              </div>
              <div className="space-y-6">
                {currentWeek.trainings[selectedTraining].sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    {section.name && (
                      <div className="text-sm font-medium text-gray-400 mb-2">
                        {section.name}
                      </div>
                    )}
                    <div className="space-y-2">
                      {section.exercises.map((exercise, exerciseIndex) => (
                        <div 
                          key={exerciseIndex}
                          onClick={() => {
                            setSelectedExercise({
                              name: exercise.name,
                              weekIndex: currentWeekIndex,
                              trainingType: selectedTraining,
                              sectionIndex: sectionIndex,
                              exerciseIndex: exerciseIndex
                            });
                          }}
                          className="p-3 rounded-lg cursor-pointer flex items-center justify-between hover:bg-gray-800"
                        >
                          <div>
                            <div className="font-medium">{exercise.name}</div>
                            <div className="text-sm text-gray-400">
                              {exercise.sets} × {exercise.reps}
                            </div>
                          </div>
                          <div 
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              toggleExerciseCompletion(
                                currentWeekIndex,
                                selectedTraining,
                                sectionIndex,
                                exerciseIndex
                              );
                            }}
                            className={`
                              w-5 h-5 rounded-full border-2 flex items-center justify-center
                              transition-colors duration-200 cursor-pointer
                              ${exercise.completed 
                                ? 'bg-green-500 border-green-500 hover:bg-green-600' 
                                : 'border-gray-600 hover:border-gray-400'}
                            `}
                          >
                            {exercise.completed && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      ))}
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
      <Navigation>
        <div className="flex space-x-4">
          <Button
            active={activeTab === 'trainings'}
            onClick={() => {
              setActiveTab('trainings');
              setShowProfile(false);
            }}
          >
            Treinos
          </Button>
          <Button
            active={activeTab === 'stats'}
            onClick={() => {
              setActiveTab('stats');
              setShowProfile(false);
            }}
          >
            Estatísticas
          </Button>
        </div>
        <Avatar 
          onClick={() => {
            setShowProfile(true);
          }}
          aria-label="Abrir perfil"
        >
          {getInitials(userName)}
        </Avatar>
      </Navigation>
      <main className="container mx-auto py-6">
        {showProfile 
          ? renderProfile() 
          : selectedExercise
          ? renderExerciseDetails()
          : (activeTab === 'trainings' ? renderTrainings() : renderStats())}
      </main>
    </Container>
  );
};

export default JiuJitsuTrackerStatsPreview;