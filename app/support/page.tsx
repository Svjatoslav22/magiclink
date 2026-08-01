"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SupportPage() {
    const router = useRouter();
    const [activeNav, setActiveNav] = useState('support');
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState('');

    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

    useEffect(() => {
        if (!userId) {
            router.push('/');
        }
    }, [userId]);

    const handleNavClick = (page: string) => {
        setActiveNav(page);
        if (page === 'dashboard') router.push('/dashboard');
        else if (page === 'cards') router.push('/cards');
        else if (page === 'transactions') router.push('/transactions');
        else if (page === 'transfer') router.push('/transfer');
        else if (page === 'settings') router.push('/settings');
        else if (page === 'support') return;
    };

    const notify = () => {
        setShowNotification(true);
        setMessage('');
        setTimeout(() => setShowNotification(false), 3000);
    };

    const supportOptions = [
        { icon: '📞', title: 'Гаряча лінія', desc: 'Цілодобова підтримка клієнтів' },
        { icon: '💬', title: 'Чат онлайн', desc: 'Напишіть нам у чат, відповімо за хвилину' },
        { icon: '📧', title: 'Email', desc: 'Надішліть лист на support@privatbank.ua' },
        { icon: '📍', title: 'Відділення', desc: 'Знайти найближче відділення банку' },
        { icon: '🤖', title: 'Чат-бот', desc: 'Допомога у Telegram та Viber' },
        { icon: '📱', title: 'Мобільний додаток', desc: 'Завантажте Privat24' },
    ];

    const faq = [
        { q: 'Як відновити доступ до акаунту?', a: 'Натисніть "Відновити пароль" на сторінці входу. Ми надішлемо інструкцію на вашу електронну пошту.' },
        { q: 'Як заблокувати картку?', a: 'Перейдіть в розділ "Картки" та оберіть опцію блокування. Також можете зателефонувати на гарячу лінію.' },
        { q: 'Який ліміт на перекази?', a: 'Денний ліміт складає 50 000 грн. Змінити ліміти можна в налаштуваннях.' },
        { q: 'Скільки часу займає переказ?', a: 'Миттєві перекази між картками ПриватБанку. Міжбанківські перекази - до 1 робочого дня.' },
        { q: 'Як змінити персональні дані?', a: 'Перейдіть в "Налаштування" та оберіть "Мій профіль" для редагування даних.' },
    ];

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
                <button className="nav-item" onClick={() => handleNavClick('settings')}>⚙️ Налаштування</button>
                <button className={`nav-item active`} onClick={() => handleNavClick('support')}>🆘 Підтримка</button>
            </nav>

            <div className="dashboard-content">
                <div className="cards-page-header">
                    <div className="cards-page-title">🆘 Підтримка</div>
                    <div className="cards-page-subtitle">Ми завжди поруч, щоб допомогти вам</div>
                </div>

                <div className="support-page">
                    {/* Канали підтримки */}
                    <div className="support-grid">
                        {supportOptions.map((opt, i) => (
                            <div className="support-card" key={i} onClick={notify}>
                                <div className="support-card-icon">{opt.icon}</div>
                                <div className="support-card-title">{opt.title}</div>
                                <div className="support-card-desc">{opt.desc}</div>
                            </div>
                        ))}
                    </div>

                    {/* FAQ */}
                    <div className="settings-section">
                        <div className="settings-section-title">❓ Поширені запитання</div>
                        {faq.map((item, i) => (
                            <details key={i} style={{ borderBottom: i < faq.length - 1 ? '1px solid #2d2d2d' : 'none', padding: '12px 0' }}>
                                <summary style={{ cursor: 'pointer', color: '#fff', fontWeight: 600, fontSize: 14, outline: 'none' }}>
                                    {item.q}
                                </summary>
                                <p style={{ color: '#888', marginTop: 8, fontSize: 13, lineHeight: 1.5, paddingLeft: 20 }}>
                                    {item.a}
                                </p>
                            </details>
                        ))}
                    </div>

                    {/* Форма звернення */}
                    <div className="settings-section">
                        <div className="settings-section-title">✉️ Написати нам</div>
                        <div className="form-group">
                            <label>Тема звернення</label>
                            <select defaultValue="">
                                <option value="" disabled>Оберіть тему</option>
                                <option value="tech">Технічна проблема</option>
                                <option value="card">Проблема з карткою</option>
                                <option value="transfer">Проблема з переказом</option>
                                <option value="other">Інше</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Ваше повідомлення</label>
                            <textarea
                                placeholder="Опишіть вашу проблему якомога детальніше..."
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                rows={5}
                            />
                        </div>
                        <button className="submit-btn" onClick={notify} disabled={!message}>
                            📨 Відправити
                        </button>
                    </div>
                </div>
            </div>

            {showNotification && (
                <div className="notification-toast">
                    <div className="notification-content">
                        <img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" alt="Success" />
                        <span>Дякуємо! Ваше звернення прийнято.</span>
                    </div>
                </div>
            )}
        </div>
    );
}
