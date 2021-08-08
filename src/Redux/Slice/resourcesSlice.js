import { createSlice } from '@reduxjs/toolkit'

import { fetchResources, fetchResourcesById } from '../../API';

export const initialState = {
    loading: false,
    hasErrors: false,
    resources: [],
  }

const resourceSlice = createSlice({
    name: 'resources',
    initialState,
    extraReducers: {
        [fetchResources.fulfilled]: (state, action) => {
            state.resources = action.payload.data
        },
        [fetchResources.rejected]: (state) => {
            state.hasErrors = true
        },
        [fetchResourcesById.fulfilled]: (state, action) => {
            state.resources = action.payload
        },
        [fetchResourcesById.rejected]: (state) => {
            state.hasErrors = true
        }
    }
})

export default resourceSlice.reducer;