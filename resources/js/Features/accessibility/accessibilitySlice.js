import { createSlice } from '@reduxjs/toolkit';

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

const accessibilitySlice = createSlice({
  name: 'accessibility',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setTextSize(state, action) {
      state.textSize = getFontSize(action.payload);
    },
  },
});

export const { toggleDarkMode, setTextSize } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
