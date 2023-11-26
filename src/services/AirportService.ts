import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

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
            transformResponse: (response : {data: {airportname: string}[]}, meta) => {
                let transformedAirports = [{
                    value: ""
                }];
                if (meta?.response?.status == 200) {
                    transformedAirports = response.data.reduce((res : {value: string}[], item) => {
                        res.push({ value: item.airportname });
                        return res;
                    }, []);
                }
                return transformedAirports;
            } 
        })
    })

});

export default airportsApi;