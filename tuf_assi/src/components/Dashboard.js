import React, { useState, useEffect } from 'react';
import { updateBannerData } from '../services/api';

const Dashboard = ({ bannerData, onUpdate }) => {
  const [formData, setFormData] = useState({
    isVisible: false,
    description: '',
    link: '',
    timer: 1, // Default to 10 seconds
  });

  useEffect(() => {
    if (bannerData) {
      setFormData(bannerData);
    }
  }, [bannerData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBannerData(formData);
    onUpdate(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleChange}
              className="form-checkbox"
            />
            <span>Banner Visible</span>
          </label>
        </div>
        <div>
          <label className="block">
            <span>Description:</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              rows="3"
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span>Link:</span>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <div>
          <label className="block">
            <span>Timer (seconds):</span>
            <input
              type="number"
              name="timer"
              value={formData.timer}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Banner
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
