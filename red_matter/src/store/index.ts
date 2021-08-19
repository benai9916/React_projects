import { configureStore } from "@reduxjs/toolkit";
import rectangleSlice from './slice/addRectangle';

const store = configureStore({
    reducer: {
        rectangle: rectangleSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;