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

const getNextFontSize = (currentSizeKey, direction) => {
    const sizes = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(currentSizeKey);

    if (direction === 'increase' && currentIndex < sizes.length - 1) {
        return sizes[currentIndex + 1];
    } else if (direction === 'decrease' && currentIndex > 0) {
        return sizes[currentIndex - 1];
    }

    return currentSizeKey;
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
      console.log('Dark mode toggled:', state.darkMode);
    },
    setTextSize(state, action) {
      state.textSize = getFontSize(action.payload);
      console.log('Text size set to:', state.textSize);
    },
    increaseFontSize(state) {
        
        const currentSizeKey = ['small', 'medium', 'large'].find(key => getFontSize(key) === state.textSize);
        const newSizeKey = getNextFontSize(currentSizeKey, 'increase');
        console.log('Current size key:', currentSizeKey);
        console.log('Next size key:', newSizeKey);
        console.log('State before change:', state.textSize);
        state.textSize = getFontSize(newSizeKey);
        console.log('Font size increased to:', state.textSize);
      },
      decreaseFontSize(state) {

        const currentSizeKey = ['small', 'medium', 'large'].find(key => getFontSize(key) === state.textSize);
        const newSizeKey = getNextFontSize(currentSizeKey, 'decrease');
        console.log('Current size key:', currentSizeKey);
        console.log('Next size key:', newSizeKey);
        console.log('State before change:', state.textSize);
        state.textSize = getFontSize(newSizeKey);
        console.log('Font size decreased to:', state.textSize);
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        console.log('Fetching user data, status:', state.status);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.darkMode = action.payload.darkMode;
        state.textSize = getFontSize(action.payload.fontSize);
        console.log('User data fetched successfully:', state.darkMode);
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('Failed to fetch user data, error:', state.error);
      });
  },
});

export const { toggleDarkMode, setTextSize, increaseFontSize, decreaseFontSize } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
