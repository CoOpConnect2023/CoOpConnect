import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    questions: [],
    question: "",
    answers: [],
    responses: [],
    status: {
        questions: "idle",
        postQuestion: "idle",
        putQuestion: "idle",
        patchQuestion: "idle",
        deleteQuestion: "idle",
    },
};

export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Get all questions by job ID (with answers and responses)
            .addCase(getQuestionsWithAnswersAndResponsesByJobId.pending, (state) => {
                state.status.questions = "loading";
            })
            .addCase(getQuestionsWithAnswersAndResponsesByJobId.fulfilled, (state, action) => {
                state.questions = action.payload;
                state.status.questions = "succeeded";
            })
            .addCase(getQuestionsWithAnswersAndResponsesByJobId.rejected, (state) => {
                state.status.questions = "failed";
            })

            // Post a new question with answers
            .addCase(postQuestionWithAnswers.pending, (state) => {
                state.status.postQuestion = "loading";
            })
            .addCase(postQuestionWithAnswers.fulfilled, (state) => {
                state.status.postQuestion = "succeeded";
            })
            .addCase(postQuestionWithAnswers.rejected, (state) => {
                state.status.postQuestion = "failed";
            })

            .addCase(storeResponses.pending, (state) => {
                state.status.storeResponses = "loading";
            })
            .addCase(storeResponses.fulfilled, (state) => {
                state.status.storeResponses = "succeeded";
            })
            .addCase(storeResponses.rejected, (state) => {
                state.status.storeResponses = "failed";
            })

            // Update a question
            .addCase(putQuestion.pending, (state) => {
                state.status.putQuestion = "loading";
            })
            .addCase(putQuestion.fulfilled, (state) => {
                state.status.putQuestion = "succeeded";
            })
            .addCase(putQuestion.rejected, (state) => {
                state.status.putQuestion = "failed";
            })

            // Patch a question
            .addCase(patchQuestion.pending, (state) => {
                state.status.patchQuestion = "loading";
            })
            .addCase(patchQuestion.fulfilled, (state, action) => {
                state.status.patchQuestion = "succeeded";
                const updatedQuestion = action.payload;

                if (state.questions) {
                    state.questions = state.questions.map((question) =>
                        question.id === updatedQuestion.id ? updatedQuestion : question
                    );
                } else {
                    state.questions = action.payload;
                }
            })
            .addCase(patchQuestion.rejected, (state) => {
                state.status.patchQuestion = "failed";
            })

            // Delete a question
            .addCase(deleteQuestion.pending, (state) => {
                state.status.deleteQuestion = "loading";
            })
            .addCase(deleteQuestion.fulfilled, (state) => {
                state.status.deleteQuestion = "succeeded";
            })
            .addCase(deleteQuestion.rejected, (state) => {
                state.status.deleteQuestion = "failed";
            });
    },
});

// Thunk to fetch questions by job ID including their answers and responses
export const getQuestionsWithAnswersAndResponsesByJobId = createAsyncThunk(
    "questions/getQuestionsWithAnswersAndResponsesByJobId",
    async (jobId) => {
        const response = await axios({
            url: `/jobs/${jobId}/questions`,
            method: "GET",
        });
        return response.data;
    }
);

export const storeResponses = createAsyncThunk(
    "responses/storeResponses",
    async (params) => {
        const { jobId, userId, responses } = params;

        // Construct the data payload for storing responses
        const response = await axios({
            url: `/jobs/${jobId}/responses`,
            method: "POST",
            data: {
                user_id: userId,
                responses, // This should be an array of responses with question_id and answer or text
            },
        });

        // Return the response data to the Redux store
        return response.data;
    }
);

export const postQuestionWithAnswers = createAsyncThunk(
    "questions/postQuestionWithAnswers",
    async (params) => {
        const { jobId, questionText, questionType, answers } = params;

        const response = await axios({
            url: `/jobs/${jobId}/questions`,
            method: "POST",
            data: {
                question_text: questionText,
                question_type: questionType,
                answers,
            },
        });

        return response.data;
    }
);

export const putQuestion = createAsyncThunk(
    "questions/putQuestion",
    async (params) => {
        const { questionId, questionText, questionType, answers } = params;

        const response = await axios({
            url: `/questions/${questionId}`,
            method: "PUT",
            data: {
                question_text: questionText,
                question_type: questionType,
                answers,
            },
        });
        return response.data;
    }
);

export const patchQuestion = createAsyncThunk(
    "questions/patchQuestion",
    async (params) => {
        const { questionId, questionText, answers } = params;

        const response = await axios({
            url: `/questions/${questionId}`,
            method: "PATCH",
            data: {
                question_text: questionText,
                answers,
            },
        });
        return response.data;
    }
);

export const deleteQuestion = createAsyncThunk(
    "questions/deleteQuestion",
    async (questionId) => {
        const response = await axios({
            url: `/questions/${questionId}`,
            method: "DELETE",
        });
        return response.data;
    }
);

export const selectQuestions = (state) => state.questions.questions;
export const selectQuestion = (state) => state.questions.question;
export const selectQuestionStatus = (state) => state.questions.status;

export const {} = questionsSlice.actions;

export default questionsSlice.reducer;
