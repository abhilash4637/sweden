'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to your Dashboard!</h1>
      <p>You are logged in 🎉</p>
    </div>
  );
}
