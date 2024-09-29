import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    companies: [],
    status: {
        companies: "idle",
    },
};

// Thunk to get all companies
export const getAllCompanies = createAsyncThunk(
    "companies/getAllCompanies",
    async () => {
        const response = await axios.get(`/companies`);
        return response.data.data; // Assuming the response contains data in a `data` field
    }
);

// Thunk to get companies for a specific user ID
export const getCompaniesForUserID = createAsyncThunk(
    "companies/getCompaniesForUserID",
    async (userID) => {
        const response = await axios.get(`/companies?userId=${userID}`);
        return response.data.data; // Assuming response contains `data` for companies
    }
);

// Thunk to post (create) a company
export const postCompany = createAsyncThunk(
    "companies/postCompany",
    async (companyData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`/companies`, companyData);
            return response.data.data; // Assuming response contains the created company
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to update a company
export const putCompany = createAsyncThunk(
    "companies/putCompany",
    async ({ companyId, updatedCompanyData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`/companies/${companyId}`, updatedCompanyData);
            return response.data.data; // Assuming response contains the updated company
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to delete a company
export const deleteCompany = createAsyncThunk(
    "companies/deleteCompany",
    async (companyId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/companies/${companyId}`);
            return companyId; // Return the ID of the deleted company to update the state
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue(error.message);
        }
    }
);

export const companiesSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle getAllCompanies
            .addCase(getAllCompanies.pending, (state) => {
                state.status.companies = "loading";
            })
            .addCase(getAllCompanies.fulfilled, (state, action) => {
                state.companies = action.payload;
                state.status.companies = "succeeded";
            })
            .addCase(getAllCompanies.rejected, (state) => {
                state.status.companies = "failed";
            })

            // Handle getCompaniesForUserID
            .addCase(getCompaniesForUserID.pending, (state) => {
                state.status.companies = "loading";
            })
            .addCase(getCompaniesForUserID.fulfilled, (state, action) => {
                state.companies = action.payload;
                state.status.companies = "succeeded";
            })
            .addCase(getCompaniesForUserID.rejected, (state) => {
                state.status.companies = "failed";
            })

            // Handle postCompany
            .addCase(postCompany.pending, (state) => {
                state.status.companies = "loading";
            })
            .addCase(postCompany.fulfilled, (state, action) => {
                state.companies.push(action.payload);
                state.status.companies = "succeeded";
            })
            .addCase(postCompany.rejected, (state) => {
                state.status.companies = "failed";
            })

            // Handle putCompany
            .addCase(putCompany.pending, (state) => {
                state.status.companies = "loading";
            })
            .addCase(putCompany.fulfilled, (state, action) => {
                const updatedCompany = action.payload;
                state.companies = state.companies.map((company) =>
                    company.id === updatedCompany.id ? updatedCompany : company
                );
                state.status.companies = "succeeded";
            })
            .addCase(putCompany.rejected, (state) => {
                state.status.companies = "failed";
            })

            // Handle deleteCompany
            .addCase(deleteCompany.pending, (state) => {
                state.status.companies = "loading";
            })
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.companies = state.companies.filter((company) => company.id !== action.payload);
                state.status.companies = "succeeded";
            })
            .addCase(deleteCompany.rejected, (state) => {
                state.status.companies = "failed";
            });
    },
});

export const selectCompanies = (state) => state.companies.companies;
export const selectCompaniesStatus = (state) => state.companies.status.companies;

export default companiesSlice.reducer;
