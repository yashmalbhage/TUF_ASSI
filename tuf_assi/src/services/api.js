import axios from 'axios';

const API_URL = 'https://tuf-assi-qb2w.vercel.app/api';

export const fetchBannerData = async() => {
    const response = await axios.get(`${API_URL}/banner`);
    return response.data;
};

export const updateBannerData = async(data) => {
    const response = await axios.post(`${API_URL}/banner`, data);
    return response.data;
};