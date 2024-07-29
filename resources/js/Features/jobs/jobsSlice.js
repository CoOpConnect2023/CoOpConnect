import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";

const initialState = {
    jobs: [],
    job: "",
    jobFormData: {
        jobsId: "",
        title: "",
        description: "",
        location: "",
        postingStatus: "Open",
        jobType: "",
        company: "",
        skills: [],
        userId: "",
    },
    status: {
        jobs: "idle",
        job: "idle",
        postJob: "idle",
        putJob: "idle",
        patchJob: "idle",
        deleteJob: "idle",
    },
};

export const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        updateJobFormData: (state, action) => {
            state.jobFormData = {
                ...state.jobFormData,
                ...action.payload,
            };
        },
        resetJobFormData: (state) => {
            state.jobFormData = initialState.jobFormData;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getJobs.pending, (state, action) => {
                state.status.jobs = "loading";
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.jobs = action.payload;
                state.status.jobs = "succeeded";
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.status.jobs = "failed";
            })
            .addCase(selectJob.pending, (state, action) => {
                state.status.job = "loading";
            })
            .addCase(selectJob.fulfilled, (state, action) => {
                state.job = action.payload;
                state.status.jobs = "succeeded";
            })
            .addCase(selectJob.rejected, (state, action) => {
                state.status.job = "failed";
            })
            .addCase(getJobsforUser.pending, (state, action) => {
                state.status.jobs = "loading";
            })
            .addCase(getJobsforUser.fulfilled, (state, action) => {
                state.jobs = action.payload;
                state.status.jobs = "succeeded";
            })
            .addCase(getJobsforUser.rejected, (state, action) => {
                state.status.jobs = "failed";
            })
            .addCase(getJobsforEmployer.pending, (state, action) => {
                state.status.jobs = "loading";
            })
            .addCase(getJobsforEmployer.fulfilled, (state, action) => {
                state.jobs = action.payload;
                state.status.jobs = "succeeded";
            })
            .addCase(getJobsforEmployer.rejected, (state, action) => {
                state.status.jobs = "failed";
            })
            .addCase(getUsersForJob.pending, (state, action) => {
                state.status.jobs = "loading";
            })
            .addCase(getUsersForJob.fulfilled, (state, action) => {
                state.jobs = action.payload;
                state.status.jobs = "succeeded";
            })
            .addCase(getUsersForJob.rejected, (state, action) => {
                state.status.jobs = "failed";
            })
            .addCase(searchJobsbySkill.pending, (state, action) => {
                state.status.jobs = "loading";
            })
            .addCase(searchJobsbySkill.fulfilled, (state, action) => {
                console.log(action.payload);
                state.jobs = action.payload;
                state.status.jobs = "succeeded";
            })
            .addCase(searchJobsbySkill.rejected, (state, action) => {
                state.status.jobs = "failed";
            })
            .addCase(searchJobsBySkillAndLocation.pending, (state, action) => {
                state.status.jobs = "loading";
            })
            .addCase(
                searchJobsBySkillAndLocation.fulfilled,
                (state, action) => {
                    state.jobs = action.payload;
                    state.status.jobs = "succeeded";
                }
            )
            .addCase(searchJobsBySkillAndLocation.rejected, (state, action) => {
                state.status.jobs = "failed";
            })
            .addCase(postJob.pending, (state, action) => {
                state.status.postJob = "loading";
            })
            .addCase(postJob.fulfilled, (state, action) => {
                state.status.postJob = "succeeded";
            })
            .addCase(postJob.rejected, (state, action) => {
                state.status.postJob = "failed";
            })
            .addCase(putJob.pending, (state, action) => {
                state.status.putJob = "loading";
            })
            .addCase(putJob.fulfilled, (state, action) => {
                state.status.putJob = "succeeded";
            })
            .addCase(putJob.rejected, (state, action) => {
                state.status.putJob = "failed";
            })
            .addCase(patchJob.pending, (state, action) => {
                state.status.patchJob = "loading";
            })
            .addCase(patchJob.fulfilled, (state, action) => {
                state.status.patchJob = "succeeded";
                if (state.jobs.length > 0) {
                    state.jobs = state.jobs.map((job) =>
                        job.id === action.payload.id ? action.payload : job
                    );
                } else {
                    state.jobs = action.payload;
                }
            })
            .addCase(patchJob.rejected, (state, action) => {
                state.status.patchJob = "failed";
            })
            .addCase(deleteJob.pending, (state, action) => {
                state.status.deleteJob = "loading";
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.status.deleteJob = "succeeded";
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.status.deleteJob = "failed";
            });
    },
});

