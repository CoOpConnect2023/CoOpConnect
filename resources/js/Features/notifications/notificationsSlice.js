import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    notifications: [],
    myNotifications: [],
    status: {
        notifications: "idle",
        myNotifications: "idle",
        postNotification: "idle",
        putNotification: "idle",
        patchNotification: "idle",
        deleteNotification: "idle",
    },
    error: null,
};

// Thunks
export const getMyNotifications = createAsyncThunk(
    "notifications/getMyNotifications",
    async () => {
        const response = await axios({
            url: "/notifications",
            method: "GET",
        });

        return response.data.data;
    }
);

export const fetchNotificationById = createAsyncThunk(
    "notifications/fetchNotificationById",
    async (params) => {
        const { notificationId } = params;
        const response = await axios({
            url: `/notifications/${notificationId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getNotificationsForUser = createAsyncThunk(
    "notifications/getNotificationsForUser",
    async (params) => {
        const { userId } = params;
        const response = await axios({
            url: `/notifications?user_id=${userId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const postNotification = createAsyncThunk(
    "notifications/postNotification",
    async (params) => {
        const {
            from_user_id,
            to_user_id,
            content,
            viewed,
            type,
            interview_date,

        } = params;

        const response = await axios({
            url: "/notifications",
            method: "POST",
            data: {
                from_user_id,
                to_user_id,
                content,
                viewed,
                type,
                interview_date,

            },
        });
        return response.data.data;
    }
);

export const putNotification = createAsyncThunk(
    "notifications/putNotification",
    async (params) => {
        const {
            notificationId,
            from_user_id,
            to_user_id,
            content,
            type,
            interview_date,
            created_at,
            updated_at
        } = params;

        const response = await axios({
            url: `/notifications/${notificationId}`,
            method: "PUT",
            data: {
                from_user_id,
                to_user_id,
                content,
                type,
                interview_date,
                created_at,
                updated_at
            },
        });
        return response.data.data;
    }
);

export const patchNotification = createAsyncThunk(
    "notifications/patchNotification",
    async (params) => {
        const {
            notificationId,
            from_user_id,
            to_user_id,
            content,
            type,
            interview_date,
            created_at,
            updated_at,
            viewed  // Include viewed field
        } = params;

        const response = await axios({
            url: `/notifications/${notificationId}`,
            method: "PATCH",
            data: {
                from_user_id,
                to_user_id,
                content,
                type,
                interview_date,
                created_at,
                updated_at,
                viewed  // Ensure viewed is part of the data
            },
        });
        return response.data.data;
    }
);



export const deleteNotification = createAsyncThunk(
    "notifications/deleteNotification",
    async (params) => {
        const { notificationId } = params;
        await axios({
            url: `/notifications/${notificationId}`,
            method: "DELETE",
        });
        return notificationId; // Return the ID to filter out the notification from the state
    }
);

// Slice
export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Get my notifications
            .addCase(getMyNotifications.pending, (state) => {
                state.status.myNotifications = "loading";
            })
            .addCase(getMyNotifications.fulfilled, (state, action) => {
                state.myNotifications = action.payload;
                state.status.myNotifications = "succeeded";
            })
            .addCase(getMyNotifications.rejected, (state, action) => {
                state.status.myNotifications = "failed";
                state.error = action.error.message;
            })

            // Get notifications for a user
            .addCase(getNotificationsForUser.pending, (state) => {
                state.status.notifications = "loading";
            })
            .addCase(getNotificationsForUser.fulfilled, (state, action) => {
                state.notifications = action.payload;
                state.status.notifications = "succeeded";
            })
            .addCase(getNotificationsForUser.rejected, (state, action) => {
                state.status.notifications = "failed";
                state.error = action.error.message;
            })

            // Post notification
            .addCase(postNotification.pending, (state) => {
                state.status.postNotification = "loading";
            })
            .addCase(postNotification.fulfilled, (state) => {
                state.status.postNotification = "succeeded";
            })
            .addCase(postNotification.rejected, (state, action) => {
                state.status.postNotification = "failed";
                state.error = action.error.message;
            })

            // Put notification
            .addCase(putNotification.pending, (state) => {
                state.status.putNotification = "loading";
            })
            .addCase(putNotification.fulfilled, (state) => {
                state.status.putNotification = "succeeded";
            })
            .addCase(putNotification.rejected, (state, action) => {
                state.status.putNotification = "failed";
                state.error = action.error.message;
            })

            // Patch notification
            .addCase(patchNotification.pending, (state) => {
                state.status.patchNotification = "loading";
            })
            .addCase(patchNotification.fulfilled, (state, action) => {
                state.status.patchNotification = "succeeded";

                // Update the specific notification in the state
                const updatedNotification = action.payload;
                state.myNotifications = state.myNotifications.map(notification =>
                    notification.id === updatedNotification.id ? updatedNotification : notification
                );
            })
            .addCase(patchNotification.rejected, (state, action) => {
                state.status.patchNotification = "failed";
                state.error = action.error.message;
            })

            // Delete notification
            .addCase(deleteNotification.pending, (state) => {
                state.status.deleteNotification = "loading";
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                state.myNotifications = state.myNotifications.filter(
                    (notification) => notification.id !== action.payload
                );
                state.status.deleteNotification = "succeeded";
            })
            .addCase(deleteNotification.rejected, (state, action) => {
                state.status.deleteNotification = "failed";
                state.error = action.error.message;
            });
    },
});

// Selectors
export const selectNotificationsStatus = (state) =>
    state.notifications.status.notifications;

// Export the reducer
export default notificationsSlice.reducer;
