import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";

const initialState = {
    shortlists: [],
    teacherShortlists: [],
    studentShortlists: [],
    status: {
        shortlists: "idle",
        teacherShortlists: "idle",
        studentShortlists: "idle",
        postShortlist: "idle",
        putShortlist: "idle",
        patchShortlist: "idle",
        deleteShortlist: "idle",
    },
};

export const shortlistsSlice = createSlice({
    name: "shortlists",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getShortlists.pending, (state, action) => {
                state.status.shortlists = "loading";
            })
            .addCase(getShortlists.fulfilled, (state, action) => {
                state.shortlists = action.payload;
                state.status.shortlists = "succeeded";
            })
            .addCase(getShortlists.rejected, (state, action) => {
                state.status.shortlists = "failed";
            })
            .addCase(selectShortlist.pending, (state, action) => {
                state.status.shortlists = "loading";
            })
            .addCase(selectShortlist.fulfilled, (state, action) => {
                state.shortlists = action.payload;
                state.status.shortlists = "succeeded";
            })
            .addCase(selectShortlist.rejected, (state, action) => {
                state.status.shortlists = "failed";
            })
            .addCase(getTeacherShortlists.pending, (state, action) => {
                state.status.teacherShortlists = "loading";
            })
            .addCase(getTeacherShortlists.fulfilled, (state, action) => {
                state.teacherShortlists = action.payload;
                state.status.teacherShortlists = "succeeded";
            })
            .addCase(getTeacherShortlists.rejected, (state, action) => {
                state.status.teacherShortlists = "failed";
            })
            .addCase(selectTeacherShortlist.pending, (state, action) => {
                state.status.teacherShortlists = "loading";
            })
            .addCase(selectTeacherShortlist.fulfilled, (state, action) => {
                state.teacherShortlists = action.payload;
                state.status.teacherShortlists = "succeeded";
            })
            .addCase(selectTeacherShortlist.rejected, (state, action) => {
                state.status.teacherShortlists = "failed";
            })

            .addCase(getStudentShortlists.pending, (state, action) => {
                state.status.studentShortlists = "loading";
            })
            .addCase(getStudentShortlists.fulfilled, (state, action) => {
                state.studentShortlists = action.payload;
                state.status.studentShortlists = "succeeded";
            })
            .addCase(getStudentShortlists.rejected, (state, action) => {
                state.status.studentShortlists = "failed";
            })
            .addCase(selectStudentShortlist.pending, (state, action) => {
                state.status.studentShortlists = "loading";
            })
            .addCase(selectStudentShortlist.fulfilled, (state, action) => {
                state.studentShortlists = action.payload;
                state.status.studentShortlists = "succeeded";
            })
            .addCase(selectStudentShortlist.rejected, (state, action) => {
                state.status.studentShortlists = "failed";
            })
            .addCase(getShortlistsForUser.pending, (state, action) => {
                state.status.shortlists = "loading";
            })
            .addCase(getShortlistsForUser.fulfilled, (state, action) => {
                state.shortlists = action.payload;
                state.status.shortlists = "succeeded";
            })
            .addCase(getShortlistsForUser.rejected, (state, action) => {
                state.status.shortlists = "failed";
            })
            .addCase(getShortlistsForJob.pending, (state, action) => {
                state.status.shortlists = "loading";
            })
            .addCase(getShortlistsForJob.fulfilled, (state, action) => {
                state.shortlists = action.payload;
                state.status.shortlists = "succeeded";
            })
            .addCase(getShortlistsForJob.rejected, (state, action) => {
                state.status.shortlists = "failed";
            })
            .addCase(postShortlist.pending, (state, action) => {
                state.status.postShortlist = "loading";
            })
            .addCase(postShortlist.fulfilled, (state, action) => {
                state.status.postShortlist = "succeeded";
            })
            .addCase(postShortlist.rejected, (state, action) => {
                state.status.postShortlist = "failed";
            })
            .addCase(putShortlist.pending, (state, action) => {
                state.status.putShortlist = "loading";
            })
            .addCase(putShortlist.fulfilled, (state, action) => {
                state.status.putShortlist = "succeeded";
            })
            .addCase(putShortlist.rejected, (state, action) => {
                state.status.putShortlist = "failed";
            })
            .addCase(patchShortlist.pending, (state, action) => {
                state.status.patchShortlist = "loading";
            })
            .addCase(patchShortlist.fulfilled, (state, action) => {
                state.status.patchShortlist = "succeeded";
            })
            .addCase(patchShortlist.rejected, (state, action) => {
                state.status.patchShortlist = "failed";
            })
            .addCase(deleteShortlist.pending, (state, action) => {
                state.status.deleteShortlist = "loading";
            })
            .addCase(deleteShortlist.fulfilled, (state, action) => {
                state.status.deleteShortlist = "succeeded";
            })
            .addCase(deleteShortlist.rejected, (state, action) => {
                state.status.deleteShortlist = "failed";
            });
    },
});

