/** @jsxRuntime classic */
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface StyledButtonProps {
  $variant?: 'primary' | 'completed' | 'blocked' | 'muted';
  $fullWidth?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  height: 48px;
  padding: 0 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${props => {
    switch (props.$variant) {
      case 'completed':
        return '#10B981';
      case 'blocked':
        return '#1e1e1e';
      case 'muted':
        return '#374151';
      case 'primary':
      default:
        return '#2563eb';
    }
  }};
  color: #ffffff;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  svg {
    margin-right: ${props => props.children ? '0.5rem' : '0'};
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'completed' | 'blocked' | 'muted';
  fullWidth?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

export const Button = ({
  variant = 'primary',
  fullWidth = false,
  icon,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $fullWidth={fullWidth}
      {...props}
    >
      {icon}
      {children}
    </StyledButton>
  );
};

export default Button; 