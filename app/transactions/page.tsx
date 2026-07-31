"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TransactionsPage() {
    const router = useRouter();
    const [activeNav, setActiveNav] = useState('transactions');
    const [filter, setFilter] = useState('all');

    const handleNavClick = (page: string) => {
        setActiveNav(page);
        if (page === 'dashboard') router.push('/dashboard');
        else if (page === 'cards') router.push('/cards');
        else if (page === 'transactions') return;
        else if (page === 'transfer') router.push('/transfer');
        else if (page === 'settings') router.push('/settings');
        else if (page === 'support') router.push('/support');
    };

    const allTransactions = [
        { name: 'Переказ на картку', date: '31 лип, 14:32', amount: '-2,500.00 грн', type: 'negative', icon: '💳', color: 'red', category: 'transfer' },
        { name: 'Поповнення рахунку', date: '31 лип, 11:15', amount: '+15,000.00 грн', type: 'positive', icon: '💰', color: 'green', category: 'income' },
        { name: 'Оплата комунальних', date: '30 лип, 09:45', amount: '-3,200.00 грн', type: 'negative', icon: '🏠', color: 'orange', category: 'payment' },
        { name: 'Переказ від друга', date: '27 лип, 18:20', amount: '+1,000.00 грн', type: 'positive', icon: '👤', color: 'blue', category: 'income' },
        { name: 'Покупка в магазині', date: '26 лип, 16:10', amount: '-567.50 грн', type: 'negative', icon: '🛒', color: 'purple', category: 'payment' },
        { name: 'Інтернет-магазин', date: '25 лип, 12:30', amount: '-1,299.00 грн', type: 'negative', icon: '📦', color: 'red', category: 'payment' },
        { name: 'Поповнення мобільного', date: '24 лип, 08:00', amount: '-150.00 грн', type: 'negative', icon: '📱', color: 'orange', category: 'payment' },
        { name: 'Переказ на картку', date: '22 лип, 20:15', amount: '-500.00 грн', type: 'negative', icon: '💳', color: 'red', category: 'transfer' },
        { name: 'Кешбек за липень', date: '21 лип, 10:00', amount: '+234.50 грн', type: 'positive', icon: '🎁', color: 'green', category: 'income' },
        { name: 'Оренда житла', date: '20 лип, 09:00', amount: '-8,000.00 грн', type: 'negative', icon: '🏢', color: 'purple', category: 'payment' },
        { name: 'Зарплата', date: '15 лип, 09:00', amount: '+35,000.00 грн', type: 'positive', icon: '💼', color: 'green', category: 'income' },
        { name: 'Ресторан', date: '14 лип, 20:30', amount: '-890.00 грн', type: 'negative', icon: '🍽️', color: 'orange', category: 'payment' },
    ];

    const filteredTransactions = filter === 'all' 
        ? allTransactions 
        : allTransactions.filter(t => t.category === filter);

    return (
        <>
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
                    {filteredTransactions.map((t, i) => (
                        <div className="transaction-item" key={i}>
                            <div className="transaction-left">
                                <div className={`transaction-icon ${t.color}`}>{t.icon}</div>
                                <div>
                                    <div className="transaction-name">{t.name}</div>
                                    <div className="transaction-date">{t.date}</div>
                                </div>
                            </div>
                            <div className={`transaction-amount ${t.type}`}>{t.amount}</div>
                        </div>
                    ))}
                    {filteredTransactions.length === 0 && (
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
                                <div className="user-card-email">+51,234.50 грн</div>
                            </div>
                        </div>
                    </div>
                    <div className="user-card">
                        <div className="user-card-header">
                            <div className="user-card-avatar" style={{ background: '#3a1a1a' }}>📊</div>
                            <div>
                                <div className="user-card-name">Витрати за місяць</div>
                                <div className="user-card-email" style={{ color: '#ff6b6b' }}>-17,606.50 грн</div>
                            </div>
                        </div>
                    </div>
                    <div className="user-card">
                        <div className="user-card-header">
                            <div className="user-card-avatar" style={{ background: '#1a2a3a' }}>📊</div>
                            <div>
                                <div className="user-card-name">Всього операцій</div>
                                <div className="user-card-email">{filteredTransactions.length} транзакцій</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}