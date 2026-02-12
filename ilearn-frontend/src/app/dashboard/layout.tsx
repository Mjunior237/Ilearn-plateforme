'use client';

import DashboardHeader from '../../components/DashboardHeader';
import Footer from '../../components/Footer';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
