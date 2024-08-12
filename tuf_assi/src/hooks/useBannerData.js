import { useState, useEffect } from 'react';
import { fetchBannerData } from '../services/api';

const useBannerData = () => {
    const [bannerData, setBannerData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBannerData = async() => {
            try {
                const data = await fetchBannerData();
                setBannerData(data);
            } catch (error) {
                console.error('Error loading banner data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadBannerData();
    }, []);

    const updateBannerData = (newData) => {
        setBannerData(newData);
    };

    return { bannerData, loading, updateBannerData };
};

export default useBannerData;