import { configureStore } from "@reduxjs/toolkit";
import resourceSlice from './Slice/resourcesSlice';

const store = configureStore({
    reducer: {
        resources: resourceSlice
    }
})

export default store;