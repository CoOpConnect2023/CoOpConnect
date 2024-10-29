import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    documents: [],
    document: "",
    status: {
        documents: "idle",
        postDocument: "idle",
        putDocument: "idle",
        patchDocument: "idle",
        deleteDocument: "idle",
        getDocumentDetails: "idle",
        getSingleDocumentDetails: "idle",
    },
};

export const documentsSlice = createSlice({
    name: "documents",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getDocuments.pending, (state) => {
                state.status.documents = "loading";
            })
            .addCase(getDocuments.fulfilled, (state, action) => {
                state.documents = action.payload;
                state.status.documents = "succeeded";
            })
            .addCase(getDocuments.rejected, (state) => {
                state.status.documents = "failed";
            })

            .addCase(getAllUserDocuments.pending, (state) => {
                state.status.documents = "loading";
            })
            .addCase(getAllUserDocuments.fulfilled, (state, action) => {
                state.documents = action.payload;
                state.status.documents = "succeeded";
            })
            .addCase(getAllUserDocuments.rejected, (state) => {
                state.status.documents = "failed";
            })
            .addCase(getUserDocuments.pending, (state) => {
                state.status.documents = "loading";
            })
            .addCase(getUserDocuments.fulfilled, (state, action) => {
                state.documents = action.payload;
                state.status.documents = "succeeded";
            })
            .addCase(getUserDocuments.rejected, (state) => {
                state.status.documents = "failed";
            })
            .addCase(getDocument.pending, (state) => {
                state.status.documents = "loading";
            })
            .addCase(getDocument.fulfilled, (state, action) => {
                state.document = action.payload;
                state.status.documents = "succeeded";
            })
            .addCase(getDocument.rejected, (state) => {
                state.status.documents = "failed";
            })
            .addCase(postDocument.pending, (state) => {
                state.status.postDocument = "loading";
            })
            .addCase(postDocument.fulfilled, (state) => {
                state.status.postDocument = "succeeded";
            })
            .addCase(postDocument.rejected, (state) => {
                state.status.postDocument = "failed";
            })
            .addCase(uploadDocuments.pending, (state) => {
                state.status.uploadDocuments = 'loading';
            })
            .addCase(uploadDocuments.fulfilled, (state, action) => {

                state.documents = [...state.documents, ...action.payload];
                state.status.uploadDocuments = 'succeeded';
            })
            .addCase(uploadDocuments.rejected, (state, action) => {
                state.status.uploadDocuments = 'failed';
                console.error('Error uploading documents:', action.payload);
            })
            .addCase(putDocument.pending, (state) => {
                state.status.putDocument = "loading";
            })
            .addCase(putDocument.fulfilled, (state) => {
                state.status.putDocument = "succeeded";
            })
            .addCase(putDocument.rejected, (state) => {
                state.status.putDocument = "failed";
            })
            .addCase(patchDocument.pending, (state) => {
                state.status.patchDocument = "loading";
            })
            .addCase(patchDocument.fulfilled, (state, action) => {
                state.status.patchDocument = "succeeded";
                if (state.documents) {
                    state.documents = state.documents.map((doc) =>
                        doc.id === action.payload.id ? action.payload : doc
                    );
                } else {
                    state.documents = action.payload;
                }
            })
            .addCase(patchDocument.rejected, (state) => {
                state.status.patchDocument = "failed";
            })
            .addCase(deleteDocument.pending, (state) => {
                state.status.deleteDocument = "loading";
            })
            .addCase(deleteDocument.fulfilled, (state, action) => {

                state.documents = state.documents.filter(
                    (doc) => doc.id !== action.payload.id
                );
                state.status.deleteDocument = 'succeeded';
            })
            .addCase(deleteDocument.rejected, (state) => {
                state.status.deleteDocument = "failed";
            });
    },
});

export const getDocuments = createAsyncThunk(
    "documents/getDocuments",
    async () => {
        const response = await axios({
            url: "/documents",
            method: "GET",
        });
        return response.data.data;
    }
);


export const getUserDocuments = createAsyncThunk(
    'documents/getUserDocuments',
    async ({ userId }) => {
        const response = await axios({
            url: `/fetchdocs?user_id=${userId}`, // Pass userId as a query parameter
            method: 'GET',
        });

        // Check the response


        return response.data.data; // Return the documents array
    }
);

export const getAllUserDocuments = createAsyncThunk(
    'documents/getAllUserDocuments',
    async ({ userId }) => {
        const response = await axios({
            url: `/users/${userId}/documents`, // Use the correct route from Laravel
            method: 'GET',
        });

        // Return the documents array
        return response.data.data;
    }
);


export const downloadDocument = createAsyncThunk(
    'documents/downloadDocument',
    async ({ id, title }, { rejectWithValue }) => {

        try {
            const response = await axios.get(`/download/${id}`, {
                responseType: 'blob',
            });

            // Create a blob URL for the response data
            const blob = new Blob([response.data], { type: response.data.type });
            const url = window.URL.createObjectURL(blob);

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', title);
            document.body.appendChild(link);

            // Trigger the download
            link.click();

            // Clean up
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

            return { success: true }; // Optionally return success or any other information
        } catch (error) {
            console.error('Error downloading document:', error);
            return rejectWithValue(error.response.data || 'Error downloading document');
        }
    }
);


export const getDocument = createAsyncThunk(
    "documents/getDocument",
    async (params) => {
        const { documentId } = params;
        const response = await axios({
            url: `/documents/${documentId}`,
            method: "GET",
        });
        return response.data.data;
    }
);

export const postDocument = createAsyncThunk(
    "documents/postDocument",
    async (params) => {
        const { userId, title, path, type, visible } = params;
        const response = await axios({
            url: "/documents",
            method: "POST",
            data: {
                user_id: userId,
                title,
                path,
                type,
                visible,
            },
        });
        return response.data.data;
    }
);


export const uploadDocuments = createAsyncThunk(
    'documents/uploadDocuments',
    async ({ filesToUpload, userId }, { rejectWithValue }) => {
        const formData = new FormData();

        // Append files and file types to formData
        filesToUpload.forEach((file) => {
            let fileType;

            if (file.type === 'application/pdf') {
                fileType = 'pdf';
            } else if (file.type === 'application/docx') {
                fileType = 'word';
            } else {
                fileType = 'other';
            }

            formData.append('files[]', file);
            formData.append('file_types[]', fileType);
        });

        formData.append('user_id', userId);

        try {
            const response = await axios.post('/uploaddocs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.data; // Return the response data from the upload
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error uploading files');
        }
    }
);

export const putDocument = createAsyncThunk(
    "documents/putDocument",
    async (params) => {
        const { documentId, title, path, visible } = params;
        const response = await axios({
            url: `/documents/${documentId}`,
            method: "PUT",
            data: {
                title,
                path,
                visible,
            },
        });
        return response.data.data;
    }
);

export const patchDocument = createAsyncThunk(
    "documents/patchDocument",
    async (params) => {
        const { documentId, visible, title } = params;
        const response = await axios({
            url: `/documents/${documentId}`,
            method: "PATCH",
            data: {
                visible,
                title,
            },
        });
        return response.data.data;
    }
);

export const deleteDocument = createAsyncThunk(
    "documents/deleteDocument",
    async (params) => {
        const { documentId } = params;
        const response = await axios({
            url: `/deletedoc/${documentId}`,
            method: "DELETE",
        });

        return response.data.data;
    }
);

export const selectDocuments = (state) => state.documents.documents;
export const selectDocument = (state) => state.documents.document;
export const selectDocumentsStatus = (state) => state.documents.status;

export default documentsSlice.reducer;
