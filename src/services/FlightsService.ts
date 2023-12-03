import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import uniqid from 'uniqid';
import { BookingRequestType, Flight } from '../types/flight';
import { RootState } from '../redux/store';

const originalBaseQuery = fetchBaseQuery({ 
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
            
        // If we have a token set in state, let's assume that we should be passing it.
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    },
});

const wrappedBaseQuery = (...args) => {
  console.log ("making api call", ...args)
  return originalBaseQuery (...args)
}

const flightsApi = createApi({
    baseQuery: wrappedBaseQuery,
    endpoints: (build) => ({
        flightsList: build.query({
            query({from, to, leave} : {from: string, to: string, leave: string}) {
                return {
                    url: `/flightPaths/${from}/${to}`,
                    params: { leave: leave},
                    method: "GET"
                };
            },
            transformResponse(baseQueryReturnValue: {data: Flight[]}) {
                const transformedFlights = baseQueryReturnValue.data.reduce((res: Flight[], flight) => {
                    res.push({...flight, key: uniqid(), flightPath: `${flight.sourceairport} -> ${flight.destinationairport}` });
                    return res;        
                }, []);

                return transformedFlights;
            },
            transformErrorResponse(baseQueryReturnValue, meta, arg) {
                return []
            },

        }),
        bookFlight: build.mutation<string, BookingRequestType>({
            query: (flightRequest) => ({ 
                url: `/tenants/${flightRequest.tenant}/user/${flightRequest.username}/flights`,
                method: 'PUT',
                body: {
                    "flights" : [
                        {
                            ...flightRequest.flight
                        }
                    ]
                },
                
            })
        })
        
    })

});

export default flightsApi;



