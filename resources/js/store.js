import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./Features/jobs/jobsSlice";
import coursesReducer from "./Features/courses/coursesSlice";
import interviewsReducer from "./Features/interviews/interviewsSlice";
import reflectionsReducer from "./Features/reflections/reflectionsSlice";

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        courses: coursesReducer,
        interviews: interviewsReducer,
        reflections: reflectionsReducer,
    },
});

export default store;
