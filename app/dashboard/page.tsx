'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './dashboard.css';

export default function Dashboard() {
    const router = useRouter();
    const [showNotification, setShowNotification] = useState(false);

    const handleLogout = () => {
        router.push('/');
    };

    const showCopyNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    return(
        <div className="dashboard-container">
            {/* Кастомне сповіщення */}
            {showNotification && (
                <div className="notification-toast">
                    <div className="notification-content">
                        <img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" alt="Success" className="notification-icon" />
                        <span>Номер картки скопійовано!</span>
                    </div>
                </div>
            )}

            <div className="dashboard-card">
                <div className="dashboard-icon">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                        <circle cx="40" cy="40" r="40" fill="#5BBC5B" opacity="0.1"/>
                        <circle cx="40" cy="40" r="30" fill="#5BBC5B"/>
                        <path d="M28 40L35 47L52 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                
                <h1 className="dashboard-title">
                    Вітаємо!
                </h1>
                
                <p className="dashboard-text">
                    Ви успішно увійшли в систему
                </p>
                
                <div className="dashboard-info">
                    <div className="info-item">
                        <span className="info-icon">
                            <img src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png" alt="Verified" />
                        </span>
                        <span className="info-text">Ваш акаунт підтверджено і активний</span>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">
                            <img src="https://cdn-icons-png.flaticon.com/512/2913/2913133.png" alt="Security" />
                        </span>
                        <span className="info-text">Захищено системою безпеки</span>
                    </div>
                </div>

                <button className="btn-logout" onClick={handleLogout}>
                    Вийти з системи
                </button>
            </div>

            {/* Секція з картками допомоги */}
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
        </div>
    )
}