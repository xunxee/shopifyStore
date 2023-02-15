import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'header',
  initialState: {
    searchBarFields: {
      value: '',
    },
  },
  reducers: {
    changeSearchBarFields(state, { payload: { value } }) {
      return {
        ...state,
        searchBarFields: {
          value,
        },
      };
    },
  },
});

export const { changeSearchBarFields } = actions;

export default reducer;
