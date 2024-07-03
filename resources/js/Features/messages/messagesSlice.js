import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1";

const initialState = {
    messages: [],
    conversations: [],
    selectedConversation: null,
    newMessage: '',
    recipientEmail: '',

    status: {
        messages: "idle",
        conversations: "idle",
        selectedConversation: "idle",
        newMessage: "idle",
        recipientEmail: "idle",

    },
};

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getMessages.pending, (state, action) => {
                state.status.messages = "loading";
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.status.messages = "succeeded";

            })
            .addCase(getMessages.rejected, (state, action) => {
                state.status.messages = "failed";
            })
            .addCase(getConversations.pending, (state, action) => {
                state.status.conversations = "loading";
            })
            .addCase(getConversations.fulfilled, (state, action) => {
                state.conversations = action.payload;
                state.status.conversations = "succeeded";
            })
            .addCase(getConversations.rejected, (state, action) => {
                state.status.conversations = "failed";
            })
            .addCase(getSelectedConversation.pending, (state, action) => {
                state.status.selectedConversation = "loading";
            })
            .addCase(getSelectedConversation.fulfilled, (state, action) => {
                state.selectedConversation = action.payload;
                state.status.selectedConversation = "succeeded";
            })
            .addCase(getSelectedConversation.rejected, (state, action) => {
                state.status.selectedConversation = "failed";
            })

    },
});

export const getMessages = createAsyncThunk("messages/getMessages", async (params) => {
    const { conversationID } = params;
    const response = await axios({
        url: `/conversation/${conversationID}/messages`,
        method: "GET",
    });

    return response.data;
});

export const getConversations = createAsyncThunk("messages/getConversations", async (params) => {
    const { userId } = params;
    const response = await axios({
        url: `/conversation/${userId}`,
        method: "GET",

    });
    console.log(response.data)
    return response.data;

});

export const getSelectedConversation = createAsyncThunk(
    "messages/getSelectedConversation",
    async (params) => {
        const { conversationID } = params;
        const response = await axios({
            url: `/api/conversations/${conversationID}/current`,
            method: "GET",
        });
        return response.data;
    }
);



export const selectMessages = (state) => state.messages.messages;
export const selectMessagesStatus = (state) => state.messages.status.messages;
export const selectConversations = (state) => state.messages.conversations;
export const selectConversationsStatus = (state) => state.messages.status.conversations;
export const selectCurrentConversation = (state) => state.messages.selectedConversation;
export const selectCurrentConversationsStatus = (state) => state.messages.status.selectedConversation;
// Action creators are generated for each case reducer function
export const {} = messagesSlice.actions;

export default messagesSlice.reducer;
