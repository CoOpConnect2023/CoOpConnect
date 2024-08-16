import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const appUrl = import.meta.env.VITE_APP_URL;
axios.defaults.baseURL = `${appUrl}/api/v1`;

const initialState = {
    messages: [],
    conversations: [],
    selectedConversation: null,
    newMessage: '',
    recipientEmail: '',
    notifications: null,


    status: {
        messages: "idle",
        conversations: "idle",
        selectedConversation: "idle",
        newMessage: "idle",
        recipientEmail: "idle",
        notifications: 'idle',
        markMessageAsReadStatus: 'idle',

    },
};

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        updateMessageViewedState(state, action) {
            const { messageId, conversationId } = action.payload;
            const conversationIndex = state.conversations.findIndex(
                (conversation) => conversation.id === conversationId
            );
            if (conversationIndex !== -1) {
                const updatedMessages = state.conversations[conversationIndex].messages.map((message) => {
                    if (message.id === messageId) {
                        return { ...message, viewed: 1 };
                    }
                    return message;
                });
                state.conversations[conversationIndex].messages = updatedMessages;
            }
        }, markMessageReadSuccess(state, action) {
            state.conversations = action.payload;
        },
    },
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
            .addCase(getNotifications.pending, (state, action) => {
                state.status.notifications = "loading";
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload;
                state.status.notifications = "succeeded";

            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.status.notifications = "failed";
            })

            .addCase(fetchConversationDetails.pending, (state, action) => {
                state.status.selectedConversation = "loading";
            })
            .addCase(fetchConversationDetails.fulfilled, (state, action) => {
                state.selectedConversation = action.payload;
                state.status.selectedConversation = "succeeded";

            })
            .addCase(fetchConversationDetails.rejected, (state, action) => {
                state.status.selectedConversation = "failed";
            })

            .addCase(markMessageAsRead.pending, (state) => {
                state.markMessageAsReadStatus = 'loading';
            })
            .addCase(markMessageAsRead.fulfilled, (state, action) => {
                state.markMessageAsReadStatus = 'succeeded';
                const { messageId, conversationId } = action.payload;
                const conversationIndex = state.conversations.findIndex(
                    (conversation) => conversation.id === conversationId
                );
                if (conversationIndex !== -1) {
                    const updatedMessages = state.conversations[conversationIndex].messages.map((message) => {
                        if (message.id === messageId) {
                            return { ...message, viewed: 1 };
                        }
                        return message;
                    });
                    state.conversations[conversationIndex].messages = updatedMessages;
                }
            })
            .addCase(markMessageAsRead.rejected, (state) => {
                state.markMessageAsReadStatus = 'failed';
            })

            .addCase(sendMessage.pending, (state) => {
                state.status.newMessage = "loading";
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.newMessage = action.payload.newMessage;
                state.status.newMessage = "succeeded";
            })
            .addCase(sendMessage.rejected, (state) => {
                state.status.newMessage = "failed";
            })
            .addCase(sendNewMessage.pending, (state) => {
                state.status.newMessage = "loading";
            })
            .addCase(sendNewMessage.fulfilled, (state, action) => {
                state.newMessage = action.payload.newMessage;
                state.status.newMessage = "succeeded";
            })
            .addCase(sendNewMessage.rejected, (state) => {
                state.status.newMessage = "failed";
            });

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

    return response.data;

});

export const getSelectedConversation = createAsyncThunk(
    "messages/getSelectedConversation",
    async (params) => {
        const { conversationID } = params;
        const response = await axios({
            url: `/conversations/${conversationID}/current`,
            method: "GET",
        });
        return response.data;
    }
);

export const getNotifications = createAsyncThunk("notifications/getNotifications", async (userID) => {


    try {
        const response = await axios({
            url: `/messages/${userID}`,
            method: "GET",
        });


        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
});

export const markMessageAsRead = createAsyncThunk(
    "messages/markMessageAsRead",
    async ({ messageId, conversationId }, { getState, dispatch }) => {
        try {



            await axios.patch(`/messages/${messageId}/mark-as-read`);


            const conversations = getState().messages.notifications.conversations;



            const updatedConversations = conversations.map(conversation => {
                if (conversation.id === conversationId) {
                    const updatedMessages = conversation.messages.map(message =>
                        message.id === messageId ? { ...message, viewed: 1 } : message
                    );
                    return {
                        ...conversation,
                        messages: updatedMessages,
                    };
                }
                return conversation;
            });




            dispatch(markMessageReadSuccess(updatedConversations));


            return { messageId, conversationId };
        } catch (error) {
            console.error(`Error marking message ${messageId} as read: ${error.message}`);
            throw new Error(`Error marking message ${messageId} as read: ${error.message}`);
        }
    }
);

export const fetchConversationDetails = createAsyncThunk(
    "messages/fetchConversationDetails",
    async (conversationID, { getState, dispatch }) => {
      try {
        const response = await axios.get(`/conversations/${conversationID}/current`);

        return response.data.conversation;

      } catch (error) {
        console.error("Error fetching conversation details:", error);
        throw error;
      }
    }
  );

  export const sendMessage = createAsyncThunk(
    "messages/sendMessage",
    async ({ newMessage, userInfo, conversationID }, { dispatch, rejectWithValue }) => {
        try {
            await axios.post(`/sendmessages`, {
                content: newMessage,
                user_id: userInfo.id,
                conversation_id: conversationID
            });

            dispatch(getMessages({ conversationID }));
            dispatch(getConversations({ userId: userInfo.id }));

            return { newMessage: '' };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const sendNewMessage = createAsyncThunk(
    "messages/sendNewMessage",
    async ({ brandNewMessage, userInfo, recipientEmail }, { dispatch, rejectWithValue }) => {
        try {
            const requestData = {
                content: brandNewMessage,
                user_id: userInfo.id,
                recipient_email: recipientEmail
            };
            console.log("firing", requestData )
            await axios.post(`/sendnewmessages`, requestData);

            dispatch(getMessages({ conversationID }));
            dispatch(getConversations({ userId: userInfo.id }));

            return { newMessage: '' };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);





export const selectMessages = (state) => state.messages.messages;
export const selectMessagesStatus = (state) => state.messages.status.messages;
export const selectConversations = (state) => state.messages.conversations;
export const selectConversationsStatus = (state) => state.messages.status.conversations;
export const selectCurrentConversation = (state) => state.messages.selectedConversation;
export const selectCurrentConversationsStatus = (state) => state.messages.status.selectedConversation;
export const selectNotifications = (state) => state.messages.notifications;
export const selectNotificationsStatus = (state) => state.messages.status.notifications;
export const selectMarkMessageAsReadStatus = (state) => state.messages.markMessageAsReadStatus;


export const { } = messagesSlice.actions;
export const { updateMessageViewedState, markMessageReadSuccess } = messagesSlice.actions;

export default messagesSlice.reducer;
