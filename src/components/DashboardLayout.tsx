import Nav from './Nav';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-4 pt-8 pb-4 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Album Comparison</h1>
        <Nav />
      </header>
      <main className="max-w-3xl mx-auto px-4 py-6 bg-white rounded shadow-sm">
        {children}
      </main>
    </div>
  );
}
