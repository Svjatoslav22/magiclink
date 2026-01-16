"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('Реєстрація...');
    
    try {
      const res = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setMessage(data.error || 'Помилка реєстрації');
        setIsLoading(false);
        return;
      }
      
      setMessage(data.message);
      setIsLoading(false);
    } catch (error) {
      setMessage('Помилка з\'єднання з сервером. Спробуйте пізніше.');
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('Вхід...');

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        setMessage(data.error || 'Помилка входу');
        setIsLoading(false);
        return;
      }
      
      setMessage(data.message);
      
      // Перенаправлення на dashboard після успішного входу
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
      
    } catch (error) {
      setMessage('Помилка з\'єднання з сервером. Спробуйте пізніше.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
        <div className="login-card">
          <a 
            href="https://next.privat24.ua/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="login-logo-link"
          >
            <div className="login-logo">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <rect width="60" height="60" rx="12" fill="#5BBC5B"/>
                <path d="M15 30L25 40L45 20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
          
          <h1 className="login-title">Вхід до системи</h1>
        <p className="login-subtitle">Введіть ваші дані для входу</p>

        <div className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="Введіть пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="forgot-password">
            <a href="#">Відновити пароль</a>
          </div>

          <button 
            className="btn-primary" 
            onClick={handleLogin}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <span className="btn-content">
                <span className="spinner"></span>
                Завантаження...
              </span>
            ) : 'Увійти'}
          </button>

          <button 
            className="btn-secondary" 
            onClick={handleRegister}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <span className="btn-content">
                <span className="spinner"></span>
                Реєстрація...
              </span>
            ) : 'Зареєструватися'}
          </button>

          {message && (
            <div className={`message ${message.includes('Помилка') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </div>

        <div className="login-footer">
          <p>Захищено системою безпеки</p>
        </div>
      </div>
    </div>
  );
}