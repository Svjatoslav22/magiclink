"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CardsPage() {
    const router = useRouter();
    const [showNotification, setShowNotification] = useState(false);
    const [activeNav, setActiveNav] = useState('cards');

    const showCopyNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleNavClick = (page: string) => {
        setActiveNav(page);
        if (page === 'dashboard') router.push('/dashboard');
        else if (page === 'cards') return;
        else if (page === 'transactions') router.push('/transactions');
        else if (page === 'transfer') router.push('/transfer');
        else if (page === 'settings') router.push('/settings');
        else if (page === 'support') router.push('/support');
    };

    const cards = [
        { type: 'Visa Platinum', number: '5168 7422 3456 7890', holder: 'OLEKSANDR PETRENKO', expiry: '12/28', balance: '45,280.50', color: 'linear-gradient(135deg, #1a3a1a, #0d260d)' },
        { type: 'Mastercard Gold', number: '5168 7422 9876 5432', holder: 'OLEKSANDR PETRENKO', expiry: '09/27', balance: '12,500.00', color: 'linear-gradient(135deg, #3a2a1a, #261a0d)' },
        { type: 'Visa Classic', number: '5168 7422 1122 3344', holder: 'OLEKSANDR PETRENKO', expiry: '03/29', balance: '3,850.75', color: 'linear-gradient(135deg, #1a2a3a, #0d1a26)' },
    ];

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
                    <button className="header-icon" onClick={showCopyNotification}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2874/2874802.png" alt="Notifications" />
                        <span className="notification-badge">3</span>
                    </button>
                    <div className="user-avatar" onClick={() => router.push('/settings')}>О</div>
                </div>
            </header>

            <nav className="dashboard-nav">
                <button className="nav-item" onClick={() => handleNavClick('dashboard')}>📊 Головна</button>
                <button className={`nav-item active`} onClick={() => handleNavClick('cards')}>💳 Картки</button>
                <button className="nav-item" onClick={() => handleNavClick('transactions')}>📋 Історія</button>
                <button className="nav-item" onClick={() => handleNavClick('transfer')}>💸 Переказ</button>
                <button className="nav-item" onClick={() => handleNavClick('settings')}>⚙️ Налаштування</button>
                <button className="nav-item" onClick={() => handleNavClick('support')}>🆘 Підтримка</button>
            </nav>

            <div className="dashboard-content">
                <div className="cards-page-header">
                    <div className="cards-page-title">💳 Мої картки</div>
                    <div className="cards-page-subtitle">Керуйте вашими банківськими картками</div>
                </div>

                <div className="cards-grid">
                    {cards.map((card, i) => (
                        <div className="bank-card" key={i} style={{ background: card.color }}>
                            <div className="bank-card-type">{card.type}</div>
                            <div className="bank-card-balance">{card.balance} грн</div>
                            <div className="bank-card-number">{card.number}</div>
                            <div className="bank-card-footer">
                                <div>
                                    <div className="bank-card-holder">Власник</div>
                                    <div className="bank-card-holder-name">{card.holder}</div>
                                </div>
                                <div className="bank-card-expiry">
                                    <div className="bank-card-expiry-label">Діє до</div>
                                    <div className="bank-card-expiry-date">{card.expiry}</div>
                                </div>
                            </div>
                            <div className="bank-card-actions">
                                <button className="bank-card-action" onClick={showCopyNotification}>📋 Реквізити</button>
                                <button className="bank-card-action" onClick={() => router.push('/transfer')}>💸 Переказати</button>
                                <button className="bank-card-action" onClick={showCopyNotification}>🔒 Блокувати</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <button className="balance-action-btn primary" onClick={showCopyNotification} style={{ width: 'auto', display: 'inline-flex', margin: '0 auto' }}>
                        ➕ Замовити нову картку
                    </button>
                </div>
            </div>

            {showNotification && (
                <div className="notification-toast">
                    <div className="notification-content">
                        <img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" alt="Success" />
                        <span>Дію виконано успішно!</span>
                    </div>
                </div>
            )}
        </>
    );
}