import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./Features/jobs/jobsSlice";
import coursesReducer from "./Features/courses/coursesSlice";
import interviewsReducer from "./Features/interviews/interviewsSlice";
import reflectionsReducer from "./Features/reflections/reflectionsSlice";
import usersReducer from "./Features/users/userSlice";
import messagesReducer from "./Features/messages/messagesSlice";


export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        courses: coursesReducer,
        interviews: interviewsReducer,
        reflections: reflectionsReducer,
        user: usersReducer,
        messages: messagesReducer,
    },
});

export default store;
