"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function RequestVerification() {
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const createdAt = searchParams.get('createdAt');
    const t = useTranslations('verification');

    useEffect(() => {
        if (email && createdAt) {
            const expirationTime = new Date(createdAt).getTime() + 10 * 60 * 1000; // 10 minutes
            const fetchTimeRemaining = () => {
                const currentTime = new Date().getTime();
                const remainingTime = expirationTime - currentTime;
                if (remainingTime > 0) {
                    setTimeRemaining(remainingTime);
                } else {
                    setTimeRemaining(0);
                }
            };

            fetchTimeRemaining();
            const intervalId = setInterval(fetchTimeRemaining, 1000); // Update every second

            return () => clearInterval(intervalId);
        }
    }, [email, createdAt]);

    return (
        <div>
            <h1>{t('title')}</h1>
            {timeRemaining !== null ? (
                timeRemaining > 0 ? (
                    <p>{t('message', { minutes: Math.ceil(timeRemaining / (60 * 1000)) })}</p>
                ) : (
                    <p>{t('expired')}</p>
                )
            ) : (
                <p>{t('loading')}</p>
            )}
        </div>
    );
}
