import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";

const initialState = {
    userJobs: [],
    userJob: "",
    applicants: [],
    applicant: "",
    userJobExist: false,
    status: {
        userJobs: "idle",
        postUserJob: "idle",
        putUserJob: "idle",
        patchUserJob: "idle",
        deleteUserJob: "idle",
        checkUserJob: "idle",
        getUserDetails: "idle",
        getSingleUserDetails: "idle",
    },
};

export const userJobsSlice = createSlice({
    name: "userJobs",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUserJobs.pending, (state) => {
                state.status.userJobs = "loading";
            })
            .addCase(getUserJobs.fulfilled, (state, action) => {
                state.userJobs = action.payload;
                state.status.userJobs = "succeeded";
            })
            .addCase(getUserJobs.rejected, (state) => {
                state.status.userJobs = "failed";
            })
            .addCase(getUserJob.pending, (state) => {
                state.status.userJobs = "loading";
            })
            .addCase(getUserJob.fulfilled, (state, action) => {
                state.userJob = action.payload;
                state.status.userJobs = "succeeded";
            })
            .addCase(getUserJob.rejected, (state) => {
                state.status.userJobs = "failed";
            })
            .addCase(postUserJob.pending, (state) => {
                state.status.postUserJob = "loading";
            })
            .addCase(postUserJob.fulfilled, (state) => {
                state.status.postUserJob = "succeeded";
            })
            .addCase(postUserJob.rejected, (state) => {
                state.status.postUserJob = "failed";
            })
            .addCase(putUserJob.pending, (state) => {
                state.status.putUserJob = "loading";
            })
            .addCase(putUserJob.fulfilled, (state) => {
                state.status.putUserJob = "succeeded";
            })
            .addCase(putUserJob.rejected, (state) => {
                state.status.putUserJob = "failed";
            })
            .addCase(patchUserJob.pending, (state) => {
                state.status.patchUserJob = "loading";
            })
            .addCase(patchUserJob.fulfilled, (state, action) => {
                state.status.patchUserJob = "succeeded";
                console.log(action.payload)
                if (state.userJobs) {
                    state.userJobs = state.userJobs.map((userJob) =>
                        userJob.id === action.payload.id
                            ? action.payload
                            : userJob
                    );
                } else {
                    state.userJobs = action.payload;
                }
                if (state.applicants) {
                    state.applicants = state.applicants.map((applicant) =>
                        applicant.id === action.payload.id
                            ? action.payload
                            : applicant
                    );
                } else {
                    state.applicants = action.payload;
                }
            })
            .addCase(patchUserJob.rejected, (state) => {
                state.status.patchUserJob = "failed";
            })
            .addCase(deleteUserJob.pending, (state) => {
                state.status.deleteUserJob = "loading";
            })
            .addCase(deleteUserJob.fulfilled, (state) => {
                state.status.deleteUserJob = "succeeded";
            })
            .addCase(deleteUserJob.rejected, (state) => {
                state.status.deleteUserJob = "failed";
            })
            .addCase(checkUserJob.pending, (state) => {
                state.status.checkUserJob = "loading";
            })
            .addCase(checkUserJob.fulfilled, (state, action) => {
                if (action.payload.length > 0) {
                    state.checkUserJob = true;
                } else {
                    state.checkUserJob = false;
                }
                state.status.checkUserJob = "succeeded";
            })
            .addCase(checkUserJob.rejected, (state) => {
                state.status.checkUserJob = "failed";
            })
            .addCase(getUserDetails.pending, (state) => {
                state.status.getUserDetails = "loading";
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.applicants = action.payload;
                state.status.getUserDetails = "succeeded";
            })
            .addCase(getUserDetails.rejected, (state) => {
                state.status.getUserDetails = "failed";
            })
            .addCase(getSingleUserDetails.pending, (state) => {
                state.status.getSingleUserDetails = "loading";
            })
            .addCase(getSingleUserDetails.fulfilled, (state, action) => {
                state.applicant = action.payload;
                state.status.getSingleUserDetails = "succeeded";
            })
            .addCase(getSingleUserDetails.rejected, (state) => {
                state.status.getSingleUserDetails = "failed";
            });
    },
});

export const getUserJobs = createAsyncThunk(
    "userJobs/getUserJobs",
    async () => {
        const response = await axios({
            url: "/userjobs",
            method: "GET",
        });
        return response.data.data;
    }
);

export const getUserJob = createAsyncThunk(
    "userJobs/getUserJob",
    async (params) => {
        const { userJobId } = params;
        const response = await axios({
            url: `/userjobs/${userJobId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const postUserJob = createAsyncThunk(
    "userJobs/postUserJob",
    async (params) => {
        const { userId, jobsId, resume } = params;
        const status = "Pending";
        console.log(userId, jobsId, resume, status);
        const response = await axios({
            url: "/userjobs",
            method: "POST",
            data: {
                userId,
                jobsId,
                resume,
                status,
            },
        });
        return response.data.data;
    }
);

export const putUserJob = createAsyncThunk(
    "userJobs/putUserJob",
    async (params) => {
        const { userJobsId, userId, jobsId, resume, status } = params;
        console.log(userJobsId, userId, jobsId, resume, status);
        const response = await axios({
            url: `/userjobs/${userJobsId}`,
            method: "PUT",
            data: {
                userId,
                jobsId,
                resume,
                status,
            },
        });
        return response.data.data;
    }
);

export const patchUserJob = createAsyncThunk(
    "userJobs/patchUserJob",
    async (params) => {
        const { userJobsId, status, message, timeSlots } = params;
        console.log(userJobsId, status, message, timeSlots);
        const response = await axios({
            url: `/userjobs/${userJobsId}`,
            method: "PATCH",
            data: {
                status,
                message,
                timeSlots,
            },
        });
        return response.data.data;
    }
);

export const deleteUserJob = createAsyncThunk(
    "userJobs/deleteUserJob",
    async (params) => {
        const { userJobId } = params;
        const response = await axios({
            url: `/userjobs/${userJobId}`,
            method: "DELETE",
        });
        return response.data.data;
    }
);

export const checkUserJob = createAsyncThunk(
    "userJobs/checkUserJob",
    async (params) => {
        const { userId, jobsId } = params;
        const response = await axios({
            url: `/userjobs?userId[eq]=${userId}&jobsId[eq]=${jobsId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getUserDetails = createAsyncThunk(
    "userJobs/getUserDetails",
    async (params) => {
        const { jobsId } = params;
        const response = await axios({
            url: `/userjobs/list/${jobsId}`,
            method: "GET",
        });
        return response.data;
    }
);

export const getSingleUserDetails = createAsyncThunk(
    "userJobs/getSingleUserDetails",
    async (params) => {
        const { userJobsId } = params;
        const response = await axios({
            url: `/userjobs/user/${userJobsId}`,
            method: "GET",
        });
        return response.data;
    }
);

export const selectUserJobs = (state) => state.userJobs.userJobs;
export const selectUserJob = (state) => state.userJobs.userJob;
export const selectApplicants = (state) => state.userJobs.applicants;
export const selectApplicant = (state) => state.userJobs.applicant;
export const selectCheckUserJobs = (state) => state.userJobs.checkUserJob;
export const selectUserJobsStatus = (state) => state.userJobs.status;

export const {} = userJobsSlice.actions;

export default userJobsSlice.reducer;
