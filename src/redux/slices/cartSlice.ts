import { createSlice } from "@reduxjs/toolkit";
import { Flight } from "../../types/flight";
import uniqid from "uniqid";

const initialState : Cart[] = []

function mapFlightToCart(flight: Flight) : Cart {
    return {
        key: uniqid(),
        name: flight.name,
        from: flight.from!,
        flight: flight.flight,
        flightPath: flight.flightPath,
        price: flight.price,
        sourceairport: flight.sourceairport!,
        destinationairport: flight.destinationairport
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            return [...state, mapFlightToCart(action.payload.flight)]    
        },
        removeFromCart: (state, action) => {
            return state.filter(entry => entry.flight !== action.payload.flight )
        }
    }, 
    extraReducers: () => {

    }
});

export default cartSlice.reducer
export const { addToCart, removeFromCart } = cartSlice.actions


