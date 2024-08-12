import React, { useEffect, useState } from 'react';

const Banner = ({ bannerData, countdown }) => {
  if (!bannerData || !bannerData.isVisible) return null;

  return (
    <div className="bg-blue-600 text-white p-4 animate-fade-in-down">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-sm md:text-base">{bannerData.description}</p>
        <div className="flex items-center space-x-4">
          <span className="font-bold text-lg">{countdown}</span>
          <a
            href={bannerData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-100 transition-colors duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
