// src/components/Layout.js
import React from 'react';
import Banner from './Banner';

const Layout = ({ bannerData, children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {bannerData && <Banner bannerData={bannerData} />}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-100 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          {/* © 2024 Dynamic Website. All rights reserved. */}
        </div>
      </footer>
    </div>
  );
};

export default Layout;