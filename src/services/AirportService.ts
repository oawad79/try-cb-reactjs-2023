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
            },
            transformResponse: (response, meta, arg) => {
                let transformedAirports = [];
                console.log("********")
                if (meta?.response?.status == 200) {
                    //const data = response.data.data
                    console.log("response = ", response.data)
                    transformedAirports = response.data.reduce((res : {value: string}[], item) => {
                        res.push({ value: item.airportname });
                        return res;
                    }, []);
                }
                console.log("transformedAirports = ", transformedAirports);
                return transformedAirports;

                //return response;
            } 
        })
    })

});

export default airportsApi;