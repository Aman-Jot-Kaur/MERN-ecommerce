import axios from 'axios';

const baseURL = process.env.REACT_APP_MONGODB_URL;

// Update user profile
export const updateUserProfile = (email, num, name, totalOrders, pic) => {
    return axios.post(`${baseURL}/updateuser`, { email, number: num, displayName: name, address: totalOrders, profile: pic })
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

// Get user details
export const getUserDetails = (email) => {
    return axios.post(`${baseURL}/getuser`, { mail: email })
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
            throw error;
        });
};