export const getShortlists = createAsyncThunk(
    "shortlists/getShortlists",
    async (currentUser) => {
        const response = await axios({
            url: `http://127.0.0.1:8000/api/users/${currentUser}/shortlists`,
            method: "GET",
        });

        return response.data.shortlists;
    }
);

export const selectShortlist = createAsyncThunk(
    "shortlists/selectShortlist",
    async (params) => {
        const { shortlistId } = params;
        const response = await axios({
            url: `/shortlists/${shortlistId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getTeacherShortlists = createAsyncThunk(
    "shortlists/getTeacherShortlists",
    async (currentUser) => {
        const response = await axios({
            url: `/courses/teacher/${currentUser}`,
            method: "GET",
        });

        return response.data.data;
    }
);

export const selectTeacherShortlist = createAsyncThunk(
    "shortlists/selectTeacherShortlist",
    async (params) => {
        const { shortlistId } = params;
        const response = await axios({
            url: `/shortlists/${shortlistId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getStudentShortlists = createAsyncThunk(
    "shortlists/getStudentShortlists",
    async (currentUser) => {
        const response = await axios({
            url: `/courses/school/${currentUser}`,
            method: "GET",
        });
console.log(response.data)
        return response.data;
    }
);

export const selectStudentShortlist = createAsyncThunk(
    "shortlists/selectStudentShortlist",
    async (params) => {
        const { shortlistId } = params;
        const response = await axios({
            url: `/shortlists/${shortlistId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getShortlistsForUser = createAsyncThunk(
    "shortlists/getShortlistsForUser",
    async (params) => {
        const { userId } = params;
        const response = await axios({
            url: `/shortlists?userId[eq]=${userId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getShortlistsForJob = createAsyncThunk(
    "shortlists/getshortlistsForJob",
    async (params) => {
        const { jobsId } = params;
        const response = await axios({
            url: `/shortlists?jobsId[eq]=${jobsId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const postShortlist = createAsyncThunk(
    "shortlists/postShortlist",
    async (params) => {
        const { content, userId, jobsId, createdAt, updatedAt } = params;
        const response = await axios({
            url: "/shortlists",
            method: "POST",
            data: {
                content,
                userId,
                jobsId,
                createdAt,
                updatedAt,
            },
        });
        return response.data.data;
    }
);

export const putShortlist = createAsyncThunk(
    "shortlists/putShortlist",
    async (params) => {
        const { ShortlistId, content, userId, jobsId, createdAt, updatedAt } =
            params;
        const response = await axios({
            url: `/shortlists/${ShortlistId}`,
            method: "PUT",
            data: {
                content,
                userId,
                jobsId,
                createdAt,
                updatedAt,
            },
        });
        return response.data.data;
    }
);

export const patchShortlist = createAsyncThunk(
    "shortlists/patchShortlist",
    async (params) => {
        const { shortlistId, content, userId, jobsId, createdAt, updatedAt } =
            params;
        const response = await axios({
            url: `/shortlists/${shortlistId}`,
            method: "PATCH",
            data: {
                content,
                userId,
                jobsId,
                createdAt,
                updatedAt,
            },
        });
        return response.data.data;
    }
);

export const deleteShortlist = createAsyncThunk(
    "shortlists/deleteShortlist",
    async (params) => {
        const { shortlistId } = params;
        const response = await axios({
            url: `/shortlists/${shortlistId}`,
            method: "DELETE",
            data: { shortlistId },
        });
        return response.data.data;
    }
);

export const selectShortlists = (state) => state.shortlists.shortlists;
export const selectShortlistsStatus = (state) =>
    state.shortlists.status.shortlists;
export const selectTeacherShortlists = (state) => state.shortlists.teacherShortlists;
export const selectTeacherShortlistsStatus = (state) =>
    state.shortlists.status.teacherShortlists;
export const selectStudentShortlists = (state) => state.shortlists.studentShortlists;
export const selectStudentShortlistsStatus = (state) =>
    state.shortlists.status.studentShortlists;
// Action creators are generated for each case reducer function
export const {} = shortlistsSlice.actions;

export default shortlistsSlice.reducer;
