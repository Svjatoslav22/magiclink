"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import './dashboard.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://magiclink-server.onrender.com';

export default function Dashboard() {
    const router = useRouter();
    const [showNotification, setShowNotification] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<'topup' | 'transfer' | 'cards'>('topup');
    const [activeNav, setActiveNav] = useState('dashboard');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dashboardData, setDashboardData] = useState<{
        totalBalance: string;
        totalBalanceRaw: number;
        cardsCount: number;
        transactions: Array<{
            _id: string;
            userId: string;
            name: string;
            date: string;
            amount: string;
            signedAmount: number;
            type: string;
            icon: string;
            color: string;
            category: string;
        }>;
        profile: {
            name: string;
            email: string;
            phone: string;
        } | null;
        exchangeRates: Array<{
            pair: string;
            rate: string;
            change: string;
            direction: string;
        }>;
    } | null>(null);

    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const userName = typeof window !== 'undefined' ? localStorage.getItem('userName') || 'Користувач' : 'Користувач';
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') || '' : '';

    // Якщо користувач не авторизований — перенаправляємо на логін
    useEffect(() => {
        if (!userId) {
            router.push('/');
            return;
        }
        
        const loadDashboard = async () => {
            try {
                const res = await fetch(`${API_URL}/api/dashboard?userId=${userId}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(data.error || 'Помилка завантаження даних');
                    setLoading(false);
                    return;
                }
                setDashboardData(data);
                setLoading(false);
            } catch (e) {
                setError('Помилка з\'єднання з сервером');
                setLoading(false);
            }
        };
        
        loadDashboard();
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        router.push('/');
    };

    const showCopyNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleNavClick = (page: string) => {
        setActiveNav(page);
        if (page === 'dashboard') return;
        if (page === 'cards') router.push('/cards');
        else if (page === 'transactions') router.push('/transactions');
        else if (page === 'transfer') router.push('/transfer');
        else if (page === 'settings') router.push('/settings');
        else if (page === 'support') router.push('/support');
    };

    const openModal = (type: 'topup' | 'transfer' | 'cards') => {
        setModalType(type);
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="dashboard-wrapper">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 20 }}>
                    <div className="verify-spinner" style={{ width: 50, height: 50 }}></div>
                    <p style={{ color: '#888', fontSize: 16 }}>Завантаження даних...</p>
                </div>
            </div>
        );
    }

    if (error || !dashboardData) {
        return (
            <div className="dashboard-wrapper">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 20 }}>
                    <div style={{ color: '#ff6b6b', fontSize: 20, fontWeight: 700 }}>{error || 'Помилка завантаження'}</div>
                    <button className="btn-primary" style={{ maxWidth: 200, margin: 0 }} onClick={handleLogout}>На головну</button>
                </div>
            </div>
        );
    }

    const transactions = dashboardData.transactions || [];
    const exchangeRates = dashboardData.exchangeRates || [];

    return(
        <div className="dashboard-wrapper">
            {/* Хедер */}
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
                    <button className="header-icon" onClick={() => showCopyNotification()}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2874/2874802.png" alt="Notifications" />
                        <span className="notification-badge">3</span>
                    </button>
                    <div className="user-avatar" onClick={() => router.push('/settings')}>
                        {userName.charAt(0).toUpperCase()}
                    </div>
                </div>
            </header>

            {/* Навігація */}
            <nav className="dashboard-nav">
                <button className={`nav-item ${activeNav === 'dashboard' ? 'active' : ''}`} onClick={() => handleNavClick('dashboard')}>
                    📊 Головна
                </button>
                <button className={`nav-item ${activeNav === 'cards' ? 'active' : ''}`} onClick={() => handleNavClick('cards')}>
                    💳 Картки
                </button>
                <button className={`nav-item ${activeNav === 'transactions' ? 'active' : ''}`} onClick={() => handleNavClick('transactions')}>
                    📋 Історія
                </button>
                <button className={`nav-item ${activeNav === 'transfer' ? 'active' : ''}`} onClick={() => handleNavClick('transfer')}>
                    💸 Переказ
                </button>
                <button className={`nav-item ${activeNav === 'settings' ? 'active' : ''}`} onClick={() => handleNavClick('settings')}>
                    ⚙️ Налаштування
                </button>
                <button className={`nav-item ${activeNav === 'support' ? 'active' : ''}`} onClick={() => handleNavClick('support')}>
                    🆘 Підтримка
                </button>
            </nav>

            <div className="dashboard-content">
                {/* Баланс */}
                <div className="balance-card">
                    <div className="balance-label">Загальний баланс</div>
                    <div className="balance-amount">
                        {dashboardData.totalBalance || '0.00 грн'}
                    </div>
                    <div className="balance-change">+2,340.00 грн за цей місяць</div>
                    <div className="balance-actions">
                        <button className="balance-action-btn primary" onClick={() => openModal('topup')}>
                            💰 Поповнити
                        </button>
                        <button className="balance-action-btn secondary" onClick={() => openModal('transfer')}>
                            💸 Переказати
                        </button>
                        <button className="balance-action-btn secondary" onClick={() => openModal('cards')}>
                            💳 Мої картки
                        </button>
                    </div>
                </div>

                {/* Курс валют */}
                <div className="exchange-card">
                    {exchangeRates.map((rate, i) => (
                        <div className="exchange-item" key={i}>
                            <div className="exchange-flag">
                                {rate.pair.startsWith('USD') ? '🇺🇸' : rate.pair.startsWith('EUR') ? '🇪🇺' : '🇵🇱'}
                            </div>
                            <div className="exchange-pair">{rate.pair}</div>
                            <div className="exchange-rate">{rate.rate}</div>
                            <div className={`exchange-change ${rate.direction}`}>
                                {rate.direction === 'up' ? '▲' : '▼'} {rate.change}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Інформація про користувача */}
                <div className="cards-grid">
                    <div className="user-card">
                        <div className="user-card-header">
                            <div className="user-card-avatar">{userName.charAt(0).toUpperCase()}</div>
                            <div>
                                <div className="user-card-name">{userName}</div>
                                <div className="user-card-email">{userEmail}</div>
                            </div>
                        </div>
                        <div className="user-card-stats">
                            <div className="stat-item">
                                <div className="stat-label">Рахунків</div>
                                <div className="stat-value">{dashboardData.cardsCount || 0}</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-label">Кредитний ліміт</div>
                                <div className="stat-value green">50,000 грн</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-label">Кешбек</div>
                                <div className="stat-value green">1.5%</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-label">Бонусів</div>
                                <div className="stat-value">1,250</div>
                            </div>
                        </div>
                    </div>

                    {/* Останні транзакції */}
                    <div className="transactions-card" style={{ gridColumn: 'span 1' }}>
                        <div className="transactions-header">
                            <div className="transactions-title">Останні транзакції</div>
                            <button className="transactions-view-all" onClick={() => router.push('/transactions')}>
                                Всі →
                            </button>
                        </div>
                        {transactions.length > 0 ? transactions.map((t, i) => (
                            <div className="transaction-item" key={i}>
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
                            <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>Транзакцій поки немає</div>
                        )}
                    </div>
                </div>

                {/* Секція допомоги */}
                <div className="help-section">
                    <h2 className="help-title">
                        <img src="https://cdn-icons-png.flaticon.com/512/3565/3565587.png" alt="Ukraine" className="help-title-icon" />
                        Потрібна допомога
                    </h2>
                    <p className="help-subtitle">Ви можете підтримати наші ініціативи переказом на картку ПриватБанку</p>
                    
                    <div className="help-cards">
                        <div className="help-card">
                            <div className="help-card-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/2913/2913133.png" alt="Медична допомога" />
                            </div>
                            <h3>Медична допомога</h3>
                            <p className="help-description">Збір коштів на медичне обладнання та ліки для постраждалих</p>
                            <div className="help-stats">
                                <div className="help-progress">
                                    <div className="help-progress-bar" style={{ width: '65%' }}></div>
                                </div>
                                <div className="help-amounts">
                                    <span className="help-collected">325,000 грн</span>
                                    <span className="help-goal">500,000 грн</span>
                                </div>
                            </div>
                            <div className="card-number-section">
                                <label>Номер картки ПриватБанк:</label>
                                <div className="card-number">
                                    <span>5168 7422 3456 7890</span>
                                    <button 
                                        className="copy-btn"
                                        onClick={() => {
                                            navigator.clipboard.writeText('5168742234567890');
                                            showCopyNotification();
                                        }}
                                    >
                                        <img src="https://cdn-icons-png.flaticon.com/512/2874/2874802.png" alt="Copy" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="help-card help-card-featured">
                            <div className="featured-badge">
                                <img src="https://cdn-icons-png.flaticon.com/512/785/785116.png" alt="Urgent" />
                                Терміново
                            </div>
                            <div className="help-card-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png" alt="Гуманітарна допомога" />
                            </div>
                            <h3>Гуманітарна допомога</h3>
                            <p className="help-description">Збір на продукти харчування та предмети першої необхідності</p>
                            <div className="help-stats">
                                <div className="help-progress">
                                    <div className="help-progress-bar" style={{ width: '42%' }}></div>
                                </div>
                                <div className="help-amounts">
                                    <span className="help-collected">126,000 грн</span>
                                    <span className="help-goal">300,000 грн</span>
                                </div>
                            </div>
                            <div className="card-number-section">
                                <label>Номер картки ПриватБанк:</label>
                                <div className="card-number">
                                    <span>5168 7422 9876 5432</span>
                                    <button 
                                        className="copy-btn"
                                        onClick={() => {
                                            navigator.clipboard.writeText('5168742298765432');
                                            showCopyNotification();
                                        }}
                                    >
                                        <img src="https://cdn-icons-png.flaticon.com/512/2874/2874802.png" alt="Copy" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="help-card">
                            <div className="help-card-icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/1670/1670062.png" alt="Підтримка захисників" />
                            </div>
                            <h3>Підтримка захисників</h3>
                            <p className="help-description">Збір на екіпірування та засоби захисту для військових</p>
                            <div className="help-stats">
                                <div className="help-progress">
                                    <div className="help-progress-bar" style={{ width: '88%' }}></div>
                                </div>
                                <div className="help-amounts">
                                    <span className="help-collected">880,000 грн</span>
                                    <span className="help-goal">1,000,000 грн</span>
                                </div>
                            </div>
                            <div className="card-number-section">
                                <label>Номер картки ПриватБанк:</label>
                                <div className="card-number">
                                    <span>5168 7422 1122 3344</span>
                                    <button 
                                        className="copy-btn"
                                        onClick={() => {
                                            navigator.clipboard.writeText('5168742211223344');
                                            showCopyNotification();
                                        }}
                                    >
                                        <img src="https://cdn-icons-png.flaticon.com/512/2874/2874802.png" alt="Copy" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Кнопка виходу */}
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <button className="btn-secondary" onClick={handleLogout} style={{ maxWidth: 300, margin: '0 auto' }}>
                        🔒 Вийти з системи
                    </button>
                </div>
            </div>

            {/* Сповіщення */}
            {showNotification && (
                <div className="notification-toast">
                    <div className="notification-content">
                        <img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" alt="Success" />
                        <span>Номер картки скопійовано!</span>
                    </div>
                </div>
            )}

            {/* Модальне вікно */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-title">
                            {modalType === 'topup' ? '💰 Поповнення рахунку' : 
                             modalType === 'transfer' ? '💸 Переказ коштів' : '💳 Мої картки'}
                        </div>
                        <div className="modal-text">
                            {modalType === 'topup' ? 
                                'Оберіть спосіб поповнення: з іншої картки, готівкою через термінал або переказом з іншого банку.' :
                             modalType === 'transfer' ?
                                'Для переказу коштів перейдіть на сторінку переказів або скористайтесь формою швидкого переказу.' :
                                'У вас є ' + (dashboardData.cardsCount || 0) + ' активні картки. Перейдіть на сторінку карток для перегляду детальної інформації.'}
                        </div>
                        <div className="modal-actions">
                            <button className="btn-primary" onClick={() => {
                                setShowModal(false);
                                if (modalType === 'transfer') router.push('/transfer');
                                else if (modalType === 'cards') router.push('/cards');
                            }}>
                                {modalType === 'topup' ? 'Поповнити' : 'Перейти'}
                            </button>
                            <button className="btn-secondary" onClick={() => setShowModal(false)}>
                                Скасувати
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}