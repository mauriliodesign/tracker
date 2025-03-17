declare module 'lucide-react' {
  import { FC } from 'react';

  interface IconProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    className?: string;
  }

  export const ArrowLeft: FC<IconProps>;
  export const Home: FC<IconProps>;
  export const Calendar: FC<IconProps>;
  export const BarChart: FC<IconProps>;
  export const Sun: FC<IconProps>;
  export const Moon: FC<IconProps>;
  export const ChevronLeft: FC<IconProps>;
  export const ChevronRight: FC<IconProps>;
} 