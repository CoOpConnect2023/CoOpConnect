import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    reflections: [],
    status: {
        reflections: "idle",
        myreflections: "idle",
        postReflection: "idle",
        putReflection: "idle",
        patchReflection: "idle",
        deleteReflection: "idle",
    },
};

export const reflectionsSlice = createSlice({
    name: "reflections",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getReflections.pending, (state, action) => {
                state.status.reflections = "loading";
            })
            .addCase(getReflections.fulfilled, (state, action) => {
                state.reflections = action.payload;
                state.status.reflections = "succeeded";
            })
            .addCase(getReflections.rejected, (state, action) => {
                state.status.reflections = "failed";
            })
            .addCase(selectReflection.pending, (state, action) => {
                state.status.reflections = "loading";
            })
            .addCase(selectReflection.fulfilled, (state, action) => {
                state.reflections = action.payload;
                state.status.reflections = "succeeded";
            })
            .addCase(selectReflection.rejected, (state, action) => {
                state.status.reflections = "failed";
            })
            .addCase(getMyReflections.pending, (state, action) => {
                state.status.myreflections = "loading";
            })
            .addCase(getMyReflections.fulfilled, (state, action) => {
                state.myreflections = action.payload;
                state.status.myreflections = "succeeded";
            })
            .addCase(getMyReflections.rejected, (state, action) => {
                state.status.myreflections = "failed";
            })

            .addCase(getReflectionsForUser.pending, (state, action) => {
                state.status.reflections = "loading";
            })
            .addCase(getReflectionsForUser.fulfilled, (state, action) => {
                state.reflections = action.payload;
                state.status.reflections = "succeeded";
            })
            .addCase(getReflectionsForUser.rejected, (state, action) => {
                state.status.reflections = "failed";
            })
            .addCase(getReflectionsForJob.pending, (state, action) => {
                state.status.reflections = "loading";
            })
            .addCase(getReflectionsForJob.fulfilled, (state, action) => {
                state.reflections = action.payload;
                state.status.reflections = "succeeded";
            })
            .addCase(getReflectionsForJob.rejected, (state, action) => {
                state.status.reflections = "failed";
            })
            .addCase(postReflection.pending, (state, action) => {
                state.status.postReflection = "loading";
            })
            .addCase(postReflection.fulfilled, (state, action) => {
                state.status.postReflection = "succeeded";
            })
            .addCase(postReflection.rejected, (state, action) => {
                state.status.postReflection = "failed";
            })
            .addCase(putReflection.pending, (state, action) => {
                state.status.putReflection = "loading";
            })
            .addCase(putReflection.fulfilled, (state, action) => {
                state.status.putReflection = "succeeded";
            })
            .addCase(putReflection.rejected, (state, action) => {
                state.status.putReflection = "failed";
            })
            .addCase(patchReflection.pending, (state, action) => {
                state.status.patchReflection = "loading";
            })
            .addCase(patchReflection.fulfilled, (state, action) => {
                state.status.patchReflection = "succeeded";
            })
            .addCase(patchReflection.rejected, (state, action) => {
                state.status.patchReflection = "failed";
            })
            .addCase(deleteReflection.pending, (state, action) => {
                state.status.deleteReflection = "loading";
            })
            .addCase(deleteReflection.fulfilled, (state, action) => {

                return state.myreflections.filter(reflection => reflection.id !== action.payload);
              })
            .addCase(deleteReflection.rejected, (state, action) => {
                state.status.deleteReflection = "failed";
            });
    },
});

export const getReflections = createAsyncThunk(
    "reflections/getReflections",
    async () => {
        const response = await axios({
            url: "/reflections",
            method: "GET",
        });
        return response.data.data;
    }
);

export const getMyReflections = createAsyncThunk(
    "reflections/getMyReflections",
    async () => {
        const response = await axios({
            url: "/myreflections",
            method: "GET",
        });
        console.log(response.data.data)
        return response.data.data;
    }
);

export const selectReflection = createAsyncThunk(
    "reflections/selectReflection",
    async (params) => {
        const { reflectionId } = params;
        const response = await axios({
            url: `/reflections/${reflectionId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getReflectionsForUser = createAsyncThunk(
    "reflections/getReflectionsForUser",
    async (params) => {
        const { userId } = params;
        const response = await axios({
            url: `/reflections?userId[eq]=${userId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getReflectionsForJob = createAsyncThunk(
    "reflections/getReflectionsForJob",
    async (params) => {
        const { jobsId } = params;
        const response = await axios({
            url: `/reflections?jobsId[eq]=${jobsId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const postReflection = createAsyncThunk(
    "reflections/postReflection",
    async (params) => {
        const { content, userId, jobsId, createdAt, updatedAt } = params;
        const response = await axios({
            url: "/reflections",
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

export const putReflection = createAsyncThunk(
    "reflections/putReflection",
    async (params) => {
        const { reflectionId, content, userId, jobsId, createdAt, updatedAt } =
            params;
        const response = await axios({
            url: `/reflections/${reflectionId}`,
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

export const patchReflection = createAsyncThunk(
    "reflections/patchReflection",
    async (params) => {
        const { reflectionId, content, userId, jobsId, createdAt, updatedAt } =
            params;
        const response = await axios({
            url: `/reflections/${reflectionId}`,
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

export const deleteReflection = createAsyncThunk(
    "reflections/deleteReflection",
    async (params) => {
        const { reflectionId } = params;
        const response = await axios({
            url: `/reflections/${reflectionId}`,
            method: "DELETE",
            data: { reflectionId },
        });
        return response.data.data;
    }
);

export const selectReflections = (state) => state.reflections.reflections;
export const selectMyReflections = (state) => state.reflections.myreflections;
export const selectReflectionsStatus = (state) =>
    state.reflections.status.reflections;
// Action creators are generated for each case reducer function
export const {} = reflectionsSlice.actions;

export default reflectionsSlice.reducer;
