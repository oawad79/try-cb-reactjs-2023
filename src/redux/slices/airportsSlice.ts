import { createAction, createSelector, createSlice} from "@reduxjs/toolkit";
import { RootState } from "../store";

type Airport = {
    airportname: string
}

type InitialState = Airport[]

const initialState: InitialState = [
    {airportname: ""}
]
    
export enum AirportActionTypes {
    GET_AIRPORT_SUGGEST = '@@search/GET_AIRPORT_SUGGEST'
}

export const getAirportSuggestByCode = createAction<{airportCode: string}>(AirportActionTypes.GET_AIRPORT_SUGGEST);

const airportsSlice = createSlice({
    name: 'airports',
    initialState: initialState,
    reducers: {
        setAirportNames: (_, action) => {
            return action.payload
        }
    },
    extraReducers: () => {}
});


export default airportsSlice.reducer
export const { setAirportNames } = airportsSlice.actions

export const autoSuggestValues = createSelector(
  (state: RootState) => state.airports,
  (airports) => {
    const transformedAirports = airports.reduce((res : {value: string}[], item) => {
      res.push({ value: item.airportname });
      return res;
    }, []);

    return transformedAirports;
  }
);
