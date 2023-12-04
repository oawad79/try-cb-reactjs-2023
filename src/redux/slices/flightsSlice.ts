import { createAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Flight, GetFlightsType } from "../../types/flight";
import { RootState } from "../store";

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

export const outFlightsForUI = createSelector(
    (state: RootState) => state.outFlights,
    (state: RootState) => state.cart,
    (flights, cart) => {
        const mappedFlights = flights.map(flight => {
            return {
                ...flight, added: cart.find(cartEntry => cartEntry.flight === flight.flight)
            }
        });

        return mappedFlights;
    }
);

export const returnFlightsForUI = createSelector(
    (state: RootState) => state.returnFlights,
    (state: RootState) => state.cart,
    (flights, cart) => {
        const mappedFlights = flights.map(flight => {
            return {
                ...flight, added: cart.find(cartEntry => cartEntry.flight === flight.flight)
            }
        });

        return mappedFlights;
    }
);

