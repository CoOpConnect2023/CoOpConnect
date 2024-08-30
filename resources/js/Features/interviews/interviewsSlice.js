import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    interviews: [],
    postInterview: [],
    status: {
        interviews: "idle",
        postInterview: "idle",
        putInterview: "idle",
        patchInterview: "idle",
        deleteInterview: "idle",
    },
};

export const interviewsSlice = createSlice({
    name: "interviews",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getInterviews.pending, (state, action) => {
                state.status.interviews = "loading";
            })
            .addCase(getInterviews.fulfilled, (state, action) => {
                state.interviews = action.payload;
                state.status.interviews = "succeeded";
            })
            .addCase(getInterviews.rejected, (state, action) => {
                state.status.interviews = "failed";
            })
            .addCase(selectInterview.pending, (state, action) => {
                state.status.interviews = "loading";
            })
            .addCase(selectInterview.fulfilled, (state, action) => {
                state.interviews = action.payload;
                state.status.interviews = "succeeded";
            })
            .addCase(selectInterview.rejected, (state, action) => {
                state.status.interviews = "failed";
            })
            .addCase(getInterviewsForInterviewee.pending, (state, action) => {
                state.status.interviews = "loading";
            })
            .addCase(getInterviewsForInterviewee.fulfilled, (state, action) => {
                state.interviews = action.payload;
                state.status.interviews = "succeeded";
            })
            .addCase(getInterviewsForInterviewee.rejected, (state, action) => {
                state.status.interviews = "failed";
            })
            .addCase(getInterviewsForInterviewer.pending, (state, action) => {
                state.status.interviews = "loading";
            })
            .addCase(getInterviewsForInterviewer.fulfilled, (state, action) => {
                state.interviews = action.payload;
                state.status.interviews = "succeeded";
            })
            .addCase(getInterviewsForInterviewer.rejected, (state, action) => {
                state.status.interviews = "failed";
            })
            .addCase(postInterview.pending, (state, action) => {
                state.status.postInterview = "loading";
            })
            .addCase(postInterview.fulfilled, (state, action) => {
                state.postInterview = action.payload;
                state.status.postInterview = "succeeded";

            })
            .addCase(postInterview.rejected, (state, action) => {
                state.status.postInterview = "failed";
            })
            .addCase(putInterview.pending, (state, action) => {
                state.status.putInterview = "loading";
            })
            .addCase(putInterview.fulfilled, (state, action) => {
                state.status.putInterview = "succeeded";
            })
            .addCase(putInterview.rejected, (state, action) => {
                state.status.putInterview = "failed";
            })
            .addCase(patchInterview.pending, (state, action) => {
                state.status.patchInterview = "loading";
            })
            .addCase(patchInterview.fulfilled, (state, action) => {
                state.status.patchInterview = "succeeded";
            })
            .addCase(patchInterview.rejected, (state, action) => {
                state.status.patchInterview = "failed";
            })
            .addCase(deleteInterview.pending, (state, action) => {
                state.status.deleteInterview = "loading";
            })
            .addCase(deleteInterview.fulfilled, (state, action) => {
                state.status.deleteInterview = "succeeded";
            })
            .addCase(deleteInterview.rejected, (state, action) => {
                state.status.deleteInterview = "failed";
            });
    },
});

export const getInterviews = createAsyncThunk(
    "interviews/getInterviews",
    async () => {
        const response = await axios({
            url: "/interviews",
            method: "GET",
        });
        return response.data.data;
    }
);

export const selectInterview = createAsyncThunk(
    "interviews/selectInterview",
    async (params) => {
        const { interviewId } = params;
        const response = await axios({
            url: `/interviews/${interviewId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getInterviewsForInterviewee = createAsyncThunk(
    "interviews/getInterviewsForInterviewee",
    async (params) => {
        const { intervieweeId } = params;

        const response = await axios({
            url: `/interviews?intervieweeId[eq]=${intervieweeId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getInterviewsForInterviewer = createAsyncThunk(
    "interviews/getInterviewsForInterviewer",
    async (params) => {
        const { interviewerId } = params;

        const response = await axios({
            url: `/interviews?interviewerId[eq]=${interviewerId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const postInterview = createAsyncThunk(
    "interviews/postInterview",
    async (params) => {

        const {
            title,
            startDate,
            endDate,
            status,
            description,
            intervieweeId,
            interviewerId,
        } = params;
        const response = await axios({
            url: "/interviews",
            method: "POST",
            data: {
                title,
                startDate,
                endDate,
                status,
                description,
                intervieweeId,
                interviewerId,
            },
        });

        return response.data.data;
    }
);

export const putInterview = createAsyncThunk(
    "interviews/putInterview",
    async (params) => {
        const {
            interviewId,
            title,
            startDate,
            endDate,
            status,
            description,
            intervieweeId,
            interviewerId,
        } = params;
        const response = await axios({
            url: `/interviews/${interviewId}`,
            method: "PUT",
            data: {
                title,
                startDate,
                endDate,
                status,
                description,
                intervieweeId,
                interviewerId,
            },
        });
        return response.data.data;
    }
);

export const patchInterview = createAsyncThunk(
    "interviews/patchInterview",
    async (params) => {
        const {
            interviewId,
            title,
            startDate,
            endDate,
            status,
            description,
            intervieweeId,
            interviewerId,
        } = params;
        const response = await axios({
            url: `/interviews/${interviewId}`,
            method: "PATCH",
            data: {
                title,
                startDate,
                endDate,
                status,
                description,
                intervieweeId,
                interviewerId,
            },
        });
        return response.data.data;
    }
);

export const deleteInterview = createAsyncThunk(
    "interviews/deleteInterview",
    async (params) => {
        const { interviewId } = params;
        const response = await axios({
            url: `/interviews/${interviewId}`,
            method: "DELETE",
            data: { interviewId },
        });
        return response.data.data;
    }
);


export const sendInterviewTimeChanged = createAsyncThunk(
    "interviews/sendInterviewTimeChanged",
    async (params) => {
        const {
            studentId,
            jobTitle,
            newTime,
        } = params;

        const response = await axios({
            url: "/send-interview-time-changed",
            method: "POST",
            data: {
                student_id: studentId,
                job_title: jobTitle,
                new_time: newTime,
            },
        });

        return response.data.message;
    }
);




export const selectInterviews = (state) => state.interviews;

export const selectInterviewsStatus = (state) =>
    state.interviews.status;
// Action creators are generated for each case reducer function
export const {} = interviewsSlice.actions;

export default interviewsSlice.reducer;
