"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function TransferPage() {
    const router = useRouter();
    const [activeNav, setActiveNav] = useState('transfer');
    const [form, setForm] = useState({ card: '', amount: '', name: '', purpose: '' });
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isSending, setIsSending] = useState(false);

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
        else if (page === 'transfer') return;
        else if (page === 'settings') router.push('/settings');
        else if (page === 'support') router.push('/support');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.card || !form.amount || !form.name) return;

        const cardDigits = form.card.replace(/\s/g, '');
        if (cardDigits.length !== 16) {
            setError('Номер картки повинен містити 16 цифр');
            return;
        }

        setIsSending(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/api/transfer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    cardNumber: cardDigits,
                    name: form.name,
                    amount: form.amount,
                    purpose: form.purpose
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Помилка переказу');
                setIsSending(false);
                return;
            }

            setShowSuccess(true);
            setIsSending(false);
            setTimeout(() => {
                setShowSuccess(false);
                setForm({ card: '', amount: '', name: '', purpose: '' });
                router.push('/transactions');
            }, 2000);
        } catch (e) {
            setError('Помилка з\'єднання з сервером');
            setIsSending(false);
        }
    };

    const formatCard = (value: string) => {
        const digits = value.replace(/\D/g, '');
        const groups = digits.match(/.{1,4}/g);
        return groups ? groups.join(' ') : digits;
    };

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
                <button className={`nav-item active`} onClick={() => handleNavClick('transfer')}>💸 Переказ</button>
                <button className="nav-item" onClick={() => handleNavClick('settings')}>⚙️ Налаштування</button>
                <button className="nav-item" onClick={() => handleNavClick('support')}>🆘 Підтримка</button>
            </nav>

            <div className="dashboard-content">
                <div className="cards-page-header">
                    <div className="cards-page-title">💸 Переказ коштів</div>
                    <div className="cards-page-subtitle">Миттєві перекази на картки будь-якого банку України</div>
                </div>

                <div className="cards-grid">
                    <div className="transfer-form">
                        <div className="transfer-form-title">Новий переказ</div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Номер картки отримувача</label>
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={19}
                                    value={form.card}
                                    onChange={e => setForm({ ...form, card: formatCard(e.target.value) })}
                                    required
                                />
                                <div className="form-hint">Введіть 16 цифр номера картки</div>
                            </div>

                            <div className="form-group">
                                <label>Ім'я отримувача</label>
                                <input
                                    type="text"
                                    placeholder="ПІБ отримувача"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Сума</label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        min="1"
                                        step="0.01"
                                        value={form.amount}
                                        onChange={e => setForm({ ...form, amount: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Валюта</label>
                                    <select defaultValue="UAH">
                                        <option value="UAH">UAH - гривня</option>
                                        <option value="USD">USD - долар</option>
                                        <option value="EUR">EUR - євро</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Призначення платежу</label>
                                <textarea
                                    placeholder="Вкажіть призначення переказу (необов'язково)"
                                    value={form.purpose}
                                    onChange={e => setForm({ ...form, purpose: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            {error && (
                                <div className="message error" style={{ marginBottom: 16 }}>{error}</div>
                            )}
                            <button type="submit" className="submit-btn" disabled={isSending}>
                                {isSending ? 'Відправка...' : '💸 Переказати'} {!isSending && form.amount ? `${form.amount} грн` : ''}
                            </button>
                        </form>
                    </div>

                    {/* Інформація */}
                    <div>
                        <div className="settings-section" style={{ marginBottom: 20 }}>
                            <div className="settings-section-title">💡 Інформація</div>
                            <div className="settings-row">
                                <span className="settings-row-label">Комісія</span>
                                <span className="settings-row-value" style={{ color: '#5BBC5B' }}>Безкоштовно</span>
                            </div>
                            <div className="settings-row">
                                <span className="settings-row-label">Ліміт на переказ</span>
                                <span className="settings-row-value">50 000 грн</span>
                            </div>
                            <div className="settings-row">
                                <span className="settings-row-label">Час зарахування</span>
                                <span className="settings-row-value" style={{ color: '#5BBC5B' }}>Миттєво</span>
                            </div>
                            <div className="settings-row">
                                <span className="settings-row-label">Доступно сьогодні</span>
                                <span className="settings-row-value">45 280 грн</span>
                            </div>
                        </div>

                        <div className="settings-section">
                            <div className="settings-section-title">📌 Швидкі перекази</div>
                            <div className="settings-row">
                                <span className="settings-row-label">Моя картка → Моя картка</span>
                                <button className="settings-row-action" onClick={() => setForm({ ...form, card: '5168 7422 3456 7890', name: 'Олександр Петренко' })}>
                                    Заповнити
                                </button>
                            </div>
                            <div className="settings-row">
                                <span className="settings-row-label">Моя картка → Mastercard Gold</span>
                                <button className="settings-row-action" onClick={() => setForm({ ...form, card: '5168 7422 9876 5432', name: 'Олександр Петренко' })}>
                                    Заповнити
                                </button>
                            </div>
                            <div className="settings-row">
                                <span className="settings-row-label">Моя картка → Visa Classic</span>
                                <button className="settings-row-action" onClick={() => setForm({ ...form, card: '5168 7422 1122 3344', name: 'Олександр Петренко' })}>
                                    Заповнити
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Сповіщення про успіх */}
            {showSuccess && (
                <div className="notification-toast" style={{ background: '#1a3a1a', border: '1px solid #5BBC5B' }}>
                    <div className="notification-content">
                        <img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" alt="Success" />
                        <span>Переказ на суму {form.amount} грн успішно виконано!</span>
                    </div>
                </div>
            )}
        </div>
    );
}
