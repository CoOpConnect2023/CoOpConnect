import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";
const appUrl = import.meta.env.VITE_APP_URL;

const initialState = {
    schools: null,
    percentages: null,
    schoolslist: null,
    courses: null,
    status: {
        schools: "idle",
        percentages: "idle",
        schools: "idle",
        courses: "idle",
    },
};

export const getStudents = createAsyncThunk(
    "students/getStudents",
    async (userID) => {
        const response = await axios({
            url: `http://127.0.0.1:8000/api/students/teacher/${userID}`,
            method: "GET",
        });

        return response.data.students;
    }
);

export const getSchools = createAsyncThunk(
    "schools/getSchools",
    async () => {
        const response = await axios({
            url: `/schools`,
            method: "GET",
        });
console.log(response.data)
        return response.data.data;
    }
);

export const getPercentages = createAsyncThunk(
    "percentages/getPercentages",
    async (userID) => {
        const response = await axios({
            url: `http://127.0.0.1:8000/api/students/teacher/${userID}`,
            method: "GET",
        });

        return response.data.percentages;
    }
);

export const getCourses = createAsyncThunk(
    "courses/getCourses",
    async (userID) => {
        try {
            const response = await axios.get(`/courses/teacher/${userID}`);
            console.log(response.data); // Log the response data for debugging
            return response.data.data; // Assuming response data structure has a 'courses' property
        } catch (error) {
            console.error("Error fetching courses:", error);
            throw error; // Propagate the error
        }
    }
);

export const deleteStudent = createAsyncThunk(
    "students/deleteStudent",
    async (studentId) => {
      await axios.delete(`http://127.0.0.1:8000/api/v1/usercourses/student/${studentId}`);
      return studentId; // Return studentId to update state
    }
  );

  export const createStudent = createAsyncThunk(
    "students/createStudent",
    async (newStudentData) => {
        try {
            const { id, courses } = newStudentData;
            const courseId = courses.length > 0 ? courses[0].id : null;

            // Send the POST request
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/usercourses`, {
                userId: id,
                coursesId: courseId
            });

            return response.data;
        } catch (error) {
            console.error("Error creating student:", error);
            throw error;
        }
    }
);

export const createClass = createAsyncThunk(
    "classes/createClass",
    async ({ newClass, user }) => {
        const response = await axios.post(`/courses`, {
            ...newClass,
            teacher_id: user.id,
            school_id: user.school_id,
        });
        return response.data;
    }
);

export const editClass = createAsyncThunk(
    "classes/editClass",
    async ({ classId, editedClassData, user }) => {
        const response = await axios.put(`/courses/${classId}`, {
            ...editedClassData,
            teacher_id: user.id,
            school_id: user.school_id,
        });
        return response.data;
    }
);

export const deleteClass = createAsyncThunk(
    "classes/deleteClass",
    async (classId) => {
        await axios.delete(`/courses/${classId}`);
        return classId;
    }
);



export const schoolsSlice = createSlice({
    name: "schools",
    initialState,
    reducers: {
        deleteStudentById(state, action) {
            const studentId = action.payload;
            state.students = state.students.filter((std) => std.id !== studentId);
          },

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
            })

            .addCase(getSchools.pending, (state, action) => {
                state.status.schoolslist = "loading";
            })
            .addCase(getSchools.fulfilled, (state, action) => {
                state.schoolslist = action.payload;
                state.status.schoolslist = "succeeded";
            })
            .addCase(getSchools.rejected, (state, action) => {
                state.status.schoolslist = "failed";
            })

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

            .addCase(createClass.pending, (state, action) => {
                state.status.courses = "loading";
            })
            .addCase(createClass.fulfilled, (state, action) => {
                state.courses.push(action.payload);
                state.status.courses = "succeeded";
            })
            .addCase(createClass.rejected, (state, action) => {
                state.status.courses = "failed";
            })
            .addCase(editClass.pending, (state, action) => {
                state.status.courses = "loading";
            })
            .addCase(editClass.fulfilled, (state, action) => {
                state.courses = state.courses.map((cls) =>
                    cls.id === action.payload.id ? action.payload : cls
                );
                state.status.courses = "succeeded";
            })
            .addCase(editClass.rejected, (state, action) => {
                state.status.courses = "failed";
            })
            .addCase(deleteClass.pending, (state, action) => {
                state.status.courses = "loading";
            })
            .addCase(deleteClass.fulfilled, (state, action) => {
                state.courses = state.courses.filter((cls) => cls.id !== action.payload);
                state.status.courses = "succeeded";
            })
            .addCase(deleteClass.rejected, (state, action) => {
                state.status.courses = "failed";
            });
        }
    });



export const selectStudents = (state) => state.schools.students;
export const selectStudentsStatus = (state) => state.students.status;
export const selectPercentages = (state) => state.schools.percentages;
export const selectPercentagesStatus = (state) => state.percentages.status;
export const selectSchoolslist = (state) => state.schools.schoolslist;
export const selectSchoolslistStatus = (state) => state.schoolslist.status;
export const selectCourses = (state) => state.schools.courses;
export const selectCoursesStatus = (state) => state.courses.status;

export default schoolsSlice.reducer;

