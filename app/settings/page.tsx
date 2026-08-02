"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function SettingsPage() {
    const router = useRouter();
    const [activeNav, setActiveNav] = useState('settings');
    const [showNotification, setShowNotification] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [settings, setSettings] = useState<{
        profile: { name: string; email: string; phone: string; birthDate: string };
        security: { twoFactor: boolean; pinActive: boolean; biometrics: boolean };
        notifications: { push: boolean; sms: boolean; email: boolean; operations: boolean };
        limits: { dailyTransfer: number; singleTransfer: number; cashWithdrawal: number; onlinePurchase: number };
    } | null>(null);

    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

    useEffect(() => {
        if (!userId) {
            router.push('/');
            return;
        }
        
        const loadSettings = async () => {
            try {
                const res = await fetch(`${API_URL}/api/settings?userId=${userId}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(data.error || 'Помилка завантаження налаштувань');
                    setLoading(false);
                    return;
                }
                setSettings(data);
                setLoading(false);
            } catch (e) {
                setError('Помилка з\'єднання з сервером');
                setLoading(false);
            }
        };
        
        loadSettings();
    }, [userId]);

    type SettingsUpdates = Partial<{
        profile: typeof settings extends null ? never : NonNullable<typeof settings>['profile'];
        security: typeof settings extends null ? never : NonNullable<typeof settings>['security'];
        notifications: typeof settings extends null ? never : NonNullable<typeof settings>['notifications'];
        limits: typeof settings extends null ? never : NonNullable<typeof settings>['limits'];
    }>;

    const saveSettings = async (updates: SettingsUpdates) => {
        try {
            const res = await fetch(`${API_URL}/api/settings`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, ...updates }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Помилка збереження');
                return;
            }
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        } catch (e) {
            setError('Помилка з\'єднання з сервером');
        }
    };

    const handleNavClick = (page: string) => {
        setActiveNav(page);
        if (page === 'dashboard') router.push('/dashboard');
        else if (page === 'cards') router.push('/cards');
        else if (page === 'transactions') router.push('/transactions');
        else if (page === 'transfer') router.push('/transfer');
        else if (page === 'settings') return;
        else if (page === 'support') router.push('/support');
    };

    if (loading) {
        return (
            <div className="dashboard-wrapper">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 20 }}>
                    <div className="verify-spinner" style={{ width: 50, height: 50 }}></div>
                    <p style={{ color: '#888', fontSize: 16 }}>Завантаження налаштувань...</p>
                </div>
            </div>
        );
    }

    if (error || !settings) {
        return (
            <div className="dashboard-wrapper">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', flexDirection: 'column', gap: 20 }}>
                    <div style={{ color: '#ff6b6b', fontSize: 20, fontWeight: 700 }}>{error || 'Помилка завантаження'}</div>
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
                            <span className="settings-row-value">{settings.profile.name}</span>
                            <button className="settings-row-action" onClick={() => saveSettings({ profile: { ...settings.profile, name: window.prompt("Нове ім'я:", settings.profile.name) || settings.profile.name } })}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Email</span>
                            <span className="settings-row-value">{settings.profile.email}</span>
                            <button className="settings-row-action" onClick={() => saveSettings({ profile: { ...settings.profile, email: prompt('Новий email:', settings.profile.email) || settings.profile.email } })}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Телефон</span>
                            <span className="settings-row-value">{settings.profile.phone}</span>
                            <button className="settings-row-action" onClick={() => saveSettings({ profile: { ...settings.profile, phone: prompt('Новий телефон:', settings.profile.phone) || settings.profile.phone } })}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Дата народження</span>
                            <span className="settings-row-value">{settings.profile.birthDate}</span>
                            <button className="settings-row-action" onClick={() => saveSettings({ profile: { ...settings.profile, birthDate: prompt('Нова дата:', settings.profile.birthDate) || settings.profile.birthDate } })}>Змінити</button>
                        </div>
                    </div>

                    {/* Безпека */}
                    <div className="settings-section">
                        <div className="settings-section-title">🔒 Безпека</div>
                        <div className="settings-row">
                            <span className="settings-row-label">Пароль</span>
                            <span className="settings-row-value">••••••••</span>
                            <button className="settings-row-action" onClick={() => saveSettings({})}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Двофакторна аутентифікація</span>
                            <label className="toggle">
                                <input type="checkbox" checked={settings.security.twoFactor} onChange={() => saveSettings({ security: { ...settings.security, twoFactor: !settings.security.twoFactor } })} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">PIN-код для входу</span>
                            <span className="settings-row-value" style={{ color: settings.security.pinActive ? '#5BBC5B' : '#888' }}>
                                {settings.security.pinActive ? 'Активовано' : 'Не активовано'}
                            </span>
                            <button className="settings-row-action" onClick={() => saveSettings({ security: { ...settings.security, pinActive: !settings.security.pinActive } })}>
                                {settings.security.pinActive ? 'Вимкнути' : 'Активувати'}
                            </button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Біометрія (Face ID / Touch ID)</span>
                            <label className="toggle">
                                <input type="checkbox" checked={settings.security.biometrics} onChange={() => saveSettings({ security: { ...settings.security, biometrics: !settings.security.biometrics } })} />
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
                                <input type="checkbox" checked={settings.notifications.push} onChange={() => saveSettings({ notifications: { ...settings.notifications, push: !settings.notifications.push } })} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">SMS-інформування</span>
                            <label className="toggle">
                                <input type="checkbox" checked={settings.notifications.sms} onChange={() => saveSettings({ notifications: { ...settings.notifications, sms: !settings.notifications.sms } })} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Email-інформування</span>
                            <label className="toggle">
                                <input type="checkbox" checked={settings.notifications.email} onChange={() => saveSettings({ notifications: { ...settings.notifications, email: !settings.notifications.email } })} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Сповіщення про операції</span>
                            <label className="toggle">
                                <input type="checkbox" checked={settings.notifications.operations} onChange={() => saveSettings({ notifications: { ...settings.notifications, operations: !settings.notifications.operations } })} />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    {/* Ліміти */}
                    <div className="settings-section">
                        <div className="settings-section-title">💰 Ліміти</div>
                        <div className="settings-row">
                            <span className="settings-row-label">Денний ліміт переказів</span>
                            <span className="settings-row-value">{settings.limits.dailyTransfer.toLocaleString('uk-UA')} грн</span>
                            <button className="settings-row-action" onClick={() => saveSettings({ limits: { ...settings.limits, dailyTransfer: parseInt(prompt('Новий ліміт:', String(settings.limits.dailyTransfer)) || String(settings.limits.dailyTransfer)) } })}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Разовий ліміт переказу</span>
                            <span className="settings-row-value">{settings.limits.singleTransfer.toLocaleString('uk-UA')} грн</span>
                            <button className="settings-row-action" onClick={() => saveSettings({ limits: { ...settings.limits, singleTransfer: parseInt(prompt('Новий ліміт:', String(settings.limits.singleTransfer)) || String(settings.limits.singleTransfer)) } })}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Ліміт зняття готівки</span>
                            <span className="settings-row-value">{settings.limits.cashWithdrawal.toLocaleString('uk-UA')} грн/день</span>
                            <button className="settings-row-action" onClick={() => saveSettings({ limits: { ...settings.limits, cashWithdrawal: parseInt(prompt('Новий ліміт:', String(settings.limits.cashWithdrawal)) || String(settings.limits.cashWithdrawal)) } })}>Змінити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Ліміт онлайн-покупок</span>
                            <span className="settings-row-value">{settings.limits.onlinePurchase.toLocaleString('uk-UA')} грн</span>
                            <button className="settings-row-action" onClick={() => saveSettings({ limits: { ...settings.limits, onlinePurchase: parseInt(prompt('Новий ліміт:', String(settings.limits.onlinePurchase)) || String(settings.limits.onlinePurchase)) } })}>Змінити</button>
                        </div>
                    </div>

                    {/* Дії */}
                    <div className="settings-section">
                        <div className="settings-section-title">⚡ Дії</div>
                        <div className="settings-row">
                            <span className="settings-row-label">Заблокувати всі картки</span>
                            <button className="settings-row-action" style={{ color: '#ff6b6b' }} onClick={() => saveSettings({})}>Заблокувати</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Видалити акаунт</span>
                            <button className="settings-row-action" style={{ color: '#ff6b6b' }} onClick={() => saveSettings({})}>Видалити</button>
                        </div>
                        <div className="settings-row">
                            <span className="settings-row-label">Експортувати виписку</span>
                            <button className="settings-row-action" onClick={() => saveSettings({})}>Завантажити PDF</button>
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
        </div>
    );
}