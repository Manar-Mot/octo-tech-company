"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type ErrorPageProps = {
  error?: Error & { statusCode?: number };
  reset?: () => void;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  const router = useRouter();
  const statusCode = error?.statusCode || 500;
  const title = error?.message || 'An unexpected error has occurred';

  useEffect(() => {
    console.error(`Error ${statusCode}: ${title}`);
  }, [statusCode, title]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{statusCode}</h1>
      <p>{title}</p>
      <button onClick={() => router.push('/')}>Go back home</button>
      {reset && <button onClick={reset}>Try again</button>}
    </div>
  );
};

export default ErrorPage;
