import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import uniqid from 'uniqid';
import { BookingRequestType, Flight } from '../types/flight';

const flightsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api"
    }),
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
                method: 'POST',
                body: {
                    ...flightRequest.flight
                }
            }) 
        })
        
    })

});

export default flightsApi;



