
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-dark-bg">
      <Sidebar />
      <main className="flex-1 ml-64 flex flex-col h-screen">
        <Header />
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-dark-bg">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
