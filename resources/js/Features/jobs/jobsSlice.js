import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    jobs: [],
    allUserJobs: [],
    job: "",
    jobFormData: {
        jobsId: "",
        title: "",
        description: "",
        location: "",
        postingStatus: "Open",
        jobType: "Onsite",
        company_id: "",
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
            .addCase(getAllJobsForEmployer.pending, (state, action) => {
                state.status.allUserJobs = "loading";
            })
            .addCase(getAllJobsForEmployer.fulfilled, (state, action) => {
                state.allUserJobs = action.payload;
                state.status.jobs = "succeeded";
            })
            .addCase(getAllJobsForEmployer.rejected, (state, action) => {
                state.status.allUserJobs = "failed";
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
                state.jobs = state.jobs.filter((job) => job.id !== action.payload);

              })
            .addCase(deleteJob.rejected, (state, action) => {
                state.status.deleteJob = "failed";
            })

            .addCase(deleteAJob.pending, (state, action) => {
                state.status.deleteAJob = "loading";
            })
            .addCase(deleteAJob.fulfilled, (state, action) => {
                state.jobs = state.jobs.filter((job) => job.id !== action.payload);
                state.status.jobs = "succeeded";

              })
            .addCase(deleteAJob.rejected, (state, action) => {
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


export const getAllJobsForEmployer = createAsyncThunk(
    "jobs/getAllJobsForEmployer",
    async ({ jobIds }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/user-jobs`, {
                params: {
                    job_ids: jobIds, // Pass jobIds directly as an array
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
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



        return response.data.data;
    }
);

export const searchJobsBySkillAndLocation = createAsyncThunk(
    "jobs/searchJobsBySkillAndLocation",
    async (params) => {
        const { searchTerm, location } = params;

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

export const postJob = createAsyncThunk(
    'jobs/postJob',
    async (params, { rejectWithValue }) => {
      try {
        const {
          title,
          description,
          skills,
          location,
          postingStatus,
          jobType,
          company_id,
          userId,
          startDate,
          endDate
        } = params;

        console.log('Posting job with the following data:', {
            title,
            description,
            skills,
            location,
            postingStatus,
            jobType,
            company_id,
            userId,
            startDate,
            endDate
          });

        const response = await axios({
          url: '/jobs',
          method: 'POST',
          data: {
            title,
            description,
            skills,
            location,
            postingStatus,
            jobType,
            company_id,
            userId,
            startDate,
            endDate,
          },
        });
        return response.data.data;
      } catch (err) {
        // If there's an error, reject the value with error details
        if (err.response) {
          // Server responded with a status other than 2xx
          return rejectWithValue(err.response.data);
        } else if (err.request) {
          // Request was made but no response received
          return rejectWithValue('No response from server. Please try again.');
        } else {
          // Something else happened while setting up the request
          return rejectWithValue(err.message);
        }
      }
    }
  );


  export const postJobWithQuestions = createAsyncThunk(
    "jobs/postJobWithQuestions",
    async (params, { rejectWithValue }) => {
      try {
        const {
          title,
          description,
          location,
          postingStatus,
          jobType,
          company_id,
          questions, // This should include the questions and answers array
          startDate,
          endDate,
          skills
        } = params;

        console.log("Posting job and questions with the following data:", {
          title,
          description,
          location,
          postingStatus,
          jobType,
          company_id,
          questions,
          startDate,
          endDate,
          questions,
          skills
        });

        // Perform the API request
        const response = await axios({
          url: "/jobs/jobwithquestions", // Assuming this is the endpoint for posting jobs with questions
          method: "POST",
          data: {
            title,
            description,
            location,
            postingStatus,
            jobType,
            company_id,
            startDate,
            endDate,
            questions,
            skills,
          },
        });

        // Return the response data
        return response.data.data;
      } catch (err) {
        // Handle errors and reject the value with the error message
        if (err.response) {
          // Server responded with a status other than 2xx
          return rejectWithValue(err.response);
        } else if (err.request) {
          // Request was made but no response received
          return rejectWithValue("No response from server. Please try again.");
        } else {
          // Something else happened while setting up the request
          return rejectWithValue(err.message);
        }
      }
    }
  );


  export const patchJobWithQuestions = createAsyncThunk(
    "jobs/patchJobWithQuestions",
    async (params, { rejectWithValue }) => {
      try {
        const {
          jobsId, // Include the jobId to update the correct job
          title,
          description,
          location,
          postingStatus,
          jobType,
          company_id,
          questions, // Include the questions and answers array
          startDate,
          endDate,
          skills
        } = params;

        console.log("Updating job and questions with the following data:", {
          jobsId,
          title,
          description,
          location,
          postingStatus,
          jobType,
          company_id,
          questions,
          startDate,
          endDate,
          skills,
        });

        // Perform the API request
        const response = await axios({
          url: `/jobs/${jobsId}/jobwithquestions`, // PATCH endpoint for updating jobs with questions
          method: "PATCH",
          data: {
            title,
            description,
            location,
            postingStatus,
            jobType,
            company_id,
            startDate,
            endDate,
            skills,
            questions, // Send the questions along with the job data
          },
        });

        return response.data.data;
      } catch (err) {
        // Handle errors and reject the value with the error message
        if (err.response) {
          // Server responded with a status other than 2xx
          return rejectWithValue(err.response);
        } else if (err.request) {
          // Request was made but no response received
          return rejectWithValue("No response from server. Please try again.");
        } else {
          // Something else happened while setting up the request
          return rejectWithValue(err.message);
        }
      }
    }
  );


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
        companyId,
        startDate,
        endDate
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
            companyId,
            startDate,
            endDate
        },
    });

    // Log the request data being sent in the PATCH request
    console.log("Data sent in PATCH request:", {
        jobsId,
        title,
        description,
        skills,
        location,
        postingStatus,
        jobType,
        companyId,
        startDate,
        endDate
    });

    // Log the response from the server


    return response.data.data;
});


export const deleteJob = createAsyncThunk("jobs/deleteJob", async (params) => {
    const { jobId } = params;
    const response = await axios({
        url: `/jobs/${jobId}`,
        method: "DELETE",
    });

    return userId;
});

export const deleteAJob = createAsyncThunk("jobs/deleteAJob", async (params) => {
    const { jobId } = params;
    const response = await axios({
        url: `/jobs/${jobId}`,
        method: "DELETE",
    });

    return jobId;
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
export const selectAllUserJobs = (state) => state.jobs.allUserJobs;
export const selectSingleJob = (state) => state.jobs.job;
export const selectJobsStatus = (state) => state.jobs.status.jobs;
// Action creators are generated for each case reducer function
export const { updateJobFormData, resetJobFormData } = jobsSlice.actions;
export const selectJobFormData = (state) => state.jobs.jobFormData;

export default jobsSlice.reducer;
