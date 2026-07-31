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
