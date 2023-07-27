import axios from 'axios';

const baseURL = process.env.REACT_APP_MONGODB_URL;

// Get all available products
export const getAvailableProducts = () => {
    return axios.get(`${baseURL}/getavailableproducts`)
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

// Approve a product
export const approveProduct = (product) => {
    return axios.post(`${baseURL}/approveproduct`, product)
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

// Add a new product
export const addNewProduct = (product) => {
    return axios.post(`${baseURL}/addproduct`, product)
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

// Update a product
export const updateProduct = (product) => {
    return axios.post(`${baseURL}/updateproduct`, product)
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
            throw error;
        });
};
