import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slice/registerSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;