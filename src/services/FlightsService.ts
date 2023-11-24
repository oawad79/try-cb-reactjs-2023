import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// type FlightListing = {
//     name: string
// }

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
            }
        })
    })

});

export default flightsApi;