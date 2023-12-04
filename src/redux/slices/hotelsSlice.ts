import { PayloadAction, createAction, createSlice} from "@reduxjs/toolkit";

const initialState: Hotel[] = []

export enum HotelsActionTypes {
  GET_HOTELS_REQUEST = '@@search/GET_HOTELS_REQUEST'
}

export const getHotelsRequest = createAction<{location: string, optional?: string}>(HotelsActionTypes.GET_HOTELS_REQUEST)

const hotelsSlice = createSlice({
    name: 'hotels',
    initialState,
    reducers: {
        getHotelsRequestSuccess: (_state, action: PayloadAction<Hotel[]>) => {
            return action.payload
        }
    },
    extraReducers: () => {
        //used to handle actions created in another slice (external ones)
        //reducers defined here does not generate actions like the ones in "reducers"
    }
});

export default hotelsSlice.reducer
export const { getHotelsRequestSuccess } = hotelsSlice.actions