import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        updateAddress: (state, action) => {
            state.user.address = action.payload;
        },
        updateProfile: (state, action) => {
            state.user.profile = action.payload;
        },
        updateNumber: (state, action) => {
            state.user.number = action.number;
        },
        updatePassword: (state, action) => {
            state.user.password = action.password;
        },
        updateProfile: (state, action) => {
            state.user.profile = action.profile;
        },
        updateDisplayName: (state, action) => {
            state.user.displayName = action.displayName;
        },

    },
});

export const { setUser, setIsLoggedIn, setLoading, setError, updateAddress, updateNumber
    , updateProfile, updatePassword } = userSlice.actions;

const persistConfig = {
    key: 'root',
    storage,
};

// Create a persisted version of the user reducer
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
export const selectUser = (state) => state.user.user;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export default persistedReducer;


