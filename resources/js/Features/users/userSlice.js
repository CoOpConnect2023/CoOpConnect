import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const appUrl = import.meta.env.VITE_APP_URL;

const initialState = {
    user: null,
    status: {
        user: "idle",
    },
};

export const getUser = createAsyncThunk(
    "user/getUser",
    async () => {
        const response = await axios({
            url: `${appUrl}/api/user-id`,
            method: "GET",
        });

        return response.data.user;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUser.pending, (state, action) => {

                state.status.user = "loading";

            })
            .addCase(getUser.fulfilled, (state, action) => {

                state.user = action.payload; // Ensure lowercase 'user'
                state.status.user = "succeeded";

            })
            .addCase(getUser.rejected, (state, action) => {

                state.status.user = "failed";

            });
    },
});

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;

