import React from 'react';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';
import { useMediaQuery } from 'react-responsive';

export default function MainLayout({auth}) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


  return (
    <>
      {isMobile ? <MobileLayout auth={auth} /> : <DesktopLayout auth={auth} />}
    </>
  );
}
