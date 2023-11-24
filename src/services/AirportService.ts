import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// type FlightListing = {
//     name: string
// }

const airportsApi = createApi({
    reducerPath: "airportsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api"
    }),
    endpoints: (build) => ({
        airportNamesByCode: build.query({
            query({airportCode} : {airportCode: string}) {
                return {
                    url: `/airports`,
                    params: { search: airportCode},
                    method: "GET"
                };
            }
        })
    })

});

export default airportsApi;