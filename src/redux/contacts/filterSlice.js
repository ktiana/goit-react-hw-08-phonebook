import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact } from 'redux/contacts/operations';

const filterInitialState = '';

const filterSlice = createSlice({
  name: 'filter-contacts',

  initialState: filterInitialState,

  reducers: {
    filterContact(state, { payload }) {
      return payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(addContact.fulfilled, () => '');
    builder.addCase(deleteContact.fulfilled, () => '');
  },
});

export const { filterContact } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
