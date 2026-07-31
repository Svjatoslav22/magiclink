"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://magiclink-server.onrender.com';

export default function CardsPage() {
    const router = useRouter();
    const [showNotification, setShowNotification] = useState(false);
    const [activeNav, setActiveNav] = useState('cards');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cards, setCards] = useState<Array<{
        _id: string;
        type: string;
        number: string;
        holder: string;
        expiry: string;
        balance: number;
        balanceFormatted: string;
        currency: string;
        color: string;
        isActive: boolean;
    }>>([]);

    const showCopyNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

    useEffect(() => {
        if (!userId) {
            router.push('/');
            return;
        }
        
        const loadCards = async () => {
            try {
                const res = await fetch(`${API_URL}/api/cards?userId=${userId}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(data.error || 'Помилка завантаження карток');
                    setLoading(false);
                    return;
                }
                setCards(data);
                setLoading(false);
            } catch (e) {
                setError('Помилка з\'єднання з сервером');
                setLoading(false);
            }
        };
        
        loadCards();
    }, [userId]);

    const handleNavClick = (page: string) => {
        setActiveNav(page);
        if (page === 'dashboard') router.push('/dashboard');
        else if (page === 'cards') return;
        else if (page === 'transactions') router.push('/transactions');
        else if (page === 'transfer') router.push('/transfer');
        else if (page === 'settings') router.push('/settings');
        else if (page === 'support') router.push('/support');
    };

    if (loading) {
        return (
            <div className="dashboard-wrapper">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 20 }}>
                    <div className="verify-spinner" style={{ width: 50, height: 50 }}></div>
                    <p style={{ color: '#888', fontSize: 16 }}>Завантаження карток...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-wrapper">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 20 }}>
                    <div style={{ color: '#ff6b6b', fontSize: 20, fontWeight: 700 }}>{error}</div>
                    <button className="btn-primary" style={{ maxWidth: 200, margin: 0 }} onClick={() => router.push('/')}>На головну</button>
                </div>
            </div>
        );
    }

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
                    {cards.length > 0 ? cards.map((card, i) => (
                        <div className="bank-card" key={card._id || i} style={{ background: card.color || 'linear-gradient(135deg, #1a3a1a, #0d260d)' }}>
                            <div className="bank-card-type">{card.type}</div>
                            <div className="bank-card-balance">{card.balanceFormatted || card.balance + ' грн'}</div>
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
                    )) : (
                        <div style={{ textAlign: 'center', padding: 60, color: '#888', gridColumn: '1 / -1' }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>💳</div>
                            <div style={{ fontSize: 18, fontWeight: 600 }}>У вас ще немає карток</div>
                            <div style={{ marginTop: 8, fontSize: 14 }}>Замовте свою першу картку</div>
                        </div>
                    )}
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
        </div>
    );
}