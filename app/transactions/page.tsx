"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function TransactionsPage() {
    const router = useRouter();
    const [activeNav, setActiveNav] = useState('transactions');
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState<{
        transactions: Array<{
            _id: string;
            name: string;
            date: string;
            amount: string;
            signedAmount: number;
            type: string;
            icon: string;
            color: string;
            category: string;
        }>;
        incomeTotal: string;
        expenseTotal: string;
        count: number;
    } | null>(null);

    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

    useEffect(() => {
        if (!userId) {
            router.push('/');
            return;
        }
        
        const loadTransactions = async () => {
            try {
                const res = await fetch(`${API_URL}/api/transactions?userId=${userId}`);
                const result = await res.json();
                if (!res.ok) {
                    setError(result.error || 'Помилка завантаження транзакцій');
                    setLoading(false);
                    return;
                }
                setData(result);
                setLoading(false);
            } catch (e) {
                setError('Помилка з\'єднання з сервером');
                setLoading(false);
            }
        };
        
        loadTransactions();
    }, [userId]);

    const handleNavClick = (page: string) => {
        setActiveNav(page);
        if (page === 'dashboard') router.push('/dashboard');
        else if (page === 'cards') router.push('/cards');
        else if (page === 'transactions') return;
        else if (page === 'transfer') router.push('/transfer');
        else if (page === 'settings') router.push('/settings');
        else if (page === 'support') router.push('/support');
    };

    if (loading) {
        return (
            <div className="dashboard-wrapper">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 20 }}>
                    <div className="verify-spinner" style={{ width: 50, height: 50 }}></div>
                    <p style={{ color: '#888', fontSize: 16 }}>Завантаження транзакцій...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="dashboard-wrapper">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 20 }}>
                    <div style={{ color: '#ff6b6b', fontSize: 20, fontWeight: 700 }}>{error || 'Помилка завантаження'}</div>
                    <button className="btn-primary" style={{ maxWidth: 200, margin: 0 }} onClick={() => router.push('/')}>На головну</button>
                </div>
            </div>
        );
    }

    const filteredTransactions = filter === 'all' 
        ? data.transactions 
        : data.transactions.filter(t => t.category === filter);

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="dashboard-header-left">
                    <div className="dashboard-logo" onClick={() => router.push('/dashboard')}>
                        <svg width="32" height="32" viewBox="0 0 60 60" fill="none">
                            <rect width="60" height="60" rx="12" fill="#5BBC5B"/>
                            <path d="M15 30L25 40L45 20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="dashboard-logo-text">Privat24</span>
                    </div>
                </div>
                <div className="dashboard-header-right">
                    <div className="user-avatar" onClick={() => router.push('/settings')}>О</div>
                </div>
            </header>

            <nav className="dashboard-nav">
                <button className="nav-item" onClick={() => handleNavClick('dashboard')}>📊 Головна</button>
                <button className="nav-item" onClick={() => handleNavClick('cards')}>💳 Картки</button>
                <button className={`nav-item active`} onClick={() => handleNavClick('transactions')}>📋 Історія</button>
                <button className="nav-item" onClick={() => handleNavClick('transfer')}>💸 Переказ</button>
                <button className="nav-item" onClick={() => handleNavClick('settings')}>⚙️ Налаштування</button>
                <button className="nav-item" onClick={() => handleNavClick('support')}>🆘 Підтримка</button>
            </nav>

            <div className="dashboard-content">
                <div className="cards-page-header">
                    <div className="cards-page-title">📋 Історія транзакцій</div>
                    <div className="cards-page-subtitle">Всі ваші фінансові операції за останній місяць</div>
                </div>

                {/* Фільтри */}
                <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                    {[
                        { key: 'all', label: '📋 Всі' },
                        { key: 'income', label: '💰 Доходи' },
                        { key: 'payment', label: '💳 Платежі' },
                        { key: 'transfer', label: '💸 Перекази' },
                    ].map(f => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className="balance-action-btn"
                            style={{
                                background: filter === f.key ? '#5BBC5B' : 'rgba(255,255,255,0.08)',
                                color: '#fff',
                                border: filter === f.key ? 'none' : '1px solid rgba(255,255,255,0.15)',
                                width: 'auto',
                                margin: 0,
                            }}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Список транзакцій */}
                <div className="transactions-card">
                    {filteredTransactions.length > 0 ? filteredTransactions.map((t, i) => (
                        <div className="transaction-item" key={t._id || i}>
                            <div className="transaction-left">
                                <div className={`transaction-icon ${t.color || 'blue'}`}>{t.icon || '💳'}</div>
                                <div>
                                    <div className="transaction-name">{t.name}</div>
                                    <div className="transaction-date">{t.date}</div>
                                </div>
                            </div>
                            <div className={`transaction-amount ${t.signedAmount < 0 ? 'negative' : 'positive'}`}>
                                {t.signedAmount < 0 ? '-' : '+'}{t.amount}
                            </div>
                        </div>
                    )) : (
                        <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
                            Немає транзакцій за вибраним фільтром
                        </div>
                    )}
                </div>

                {/* Підсумок */}
                <div className="cards-grid" style={{ marginTop: 20 }}>
                    <div className="user-card">
                        <div className="user-card-header">
                            <div className="user-card-avatar" style={{ background: '#1a3a1a' }}>📊</div>
                            <div>
                                <div className="user-card-name">Доходи за місяць</div>
                                <div className="user-card-email" style={{ color: '#5BBC5B' }}>{data.incomeTotal}</div>
                            </div>
                        </div>
                    </div>
                    <div className="user-card">
                        <div className="user-card-header">
                            <div className="user-card-avatar" style={{ background: '#3a1a1a' }}>📊</div>
                            <div>
                                <div className="user-card-name">Витрати за місяць</div>
                                <div className="user-card-email" style={{ color: '#ff6b6b' }}>{data.expenseTotal}</div>
                            </div>
                        </div>
                    </div>
                    <div className="user-card">
                        <div className="user-card-header">
                            <div className="user-card-avatar" style={{ background: '#1a2a3a' }}>📊</div>
                            <div>
                                <div className="user-card-name">Всього операцій</div>
                                <div className="user-card-email">{data.count} транзакцій</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}