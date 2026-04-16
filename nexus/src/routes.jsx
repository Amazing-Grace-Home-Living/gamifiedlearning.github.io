import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Home   = lazy(() => import('./pages/Home.jsx'));
const Quest  = lazy(() => import('./pages/Quest.jsx'));
const Stars  = lazy(() => import('./pages/Stars.jsx'));

function Loading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--color-text-muted)' }}>
      Loading…
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/quest/:id"  element={<Quest />} />
        <Route path="/stars"      element={<Stars />} />
        <Route path="*"           element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
