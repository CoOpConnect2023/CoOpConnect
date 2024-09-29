import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    schools: null,
    percentages: null,
    schoolslist: null,
    courses: null,
    coursesStudents: null,
    employers: [],
    status: {
        schools: "idle",
        percentages: "idle",
        schools: "idle",
        courses: "idle",
        employers: "idle",
    },
};

export const getStudents = createAsyncThunk(
    "students/getStudents",
    async (userID) => {
        const response = await axios({
            url: `${appUrl}/api/students/teacher/${userID}`,
            method: "GET",
        });

        return response.data.students;
    }
);




export const getEmployers = createAsyncThunk(
    "employers/getEmployers",
    async (teacherID) => {
        try {
            const response = await axios.get(`/teacheremployers/${teacherID}`);
            console.log(response.data);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching employers:", error);
            throw error;
        }
    }
);

export const createEmployer = createAsyncThunk(
    "employers/createEmployer",
    async ({ teacher_id, employer_email, employer_name = null, company_name }, { rejectWithValue }) => {
      try {
        const payload = {
          teacher_id,
          employer_email,
          ...(employer_name && { employer_name }),
          ...(company_name && { company_name }),
        };

        console.log("Payload being sent to the server:", payload);

        const response = await axios.post(`/teacheremployers`, payload);

        console.log("Response received:", response.data);

        // Return the attached array which contains the created employer details
        return response.data.attached; // Use attached array from the response
      } catch (error) {
        if (error.response && error.response.data) {
          console.error("Error response from server:", error.response.data);
          return rejectWithValue(error.response.data.message);
        }
        console.error("Network or other error:", error.message);
        return rejectWithValue(error.message);
      }
    }
  );





  export const deleteEmployer = createAsyncThunk(
    "employers/deleteEmployer",
    async ({ teacherID, employerID }) => {
        try {
            await axios.delete(`/teacheremployers/${teacherID}/${employerID}`);
            return employerID;
        } catch (error) {
            console.error("Error deleting employer:", error);
            throw error;
        }
    }
);

export const getSchools = createAsyncThunk(
    "schools/getSchools",
    async () => {
        const response = await axios({
            url: `/schools`,
            method: "GET",
        });

        return response.data.data;
    }
);

export const getPercentages = createAsyncThunk(
    "percentages/getPercentages",
    async (userID) => {
        const response = await axios({
            url: `${appUrl}/api/students/teacher/${userID}`,
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

            return response.data.data;
        } catch (error) {
            console.error("Error fetching courses:", error);
            throw error;
        }
    }
);

export const getCoursesStudents = createAsyncThunk(
    "courses/getCoursesStudents",
    async (userID) => {
        try {
            const response = await axios.get(`/courses/teacher/${userID}`);

            return response.data;
        } catch (error) {
            console.error("Error fetching courses:", error);
            throw error;
        }
    }
);

export const deleteStudent = createAsyncThunk(
    "students/deleteStudent",
    async (studentId) => {
      await axios.delete(`/usercourses/student/${studentId}`);
      return studentId; // Return studentId to update state
    }
  );

  export const deleteSchool = createAsyncThunk(
    "schools/deleteSchool",
    async (schoolId) => {
        await axios.delete(`/schools/${schoolId}`);
        return schoolId;
    }
)

  export const createStudent = createAsyncThunk(
    "students/createStudent",
    async (newStudentData) => {
        try {
            const { id, courses } = newStudentData;
            const courseId = courses.length > 0 ? courses[0].id : null;

            // Send the POST request
            const response = await axios.post(`/usercourses`, {
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

export const editSchool = createAsyncThunk(
    "schools/editSchool",
    async ({ schoolId, editedSchoolData }) => {
        // Filter out undefined values from editedSchoolData
        const filteredData = Object.fromEntries(
            Object.entries(editedSchoolData).filter(([key, value]) => value !== undefined)
        );

        const response = await axios.put(`/schools/${schoolId}`, {
            ...filteredData,
        });

        return response.data.data;
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

            .addCase(getCoursesStudents.pending, (state, action) => {
                state.status.courses = "loading";
            })
            .addCase(getCoursesStudents.fulfilled, (state, action) => {
                state.coursesStudents = action.payload;
                state.status.courses = "succeeded";
            })
            .addCase(getCoursesStudents.rejected, (state, action) => {
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
            })

            .addCase(deleteSchool.pending, (state, action) => {
                state.status.schools = "loading";
            })
            .addCase(deleteSchool.fulfilled, (state, action) => {
                state.schoolslist = state.schoolslist.filter((school) => school.id !== action.payload);
                state.status.schools = "succeeded";
            })
            .addCase(deleteSchool.rejected, (state, action) => {
                state.status.schools = "failed";
            })

            .addCase(editSchool.pending, (state, action) => {
                state.status.schools = "loading";
            })
            .addCase(editSchool.fulfilled, (state, action) => {
                state.schoolslist = state.schoolslist.map((school) =>
                    school.id === action.payload.id ? action.payload : school
                );
                state.status.schools = "succeeded";
            })
            .addCase(editSchool.rejected, (state, action) => {
                state.status.schools = "failed";
            })
            .addCase(getEmployers.pending, (state) => {
                state.status.employers = "loading";
              })
              .addCase(getEmployers.fulfilled, (state, action) => {
                state.employers = action.payload;
                state.status.employers = "succeeded";
              })
              .addCase(getEmployers.rejected, (state) => {
                state.status.employers = "failed";
              })
              .addCase(createEmployer.pending, (state, action) => {
                state.status.employers = "loading";
            })
            .addCase(createEmployer.fulfilled, (state, action) => {
                state.employers = [...state.employers, action.payload];
                state.status.employers = "succeeded";
            })
            .addCase(createEmployer.rejected, (state, action) => {
                state.status.employers = "failed";
            })
              .addCase(deleteEmployer.pending, (state) => {
                state.status.employers = "loading";
            })
            .addCase(deleteEmployer.fulfilled, (state, action) => {

                state.employers = state.employers.filter(
                    (employer) => employer.id !== action.payload
                );
                state.status.employers = "succeeded";
            })
            .addCase(deleteEmployer.rejected, (state) => {
                state.status.employers = "failed";
            });
        }
    });



export const selectStudents = (state) => state.schools.students;
export const selectStudentsStatus = (state) => state.students.status;
export const selectEmployers = (state) => state.schools.employers;
export const selectEmployersStatus = (state) => state.schools.status.employers;
export const selectPercentages = (state) => state.schools.percentages;
export const selectPercentagesStatus = (state) => state.percentages.status;
export const selectSchoolslist = (state) => state.schools.schoolslist;
export const selectSchoolslistStatus = (state) => state.schoolslist.status;
export const selectCourses = (state) => state.schools.courses;
export const selectCoursesStudents = (state) => state.schools.coursesStudents;
export const selectCoursesStatus = (state) => state.courses.status;

export default schoolsSlice.reducer;

