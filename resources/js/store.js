import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./Features/jobs/jobsSlice";
import coursesReducer from "./Features/courses/coursesSlice";
import interviewsReducer from "./Features/interviews/interviewsSlice";
import reflectionsReducer from "./Features/reflections/reflectionsSlice";
import usersReducer from "./Features/users/userSlice";
import messagesReducer from "./Features/messages/messagesSlice";
import shortlistsReducer from "./Features/shortlists/shortlistsSlice";
import schoolsReducer from "./Features/schools/schoolsSlice";
import userJobsReducer from "./Features/userJobs/userJobsSlice";
import accessibilityReducer from "./Features/accessibility/accessibilitySlice";
import notificationsReducer from "./Features/notifications/notificationsSlice";
import companiesReducer from "./Features/companies/companySlice"
import userDocumentsReducer from "./Features/userdocumentsSlice/userDocumentsSlice";
import documentsReducer from "./Features/documents/documentsSlice";
import questionsReducer from "./Features/questions/questionsSlice";

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        courses: coursesReducer,
        interviews: interviewsReducer,
        reflections: reflectionsReducer,
        user: usersReducer,
        messages: messagesReducer,
        shortlists: shortlistsReducer,
        schools: schoolsReducer,
        userJobs: userJobsReducer,
        accessibility: accessibilityReducer,
        notifications: notificationsReducer,
        companies: companiesReducer,
        userDocuments: userDocumentsReducer,
        documents: documentsReducer,
        questions: questionsReducer,

    },
});

export default store;
