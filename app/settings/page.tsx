"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SettingsPage() {
    const router = useRouter();
    const [activeNav, setActiveNav] = useState('settings');
    const [notifications, setNotifications] = useState(true);
    const [twoFactor, setTwoFactor] = useState(true);
    const [showNotification, setShowNotification] = useState(false);

    const handleNavClick = (page: string) => {
        setActiveNav(page);
        if (page === 'dashboard') router.push('/dashboard');
        else if (page === 'cards') router.push('/cards');
        else if (page === 'transactions') router.push('/transactions');
        else if (page === 'transfer') router.push('/transfer');
        else if (page === 'settings') return;
        else if (page === 'support') router.push('/support');
    };

    const notify = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

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
                <button className="nav-item" onClick={() => handleNavClick('transactions')}>📋 Історія</button>
                <button className="nav-item" onClick={() => handleNavClick('transfer')}>💸 Переказ</button>
                <button className={`nav-item active`} onClick={() => handleNavClick('settings')}>⚙️ Налаштування</button>
                <button className="nav-item" onClick={() => handleNavClick('support')}>🆘 Підтримка</button>
            </nav>

            <div className="dashboard-content">
                <div className="cards-page-header">
                    <div className="cards-page-title">⚙️ Налаштування</div>
                    <div className="cards-page-subtitle">Керуйте вашим обліковим записом та безпекою</div>
                </div>

                <div className="settings-page">
                    {/* Профіль */}
                    <div className="settings-section">
                        <div className="settings-section-title">👤 Мій профіль</div>
                        <div className="settings-row">
                            <span className="settings-row-label">Повне ім'я</span>
                            <span className="settings-row-value">Олександр Петренко</span>
                            <button className="settings-row-action" onClick={notify}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Email</span>
                            <span className="settings-row-value">oleksandr@example.com</span>
                            <button className="settings-row-action" onClick={notify}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Телефон</span>
                            <span className="settings-row-value">+380 50 123 45 67</span>
                            <button className="settings-row-action" onClick={notify}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Дата народження</span>
                            <span className="settings-row-value">15.03.1990</span>
                            <button className="settings-row-action" onClick={notify}>Змінити</button>
                        </div>
                    </div>

                    {/* Безпека */}
                    <div className="settings-section">
                        <div className="settings-section-title">🔒 Безпека</div>
                        <div className="settings-row">
                            <span className="settings-row-label">Пароль</span>
                            <span className="settings-row-value">••••••••</span>
                            <button className="settings-row-action" onClick={notify}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Двофакторна аутентифікація</span>
                            <label className="toggle">
                                <input type="checkbox" checked={twoFactor} onChange={() => { setTwoFactor(!twoFactor); notify(); }} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">PIN-код для входу</span>
                            <span className="settings-row-value" style={{ color: '#5BBC5B' }}>Активовано</span>
                            <button className="settings-row-action" onClick={notify}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Біометрія (Face ID / Touch ID)</span>
                            <label className="toggle">
                                <input type="checkbox" checked={true} onChange={notify} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Сповіщення */}
                    <div className="settings-section">
                        <div className="settings-section-title">🔔 Сповіщення</div>
                        <div className="settings-row">
                            <span className="settings-row-label">Push-сповіщення</span>
                            <label className="toggle">
                                <input type="checkbox" checked={notifications} onChange={() => { setNotifications(!notifications); notify(); }} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">SMS-інформування</span>
                            <label className="toggle">
                                <input type="checkbox" checked={true} onChange={notify} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Email-інформування</span>
                            <label className="toggle">
                                <input type="checkbox" checked={true} onChange={notify} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Сповіщення про операції</span>
                            <label className="toggle">
                                <input type="checkbox" checked={true} onChange={notify} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Ліміти */}
                    <div className="settings-section">
                        <div className="settings-section-title">💰 Ліміти</div>
                        <div className="settings-row">
                            <span className="settings-row-label">Денний ліміт переказів</span>
                            <span className="settings-row-value">50 000 грн</span>
                            <button className="settings-row-action" onClick={notify}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Разовий ліміт переказу</span>
                            <span className="settings-row-value">20 000 грн</span>
                            <button className="settings-row-action" onClick={notify}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Ліміт зняття готівки</span>
                            <span className="settings-row-value">30 000 грн/день</span>
                            <button className="settings-row-action" onClick={notify}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Ліміт онлайн-покупок</span>
                            <span className="settings-row-value">25 000 грн</span>
                            <button className="settings-row-action" onClick={notify}>Змінити</button>
                        </div>
                    </div>

                    {/* Дії */}
                    <div className="settings-section">
                        <div className="settings-section-title">⚡ Дії</div>
                        <div className="settings-row">
                            <span className="settings-row-label">Заблокувати всі картки</span>
                            <button className="settings-row-action" style={{ color: '#ff6b6b' }} onClick={notify}>Заблокувати</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Видалити акаунт</span>
                            <button className="settings-row-action" style={{ color: '#ff6b6b' }} onClick={notify}>Видалити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Експортувати виписку</span>
                            <button className="settings-row-action" onClick={notify}>Завантажити PDF</button>
                        </div>
                    </div>
                </div>
            </div>

            {showNotification && (
                <div className="notification-toast">
                    <div className="notification-content">
                        <img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" alt="Success" />
                        <span>Налаштування збережено!</span>
                    </div>
                </div>
            )}
        </>
    );
}