export const getJobs = createAsyncThunk("jobs/getJobs", async () => {
    const response = await axios({
        url: "/jobs",
        method: "GET",
    });
    return response.data.data;
});

export const selectJob = createAsyncThunk("jobs/selectJob", async (params) => {
    const { jobId } = params;
    const response = await axios({
        url: `/jobs/${jobId}`,
        method: "GET",
    });
    return response.data.data;
});

export const getJobsforUser = createAsyncThunk(
    "jobs/getJobsforUser",
    async (params) => {
        const { userId } = params;
        const response = await axios({
            url: `/jobs/user/${userId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getJobsforEmployer = createAsyncThunk(
    "jobs/getJobsforEmployer",
    async (params) => {
        const { userId } = params;
        const response = await axios({
            url: `/jobs?userId[eq]=${userId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getUsersForJob = createAsyncThunk(
    "jobs/getUsersForJob",
    async (params) => {
        const { jobId } = params;
        const response = await axios({
            url: `/jobs?id[eq]=${jobId}&includeUsers=true`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const searchJobsbySkill = createAsyncThunk(
    "jobs/searchJobsbySkill",
    async (params) => {
        const { skills } = params;
        const response = await axios({
            url: "/jobs/match",
            method: "GET",
            params: {
                skills,
            },
        });

        console.log(response.data);

        return response.data.data;
    }
);

export const searchJobsBySkillAndLocation = createAsyncThunk(
    "jobs/searchJobsBySkillAndLocation",
    async (params) => {
        const { searchTerm, location } = params;
        console.log("test", searchTerm);
        const response = await axios({
            url: "/jobs/search",
            method: "GET",
            params: {
                searchTerm,
                location,
            },
        });
        return response.data.data;
    }
);

export const postJob = createAsyncThunk("jobs/postJob", async (params) => {
    const {
        title,
        description,
        skills,
        location,
        postingStatus,
        jobType,
        company,
        userId,
    } = params;
    console.log(params);
    const response = await axios({
        url: "/jobs",
        method: "POST",
        data: {
            title,
            description,
            skills,
            location,
            postingStatus,
            jobType,
            company,
            userId,
        },
    });
    return response.data.data;
});

export const putJob = createAsyncThunk("jobs/putJob", async (params) => {
    const {
        jobsId,
        title,
        description,
        skills,
        location,
        postingStatus,
        jobType,
        company,
        userId,
    } = params;
    const response = await axios({
        url: `/jobs/${jobsId}`,
        method: "PUT",
        data: {
            title,
            description,
            skills,
            location,
            postingStatus,
            jobType,
            company,
            userId,
        },
    });
    return response.data.data;
});

export const patchJob = createAsyncThunk("jobs/patchJob", async (params) => {
    const {
        jobsId,
        title,
        description,
        skills,
        location,
        postingStatus,
        jobType,
        company,
    } = params;
    const response = await axios({
        url: `/jobs/${jobsId}`,
        method: "PATCH",
        data: {
            jobsId,
            title,
            description,
            skills,
            location,
            postingStatus,
            jobType,
            company,
        },
    });
    console.log(response.data.data);
    return response.data.data;
});

export const deleteJob = createAsyncThunk("jobs/deleteJob", async (params) => {
    const { jobId } = params;
    const response = await axios({
        url: `/jobs/${jobId}`,
        method: "DELETE",
    });
    return response.data.data;
});

export const applyJob = createAsyncThunk(
    "userjobs/applyJob",
    async (params) => {
        const { userId, jobId, resume } = params;
        const status = "Pending";
        const response = await axios({
            url: `/userjobs`,
            method: "POST",
            data: { userId, jobId, resume, status },
        });
        return response.data.data;
    }
);

export const selectJobs = (state) => state.jobs.jobs;
export const selectSingleJob = (state) => state.jobs.job;
export const selectJobsStatus = (state) => state.jobs.status.jobs;
// Action creators are generated for each case reducer function
export const { updateJobFormData, resetJobFormData } = jobsSlice.actions;
export const selectJobFormData = (state) => state.jobs.jobFormData;

export default jobsSlice.reducer;
