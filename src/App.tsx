import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectOverview } from './components/ProjectOverview';
import { LocationPremiums } from './components/LocationPremiums';
import { ComplexCommunity } from './components/ComplexCommunity';
import { UnitFloorplans } from './components/UnitFloorplans';
import { SalesSchedule } from './components/SalesSchedule';
import { NewsBoard } from './components/NewsBoard';
import { ReservationSection } from './components/ReservationSection';
import { Directions } from './components/Directions';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { BookingModal } from './components/modals/BookingModal';
import { PostDetailModal } from './components/modals/PostDetailModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { siteConfig } = useApp();

  const fontClass =
    siteConfig.fontStyle === 'serif' ? 'font-serif-luxury' : 'font-sans-modern';

  return (
    <div className={`min-h-screen bg-neutral-950 text-neutral-100 ${fontClass} pb-14 lg:pb-0`}>
      {/* Top Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <ProjectOverview />
        <LocationPremiums />
        <ComplexCommunity />
        <UnitFloorplans />
        <SalesSchedule />
        <NewsBoard />
        <ReservationSection />
        <Directions />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <MobileQuickBar />

      {/* Interactive Modals */}
      <BookingModal />
      <PostDetailModal />
      <AdminLoginModal />
      <AdminDashboard />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
