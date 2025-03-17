import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuthContext } from '../../contexts/AuthContext';

const Container = styled.div`
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #ffffff;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BrandSection = styled.div`
  background-color: #111111;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 100% 100%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const Logo = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.025em;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const BrandText = styled.p`
  color: #a3a3a3;
  text-align: center;
  max-width: 24rem;
  line-height: 1.5;
  position: relative;
  z-index: 1;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  background-color: #0a0a0a;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const FormDescription = styled.p`
  color: #a3a3a3;
  font-size: 0.875rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;

  &:last-of-type {
    margin-bottom: 1.5rem;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #a3a3a3;
  font-size: 0.875rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(30, 30, 30, 0.5);
  border: 1px solid rgba(45, 45, 45, 0.5);
  border-radius: 0.75rem;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  &::placeholder {
    color: #6b7280;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.875rem;
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #374151;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SuccessMessage = styled.div`
  color: #10b981;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.75rem;
  background-color: rgba(16, 185, 129, 0.1);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.75rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const BackIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const SuccessIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12" y2="16" />
  </svg>
);

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { requestPasswordReset, resetPassword } = useAuthContext();
  const token = searchParams.get('token');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      await requestPasswordReset(email);
      setSuccess('Email enviado com sucesso! Verifique sua caixa de entrada.');
    } catch (err) {
      setError('Não foi possível enviar o email. Tente novamente.');
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      await resetPassword(token || '', password);
      setSuccess('Senha alterada com sucesso!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Não foi possível alterar a senha. Tente novamente.');
      setSuccess(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <BrandSection>
        <Logo>Fightbox</Logo>
        <BrandText>
          Gerencie seus treinos, acompanhe sua evolução e conecte-se com a comunidade do Jiu-Jitsu.
        </BrandText>
      </BrandSection>

      <FormSection>
        <FormHeader>
          <FormTitle>
            {token ? 'Defina sua nova senha' : 'Recuperar senha'}
          </FormTitle>
          <FormDescription>
            {token 
              ? 'Digite e confirme sua nova senha'
              : 'Digite seu email para receber as instruções de recuperação'}
          </FormDescription>
        </FormHeader>

        {success && (
          <SuccessMessage>
            <SuccessIcon />
            {success}
          </SuccessMessage>
        )}

        {error && (
          <ErrorMessage>
            <ErrorIcon />
            {error}
          </ErrorMessage>
        )}

        {token ? (
          <form onSubmit={handleResetPassword}>
            <FormGroup>
              <Label htmlFor="new-password">Nova senha</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirm-password">Confirmar nova senha</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit" disabled={isLoading}>
              {isLoading 
                ? 'Carregando...' 
                : 'Alterar senha'
              }
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRequestReset}>
            <FormGroup>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit" disabled={isLoading}>
              {isLoading 
                ? 'Carregando...' 
                : 'Enviar instruções'
              }
            </Button>
          </form>
        )}

        <BackButton type="button" onClick={() => navigate('/login')}>
          <BackIcon />
          Voltar para o login
        </BackButton>
      </FormSection>
    </Container>
  );
};

export default ResetPassword; 