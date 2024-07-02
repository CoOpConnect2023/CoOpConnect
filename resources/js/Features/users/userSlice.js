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

export const updateUserProfile = createAsyncThunk(
    "user/updateUserProfile",
    async (userData) => {
        const { id, ...data } = userData;  // Extracting ID from userData
        const response = await axios({
            url: `${appUrl}/api/update-profile/${id}`,
            method: "POST",
            data: data,
        });
        return response.data.user;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
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

            })
            .addCase(updateUserProfile.pending, (state, action) => {
                state.status.user = "loading";
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status.user = "succeeded";
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.status.user = "failed";
            })
    },
});

export const { updateUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;

