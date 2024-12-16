import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slice/registerSlice";
import loginReducer from "./slice/loginSlice";

const store = configureStore({
    reducer: {
        register: registerReducer,
        login: loginReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;