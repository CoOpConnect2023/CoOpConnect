import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const appUrl = import.meta.env.VITE_APP_URL;

const initialState = {
    user: null,
    users: null,
    status: {
        user: "idle",
        users: "idle",
        deleteUser: "idle",
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

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async () => {
        const response = await axios({
            url: `${appUrl}/api/users`,
            method: "GET",
        });

        return response.data;
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

export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userID) => {

        await axios.delete(`http://127.0.0.1:8000/api/users/${userID}`);
      return userID;
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

                state.user = action.payload;
                state.status.user = "succeeded";

            })
            .addCase(getUser.rejected, (state, action) => {

                state.status.user = "failed";

            })

            .addCase(getAllUsers.pending, (state, action) => {

                state.status.users = "loading";

            })
            .addCase(getAllUsers.fulfilled, (state, action) => {

                state.users = action.payload;
                state.status.users = "succeeded";

            })
            .addCase(getAllUsers.rejected, (state, action) => {

                state.status.users = "failed";

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
            .addCase(deleteUser.pending, (state, action) => {
                state.status.deleteUser = "loading";
            })
            .addCase(deleteUser.fulfilled, (state, action) => {

                state.users = state.users.filter(user => user.id !== action.payload);
                state.status.deleteUser = "succeeded";
              })
            .addCase(deleteUser.rejected, (state, action) => {
                state.status.deleteUser = "failed";
            });
    },
});

export const { updateUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectAllUsers = (state) => state.user.users;
export const selectAllUsersStatus = (state) => state.users.status;


export default userSlice.reducer;

