import { Theme } from '../types';

export const theme: Theme = {
  colors: {
    primary: '#2563eb',
    secondary: '#1d4ed8',
    background: '#0a0a0a',
    text: '#ffffff',
    muted: '#a3a3a3'
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem'
  },
  borderRadius: {
    small: '0.25rem',
    medium: '0.5rem',
    large: '1rem'
  }
};

export const getBeltColor = (belt: string): string => {
  switch (belt) {
    case 'branca': return '#FFFFFF';
    case 'azul': return '#0066CC';
    case 'roxa': return '#660099';
    case 'marrom': return '#663300';
    case 'preta': return '#000000';
    default: return '#CCCCCC';
  }
};

export const getStatusColor = (enrolled: number, capacity: number): string => {
  if (enrolled >= capacity) return '#ef4444'; // red
  if (enrolled >= capacity * 0.8) return '#f59e0b'; // yellow
  return '#10b981'; // green
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}; 