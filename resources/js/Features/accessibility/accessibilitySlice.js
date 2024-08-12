
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
  darkMode: true,
  textSize: 'small', // Possible values: 'small', 'medium', 'large'
};



const getFontSize = (size) => {
    switch (size) {
        case 'small':
            return '1em';
        case 'medium':
            return '1.07em';
        case 'large':
            return '1.12em';
        default:
            return '1em';
    }
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async () => {
      const response = await axios({
          url: `${appUrl}/api/user-id`,
          method: "GET",
      });

      return response.data.user;
  }
);

const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      console.log('Dark mode toggled:', state.darkMode);  // Log the updated state
    },
    setTextSize(state, action) {
      state.textSize = getFontSize(action.payload);
      console.log('Text size set to:', state.textSize);  // Log the updated state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        console.log('Fetching user data, status:', state.status);  // Log the state
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.darkMode = action.payload.darkMode;
        state.textSize = getFontSize(action.payload.textSize);
        console.log('User data fetched successfully:', state.darkMode);  // Log the updated state
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('Failed to fetch user data, error:', state.error);  // Log the error
      });
  },
});


export const { toggleDarkMode, setTextSize } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;

