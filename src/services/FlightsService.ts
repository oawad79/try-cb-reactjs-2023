import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import uniqid from 'uniqid';

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
                console.log("logging = ",baseQueryReturnValue)
                const transformedFlights = baseQueryReturnValue.data.reduce((res: Flight[], flight) => {
                    res.push({...flight, key: uniqid(), flightPath: `${flight.sourceairport} -> ${flight.destinationairport}` });
                    return res;        
                }, []);

                return transformedFlights;
            },

        })
        
    })

});

export default flightsApi;



