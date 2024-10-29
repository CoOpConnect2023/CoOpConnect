import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    userDocuments: [],
    userDocumentsShared: [],
    userDocument: "",
    status: {
        userDocuments: "idle",
        userDocumentsShared: "idle",
        postUserDocument: "idle",
        putUserDocument: "idle",
        patchUserDocument: "idle",
        deleteUserDocument: "idle",
        checkUserDocument: "idle",
        getUserDetails: "idle",
        getSingleUserDetails: "idle",
        createUserDocumentsFromEmails: "idle",
    },
};

export const userDocumentsSlice = createSlice({
    name: "userDocuments",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getUserDocuments.pending, (state) => {
                state.status.userDocuments = "loading";
            })
            .addCase(getUserDocuments.fulfilled, (state, action) => {
                state.userDocuments = action.payload;
                state.status.userDocuments = "succeeded";
            })
            .addCase(getUserDocuments.rejected, (state) => {
                state.status.userDocuments = "failed";
            })

            .addCase(getDocumentsForUserWithUser.pending, (state) => {
                state.status.userDocuments = "loading";
            })
            .addCase(getDocumentsForUserWithUser.fulfilled, (state, action) => {
                state.userDocuments = action.payload;
                state.status.userDocuments = "succeeded";
            })
            .addCase(getDocumentsForUserWithUser.rejected, (state) => {
                state.status.userDocuments = "failed";
            })

            .addCase(getDocumentsSharedWithUser.pending, (state) => {
                state.status.userDocumentsShared = "loading";
            })
            .addCase(getDocumentsSharedWithUser.fulfilled, (state, action) => {
                state.userDocumentsShared = action.payload;
                state.status.userDocumentsShared = "succeeded";
            })
            .addCase(getDocumentsSharedWithUser.rejected, (state) => {
                state.status.userDocumentsShared = "failed";
            })
            .addCase(getUserDocument.pending, (state) => {
                state.status.userDocuments = "loading";
            })
            .addCase(getUserDocument.fulfilled, (state, action) => {
                state.userDocument = action.payload;
                state.status.userDocuments = "succeeded";
            })
            .addCase(getUserDocument.rejected, (state) => {
                state.status.userDocuments = "failed";
            })
            .addCase(postUserDocument.pending, (state) => {
                state.status.postUserDocument = "loading";
            })
            .addCase(postUserDocument.fulfilled, (state) => {
                state.status.postUserDocument = "succeeded";
            })
            .addCase(postUserDocument.rejected, (state) => {
                state.status.postUserDocument = "failed";
            })
            .addCase(putUserDocument.pending, (state) => {
                state.status.putUserDocument = "loading";
            })
            .addCase(putUserDocument.fulfilled, (state) => {
                state.status.putUserDocument = "succeeded";
            })
            .addCase(putUserDocument.rejected, (state) => {
                state.status.putUserDocument = "failed";
            })
            .addCase(patchUserDocument.pending, (state) => {
                state.status.patchUserDocument = "loading";
            })
            .addCase(patchUserDocument.fulfilled, (state, action) => {
                state.status.patchUserDocument = "succeeded";

                if (state.userDocuments) {
                    state.userDocuments = state.userDocuments.map((userDocument) =>
                        userDocument.id === action.payload.id
                            ? action.payload
                            : userDocument
                    );
                } else {
                    state.userDocuments = action.payload;
                }
            })
            .addCase(patchUserDocument.rejected, (state) => {
                state.status.patchUserDocument = "failed";
            })
            .addCase(deleteUserDocument.pending, (state) => {
                state.status.deleteUserDocument = "loading";
            })
            .addCase(deleteUserDocument.fulfilled, (state) => {
                state.status.deleteUserDocument = "succeeded";
            })
            .addCase(deleteUserDocument.rejected, (state) => {
                state.status.deleteUserDocument = "failed";
            })
            .addCase(createUserDocumentsFromEmails.pending, (state) => {
                state.status.createUserDocumentsFromEmails = "loading";
            })
            .addCase(createUserDocumentsFromEmails.fulfilled, (state, action) => {
                state.status.createUserDocumentsFromEmails = "succeeded";
                // Optionally update the userDocuments state if necessary
            })
            .addCase(createUserDocumentsFromEmails.rejected, (state) => {
                state.status.createUserDocumentsFromEmails = "failed";
            });
    },
});

