import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    courses: [],
    status: {
        courses: "idle",
        postCourse: "idle",
        putCourse: "idle",
        patchCourse: "idle",
        deleteCourse: "idle",
    },
};

export const coursesSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getCourses.pending, (state, action) => {
                state.status.courses = "loading";
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.courses = action.payload;
                state.status.courses = "succeeded";
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.status.courses = "failed";
            })
            .addCase(selectCourse.pending, (state, action) => {
                state.status.courses = "loading";
            })
            .addCase(selectCourse.fulfilled, (state, action) => {
                state.courses = action.payload;
                state.status.courses = "succeeded";
            })
            .addCase(selectCourse.rejected, (state, action) => {
                state.status.courses = "failed";
            })
            .addCase(getCoursesForUser.pending, (state, action) => {
                state.status.courses = "loading";
            })
            .addCase(getCoursesForUser.fulfilled, (state, action) => {
                state.courses = action.payload;
                state.status.courses = "succeeded";
            })
            .addCase(getCoursesForUser.rejected, (state, action) => {
                state.status.courses = "failed";
            })
            .addCase(postCourse.pending, (state, action) => {
                state.status.postCourse = "loading";
            })
            .addCase(postCourse.fulfilled, (state, action) => {
                state.status.postCourse = "succeeded";
            })
            .addCase(postCourse.rejected, (state, action) => {
                state.status.postCourse = "failed";
            })
            .addCase(putCourse.pending, (state, action) => {
                state.status.putCourse = "loading";
            })
            .addCase(putCourse.fulfilled, (state, action) => {
                state.courses = state.courses.map((course) =>
                course.id  === action.payload.id ? action.payload : course)
                state.status.putCourse = "succeeded";
            })


            .addCase(putCourse.rejected, (state, action) => {
                state.status.putCourse = "failed";
            })
            .addCase(patchCourse.pending, (state, action) => {
                state.status.patchCourse = "loading";
            })
            .addCase(patchCourse.fulfilled, (state, action) => {
                state.status.patchCourse = "succeeded";
            })
            .addCase(patchCourse.rejected, (state, action) => {
                state.status.patchCourse = "failed";
            })
            .addCase(deleteCourse.pending, (state, action) => {
                state.status.deleteCourse = "loading";
            })


            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.courses = state.courses.filter((course) => course.id !== action.payload);
                state.status.courses = "succeeded";
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.status.deleteCourse = "failed";
            });
    },
});

export const getCourses = createAsyncThunk("courses/getCourses", async () => {
    const response = await axios({
        url: "/courses",
        method: "GET",
    });
    return response.data.data;
});

export const selectCourse = createAsyncThunk(
    "courses/selectCourse",
    async (params) => {
        const { courseId } = params;
        const response = await axios({
            url: `/courses/${courseId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const getCoursesForUser = createAsyncThunk(
    "courses/getCoursesForUser",
    async (params) => {
        const { userId } = params;
        const response = await axios({
            url: `/courses/user/${userId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const postCourse = createAsyncThunk(
    "courses/postCourse",
    async (params) => {
        const { name, startDate, endDate, teacherId,
            schoolId, } = params;
        const response = await axios({
            url: "/courses",
            method: "POST",
            data: {
                name,
                startDate,
                endDate,
                teacherId,
                schoolId,
            },
        });
        return response.data.data;
    }
);

export const putCourse = createAsyncThunk(
    "courses/putCourse",
    async (params) => {
        const { courseId, name, startDate, endDate, schoolID, teacherID } = params;
        const response = await axios({
            url: `/courses/${courseId}`,
            method: "PUT",
            data: {
                name,
                start_date: startDate,
                end_date: endDate,
                teacher_id: teacherID,
                school_id: schoolID
            },
        });

        return response.data.data;
    }
);

export const patchCourse = createAsyncThunk(
    "courses/patchCourse",
    async (params) => {
        const { courseId, name, startDate, endDate } = params;
        const response = await axios({
            url: `/courses/${courseId}`,
            method: "PATCH",
            data: {
                name,
                startDate,
                endDate,
            },
        });
        return response.data.data;
    }
);




export const deleteCourse = createAsyncThunk(
    "courses/deleteCourse",
    async (schoolId) => {
        await axios.delete(`/courses/${schoolId}`);
        return schoolId;
    }
)

export const selectCourses = (state) => state.courses.courses;
export const selectCoursesStatus = (state) => state.courses.status.courses;
// Action creators are generated for each case reducer function
export const {} = coursesSlice.actions;

export default coursesSlice.reducer;
