import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    userJobs: [],
    userJob: "",
    applicants: [],
    jobs: [],
    job: "",
    applicant: "",
    userJobExist: false,
    interviews: [],
    status: {
        userJobs: "idle",
        postUserJob: "idle",
        putUserJob: "idle",
        patchUserJob: "idle",
        deleteUserJob: "idle",
        checkUserJob: "idle",
        getUserDetails: "idle",
        getSingleUserDetails: "idle",
        getInterviews: "idle",
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
                            ? {
                                  ...applicant,
                                  status: action.payload.status,
                                  timeSlots: action.payload.timeSlots,
                              }
                            : applicant
                    );
                } else {
                    state.applicants = action.payload;
                }
                if (state.jobs) {
                    state.jobs = state.jobs.map((job) =>
                        job.id === action.payload.id
                            ? {
                                  ...job,
                                  status: action.payload.status,
                                  timeSlots: action.payload.timeSlots,
                              }
                            : job
                    );
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
            })
            .addCase(getJobsDetails.pending, (state) => {
                state.status.getJobsDetails = "loading";
            })
            .addCase(getJobsDetails.fulfilled, (state, action) => {
                state.jobs = action.payload;
                state.status.getJobsDetails = "succeeded";
            })
            .addCase(getJobsDetails.rejected, (state) => {
                state.status.getJobsDetails = "failed";
            })
            .addCase(getSingleJobDetails.pending, (state) => {
                state.status.getSingleJobDetails = "loading";
            })
            .addCase(getSingleJobDetails.fulfilled, (state, action) => {
                state.job = action.payload;
                state.status.getSingleJobDetails = "succeeded";
            })
            .addCase(getSingleJobDetails.rejected, (state) => {
                state.status.getSingleJobDetails = "failed";
            })
            .addCase(getInterviews.pending, (state) => {
                state.status.getInterviews = "loading";
            })
            .addCase(getInterviews.fulfilled, (state, action) => {
                state.interviews = action.payload;
                state.status.getInterviews = "succeeded";
            })
            .addCase(getInterviews.rejected, (state) => {
                state.status.getInterviews = "failed";
            })
            .addCase(getUserJobsByUserId.pending, (state) => {
                state.status.userJobs = "loading";
            })
            .addCase(getUserJobsByUserId.fulfilled, (state, action) => {
                state.userJobs = action.payload;
                state.status.userJobs = "succeeded";
            })
            .addCase(getUserJobsByUserId.rejected, (state) => {
                state.status.userJobs = "failed";
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
        console.log(response.data.data)
        return response.data.data;
    }
);

export const getUserJobsByUserId = createAsyncThunk(
    "userJobs/getUserJobsByUserId",
    async () => {
        const response = await axios({
            url: `/userjobs/owned`,
            method: "GET",
        });
console.log(response.data)
        return response.data;
    }
);


export const editHiredStudent = createAsyncThunk(
    "userJobs/editHiredStudent",
    async (params) => {
        const { userJobsId, email, jobTitle, startDate, endDate, status, timeSlots, message } = params;

        // Send a PATCH request to update the hired student information and job title
        const response = await axios({
            url: `/userjobs/${userJobsId}/edit-hired-student`, // Specific route for this action
            method: "PATCH",
            data: {
                email,       // Update the user email
                job_title: jobTitle, // Update the job title
                start_date: startDate,
                end_date: endDate,
                status,
                time_slots: timeSlots, // Optional fields
                message
            },
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
        // Destructure and set default status to "Pending" if it's not provided in params
        const { userId, jobsId, resume, startDate, endDate, status = "Pending" } = params;

        console.log("Posting user job with parameters:", { userId, jobsId, resume, startDate, endDate, status });

        const response = await axios({
            url: "/userjobs",
            method: "POST",
            data: {
                userId,
                jobsId,
                resume,
                status, // Use the provided status or the default "Pending"
                startDate,
                endDate
            },
        });

        console.log("Response from posting user job:", response.data.data);

        return response.data.data;
    }
);



export const putUserJob = createAsyncThunk(
    "userJobs/putUserJob",
    async (params) => {
        const { userJobsId, userId, jobsId, resume, status } = params;

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

export const getJobsDetails = createAsyncThunk(
    "userJobs/getJobsDetails",
    async () => {
        const response = await axios({
            url: `/userjobs/jobs`,
            method: "GET",
        });

        return response.data;
    }
);

export const getSingleJobDetails = createAsyncThunk(
    "userJobs/getSingleJobDetails",
    async (params) => {
        const { userJobsId } = params;
        const response = await axios({
            url: `/userjobs/job/${userJobsId}`,
            method: "GET",
        });
        return response.data;
    }
);

export const getInterviews = createAsyncThunk(
    "userJobs/getInterviews",
    async () => {
        const response = await axios({
            url: `/userjobs/interviews`,
            method: "GET",
        });

        return response.data;
    }
);

export const selectUserJobs = (state) => state.userJobs.userJobs;
export const selectUserJob = (state) => state.userJobs.userJob;
export const selectApplicants = (state) => state.userJobs.applicants;
export const selectApplicant = (state) => state.userJobs.applicant;
export const selectJobs = (state) => state.userJobs.jobs;
export const selectJob = (state) => state.userJobs.job;
export const selectInterviews = (state) => state.userJobs.interviews;
export const selectCheckUserJobs = (state) => state.userJobs.checkUserJob;
export const selectUserJobsStatus = (state) => state.userJobs.status;

export const {} = userJobsSlice.actions;

export default userJobsSlice.reducer;
