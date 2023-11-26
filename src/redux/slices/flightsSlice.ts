import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState: Flight[] = []

export enum FlightActions {
    GET_FLIGHTS_BY_LOCATION_TIME = '@@search/GET_FLIGHTS_BY_LOCATION_TIME'
}

export const getFlightsByFromByToByTime = createAction<GetFlightsType>(FlightActions.GET_FLIGHTS_BY_LOCATION_TIME);

const outgoingFlightsSlice = createSlice({
    name: 'outFlights',
    initialState: initialState,
    reducers: {
        setOutgoingFlights: (state, action) => {
            console.log("Out = ", action.payload)
            return action.payload
        }  
    },
    extraReducers: () => {

    }
});

const returningFlightsSlice = createSlice({
    name: 'returnFlights',
    initialState: initialState,
    reducers: {
        setReturningFlights: (state, action) => {
            console.log("Return = ", action.payload)
            return action.payload
        }   
    },
    extraReducers: () => {

    }
});

const outReducer = outgoingFlightsSlice.reducer;
const returnReducer = returningFlightsSlice.reducer;

export { outReducer, returnReducer};

export const { setOutgoingFlights } = outgoingFlightsSlice.actions
export const { setReturningFlights } = returningFlightsSlice.actions