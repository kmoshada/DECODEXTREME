import React from 'react';
import Footer from '../components/Footer';
import ServicesSection from '../components/ServicesSection';
import TimelineSection from '../components/TimelineSection';

const Services = ({ onOpenRegister }) => {
  return (
    <div className="relative min-h-screen w-full bg-transparent text-white pt-24">
      <ServicesSection onOpenRegister={onOpenRegister} />
      <TimelineSection onOpenRegister={onOpenRegister} />
      <Footer onOpenRegister={onOpenRegister} />
    </div>
  );
};

export default Services;
