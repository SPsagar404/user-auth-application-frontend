import axios from 'axios';

const API_URL = 'http://localhost:8080/auth-service';

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/signin`, { username, password });
    return response.data;
};

export const register = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/signup`, { username, password });
    return response.data;
};

export const userData =async(token) =>{
    const response = await axios.get(`${API_URL}/api/users/profile`,{ headers: {"Authorization" : `Bearer ${token}`} });
    return response.data;
}
