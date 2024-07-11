import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const appUrl = import.meta.env.VITE_APP_URL;

const initialState = {
    schools: null,
    percentages: null,
    status: {
        schools: "idle",
        percentages: "idle",
    },
};

export const getStudents = createAsyncThunk(
    "students/getStudents",
    async (userID) => {
        const response = await axios({
            url: `http://127.0.0.1:8000/api/students/teacher/${userID}`,
            method: "GET",
        });
        console.log(response.data);
        return response.data.students;
    }
);

export const getPercentages = createAsyncThunk(
    "percentages/getPercentages",
    async (userID) => {
        const response = await axios({
            url: `http://127.0.0.1:8000/api/students/teacher/${userID}`,
            method: "GET",
        });
        console.log(response.data);
        return response.data.percentages;
    }
);



export const schoolsSlice = createSlice({
    name: "schools",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getStudents.pending, (state, action) => {
                state.status.students = "loading";
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.students = action.payload; // Corrected to 'students'
                state.status.students = "succeeded";
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.status.students = "failed";
            })

            .addCase(getPercentages.pending, (state, action) => {
                state.status.percentages = "loading";
            })
            .addCase(getPercentages.fulfilled, (state, action) => {
                state.percentages = action.payload;
                state.status.percentages = "succeeded";
            })
            .addCase(getPercentages.rejected, (state, action) => {
                state.status.percentages = "failed";
            });
        }
    });



export const selectStudents = (state) => state.schools.students;
export const selectStudentsStatus = (state) => state.students.status;
export const selectPercentages = (state) => state.schools.percentages;
export const selectPercentagesStatus = (state) => state.percentages.status;

export default schoolsSlice.reducer;

