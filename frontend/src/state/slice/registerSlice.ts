import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

interface RegisterState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: RegisterState = {
    loading: false,
    success: false,
    error: null,
};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerAsync.pending, (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        })
        builder.addCase(registerAsync.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        builder.addCase(registerAsync.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload as string;
        });
    },
});

export const registerAsync = createAsyncThunk(
    "register/registerUser",
    async (formData: {name: string, email: string, password: string}, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:4000/api/flask/register", formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "There was an error");
        }
    }
);

export default registerSlice.reducer;