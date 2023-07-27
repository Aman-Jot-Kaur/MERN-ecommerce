import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './features/userSlice.js';
import { persistStore } from 'redux-persist';

const Store = configureStore({
    reducer: {
        user: persistedReducer,
    },
});

const persistor = persistStore(Store);

export { Store, persistor };