// Async Thunks for fetching, posting, updating, deleting user documents
export const getUserDocuments = createAsyncThunk(
    "userDocuments/getUserDocuments",
    async () => {
        const response = await axios({
            url: "/userdocuments",
            method: "GET",
        });
        return response.data.data;
    }
);

export const createUserDocumentsFromEmails = createAsyncThunk(
    "userDocuments/createUserDocumentsFromEmails",
    async ({ emailList, selectedDocumentId }) => {
        try {
            const response = await axios({
                url: "/userdocuments/share", // Ensure the route is correct
                method: "POST",
                data: {
                    emails: emailList || [],  // Ensure it sends an empty array if emailList is empty
                    document_id: selectedDocumentId, // The document ID
                },
            });

            return response.data; // Assuming the server returns a confirmation message
        } catch (error) {
            console.error('Error sharing documents:', error.response?.data || error.message);
            throw error;
        }
    }
);


export const getDocumentsForUserWithUser = createAsyncThunk(
    "userDocuments/getDocumentsForUserWithUser",
    async ({ documentID }) => {
        const response = await axios({
            url: `/userdocuments/shared-documents/${documentID}`, // Pass documentID dynamically
            method: "GET",
        });

        return response.data.documents;
    }
);

export const getDocumentsSharedWithUser = createAsyncThunk(
    "userDocuments/getDocumentsSharedWithUser",
    async ({ userId }) => {
        const response = await axios({
            url: `/userdocuments/shared-documents-with-me/${userId}`, // Pass documentID dynamically
            method: "GET",
        });
console.log(response.data.documents)
        return response.data.documents;
    }
);


export const getUserDocument = createAsyncThunk(
    "userDocuments/getUserDocument",
    async (params) => {
        const { userDocumentId } = params;
        const response = await axios({
            url: `/userdocuments/${userDocumentId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const postUserDocument = createAsyncThunk(
    "userDocuments/postUserDocument",
    async (params) => {
        const { userId, title, path, type, visible } = params;

        const response = await axios({
            url: "/userdocuments",
            method: "POST",
            data: {
                userId,
                title,
                path,
                type,
                visible,
            },
        });
        return response.data.data;
    }
);

export const putUserDocument = createAsyncThunk(
    "userDocuments/putUserDocument",
    async (params) => {
        const { userDocumentId, userId, title, path, type, visible } = params;

        const response = await axios({
            url: `/userdocuments/${userDocumentId}`,
            method: "PUT",
            data: {
                userId,
                title,
                path,
                type,
                visible,
            },
        });
        return response.data.data;
    }
);

export const patchUserDocument = createAsyncThunk(
    "userDocuments/patchUserDocument",
    async (params) => {
        const { userDocumentId, title, visible } = params;

        const response = await axios({
            url: `/userdocuments/${userDocumentId}`,
            method: "PATCH",
            data: {
                title,
                visible,
            },
        });
        return response.data.data;
    }
);

export const deleteUserDocument = createAsyncThunk(
    "userDocuments/deleteUserDocument",
    async (params) => {
        const { userDocumentId } = params;
        const response = await axios({
            url: `/userdocuments/${userDocumentId}`,
            method: "DELETE",
        });
        return response.data.data;
    }
);

// Selectors
export const selectUserDocuments = (state) => state.userDocuments.userDocuments;
export const selectSharedUserDocuments = (state) => state.userDocuments.userDocumentsShared;
export const selectUserDocument = (state) => state.userDocuments.userDocument;

export default userDocumentsSlice.reducer;
