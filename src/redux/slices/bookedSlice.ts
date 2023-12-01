import { createAction, createSlice } from "@reduxjs/toolkit";
import { BookingRequestType } from "../../types/flight";

const initialState : BookedType[] = []

export enum BookFlightAction  {
    BOOK_FLIGHT = "@@flights/BOOK_FLIGHT"
}

export const bookFlightAction = createAction<BookingRequestType>(BookFlightAction.BOOK_FLIGHT);

const bookedSlice = createSlice({
    name: 'booked',
    initialState: initialState,
    reducers: {
        addToBooked: (state, action) => {
            return [...state, action.payload];
        }
    },
    extraReducers: () => {

    }
});

export default bookedSlice.reducer
export const { addToBooked } = bookedSlice.actions