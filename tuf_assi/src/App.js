// src/App.js
import React from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import useBannerData from './hooks/useBannerData';

function App() {
  const { bannerData, loading, updateBannerData } = useBannerData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Layout bannerData={bannerData}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Welcome</h1>
        <p className="text-xl mb-8"></p>
        <Dashboard bannerData={bannerData} onUpdate={updateBannerData} />
      </div>
    </Layout>
  );
}

export default App;