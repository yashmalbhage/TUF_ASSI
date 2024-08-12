import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchBannerData = async() => {
    const response = await axios.get(`${API_URL}/banner`);
    return response.data;
};

export const updateBannerData = async(data) => {
    const response = await axios.post(`${API_URL}/banner`, data);
    return response.data;
};