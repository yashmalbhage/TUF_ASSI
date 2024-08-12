import { useState, useEffect } from 'react';
import { fetchBannerData } from '../services/api';

const useBannerData = () => {
    const [bannerData, setBannerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            const data = await fetchBannerData();
            setBannerData(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (bannerData && bannerData.isVisible) {
            let timer = bannerData.timer;
            setCountdown(timer);

            const interval = setInterval(() => {
                timer -= 1;
                setCountdown(timer);
                if (timer <= 0) {
                    clearInterval(interval);
                    setBannerData((prev) => ({...prev, isVisible: false }));
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [bannerData]);

    const updateBannerData = (newData) => {
        setBannerData(newData);
    };

    return { bannerData, loading, countdown, updateBannerData };
};

export default useBannerData;