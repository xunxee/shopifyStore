import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'list',
  initialState: {
    url: {
      product: '',
      category: '',
      sort: '',
      material: '',
    },
  },
  reducers: {
    changeUrlDataField(
      state,
      { payload: { name, belong } },
    ) {
      const { url } = state;
      return {
        ...state,
        url: {
          ...url,
          [belong]: name,
        },
      };
    },

    changeUrlAllDataFields(state, {
      payload: object,
    }) {
      const { url } = state;
      return {
        ...state,
        url: {
          ...url,
          ...object,
        },
      };
    },
  },
});

export const {
  changeUrlDataField,
  changeUrlAllDataFields,
} = actions;

export default reducer;
