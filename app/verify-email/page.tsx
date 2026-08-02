"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Логіка перевірки
function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const [message, setMessage] = useState("Перевірка токена...");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (token) {
            fetch(`${API_URL}/api/verify-token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            })
                .then(async res => {
                    const data = await res.json();

                    if (!res.ok) {
                        setMessage(data.error || "Помилка перевірки токена");
                        setIsSuccess(false);
                        return;
                    }

                    setMessage(data.message);
                    setIsSuccess(true);
                    
                    // Перенаправлення на головну після успішної верифікації
                    setTimeout(() => {
                        router.push('/');
                    }, 2000);
                })
                .catch(() => {
                    setMessage("Помилка зв'язку з сервером. Спробуйте пізніше.");
                    setIsSuccess(false);
                });
        }
    }, [token, router]);

    return (
        <div className={`verify-message ${isSuccess ? 'success' : 'loading'}`}>
            {isSuccess ? (
                <div className="verify-icon">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="30" fill="#5BBC5B"/>
                        <path d="M18 30L25 37L42 20" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            ) : (
                <div className="verify-spinner-container">
                    <div className="verify-spinner"></div>
                </div>
            )}
            <p>{message}</p>
        </div>
    );
}

// Основний компонент сторінки
export default function VerifyEmailPage() {
    return (
        <div className="verify-container">
            <div className="verify-card">
                <h1 className="verify-title">🛡️ Підтвердження пошти</h1>
                <Suspense fallback={<div className="verify-loading">Завантаження...</div>}>
                    <VerifyContent />
                </Suspense>
            </div>
        </div>
    );
}