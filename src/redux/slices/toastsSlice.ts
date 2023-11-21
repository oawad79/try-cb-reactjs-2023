import { createSlice } from '@reduxjs/toolkit'

const initialState: string[] = []

const toastsSlice = createSlice({
  name: 'toasts',
  initialState: initialState,
  reducers: {
    createToast: (state, action) => {
      console.log(`in toasts reducer = ${action.payload.message}`)
      return action.payload.message;
    }
  },
  extraReducers: () => {}
})

export default toastsSlice.reducer
export const { createToast } = toastsSlice.actions
