import { createSlice } from "@reduxjs/toolkit";
import { Flight } from "../../types/flight";
import uniqid from "uniqid";

const initialState : Cart[] = []

function mapFlightToCart(flight: Flight) : Cart {
    return {
        key: uniqid(),
        name: flight.name,
        date: flight.utc,
        flight: flight.flight,
        flightPath: flight.flightPath
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            return [...state, mapFlightToCart(action.payload)]    
        },
        removeFromCart: (state, action) => {
            console.log("delete action = ", action)
            return state.filter(entry => entry.flight !== action.payload.flight )
        }
    }, 
    extraReducers: () => {

    }
});

export default cartSlice.reducer
export const { addToCart, removeFromCart } = cartSlice.actions


