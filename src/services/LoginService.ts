import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import md5 from 'blueimp-md5';

const loginApi = createApi({
    reducerPath: 'login',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api"
    }),
    endpoints: (build) => ({
        signup: build.mutation<string, LoginType>({
            query: ({username, password, tenant}) => ({
                url: `/tenants/${tenant}/user/signup`,
                method: 'POST',
                body: {
                    user: username,
                    password: md5(password)
                }
            })
        }),
        login: build.query({
            query: ({username, password, tenant}) => ({
                url: `/tenants/${tenant}/user/login`,
                method: 'POST',
                body: {
                    user: username,
                    password: md5(password)
                }
            })
        })
        
    })

});

export default loginApi;



