import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-image: 
    radial-gradient(circle at 100% 100%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.05) 0%, transparent 50%);
`;

const Card = styled.div`
  background-color: rgba(17, 17, 17, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const CardHeader = styled.div`
  padding: 2rem 1.5rem;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.025em;
`;

const TabContainer = styled.div`
  display: flex;
  padding: 0.25rem;
  margin: 0 1.5rem;
  background-color: rgba(30, 30, 30, 0.5);
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.75rem;
  background-color: ${props => props.$active ? '#2563eb' : 'transparent'};
  color: ${props => props.$active ? '#ffffff' : '#a3a3a3'};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 500;

  &:hover {
    color: #ffffff;
    background-color: ${props => props.$active ? '#2563eb' : 'rgba(255, 255, 255, 0.05)'};
  }
`;

const Form = styled.form`
  padding: 0 1.5rem 1.5rem;
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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(30, 30, 30, 0.5);
  border: 1px solid rgba(45, 45, 45, 0.5);
  border-radius: 0.75rem;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
  appearance: none;
  font-size: 0.875rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
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

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const GoogleButton = styled(Button)`
  background-color: #ffffff;
  color: #1f2937;
  margin-bottom: 1rem;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
  }

  span {
    padding: 0 1rem;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12" y2="16" />
  </svg>
);

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    belt: 'branca',
    stripes: '0'
  });

  const handleGoogleLogin = () => {
    // Implementar lógica de login com Google
    navigate('/aulas');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de login
    navigate('/aulas');
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    // Implementar lógica de cadastro
    navigate('/aulas');
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <Logo>Fightbox</Logo>
        </CardHeader>

        <TabContainer>
          <Tab 
            $active={activeTab === 'login'} 
            onClick={() => setActiveTab('login')}
          >
            Login
          </Tab>
          <Tab 
            $active={activeTab === 'signup'} 
            onClick={() => setActiveTab('signup')}
          >
            Cadastro
          </Tab>
        </TabContainer>

        {activeTab === 'login' ? (
          <Form onSubmit={handleLoginSubmit}>
            <GoogleButton type="button" onClick={handleGoogleLogin}>
              <GoogleIcon />
              Continuar com Google
            </GoogleButton>

            <Divider>
              <span>ou</span>
            </Divider>

            <FormGroup>
              <Label htmlFor="login-email">E-mail</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="seu@email.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="login-password">Senha</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </FormGroup>
            <Button type="submit">
              Entrar
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleSignupSubmit}>
            <GoogleButton type="button" onClick={handleGoogleLogin}>
              <GoogleIcon />
              Cadastrar com Google
            </GoogleButton>

            <Divider>
              <span>ou</span>
            </Divider>

            <FormGroup>
              <Label htmlFor="signup-name">Nome completo</Label>
              <Input
                id="signup-name"
                type="text"
                placeholder="João Silva"
                value={signupForm.name}
                onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="signup-email">E-mail</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="seu@email.com"
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="signup-password">Senha</Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="••••••••"
                value={signupForm.password}
                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="signup-confirm-password">Confirmar senha</Label>
              <Input
                id="signup-confirm-password"
                type="password"
                placeholder="••••••••"
                value={signupForm.confirmPassword}
                onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="signup-belt">Faixa</Label>
              <Select
                id="signup-belt"
                value={signupForm.belt}
                onChange={(e) => setSignupForm({ ...signupForm, belt: e.target.value })}
                required
              >
                <option value="branca">Branca</option>
                <option value="azul">Azul</option>
                <option value="roxa">Roxa</option>
                <option value="marrom">Marrom</option>
                <option value="preta">Preta</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="signup-stripes">Graus</Label>
              <Select
                id="signup-stripes"
                value={signupForm.stripes}
                onChange={(e) => setSignupForm({ ...signupForm, stripes: e.target.value })}
                required
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Select>
            </FormGroup>
            {error && (
              <ErrorMessage>
                <ErrorIcon />
                {error}
              </ErrorMessage>
            )}
            <Button type="submit">
              Cadastrar
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
};

export default Auth; 