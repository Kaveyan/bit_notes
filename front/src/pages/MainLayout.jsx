import React from 'react';
import Menu from '../components/Menu';  

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Menu />
        {children}
    </div>
  );
}
