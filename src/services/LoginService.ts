import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


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
                    password: password
                }
            }),
            transformResponse(baseQueryReturnValue : string, meta, arg) {
                console.log("log = ", baseQueryReturnValue)
                return baseQueryReturnValue;
            }
            
            // ,
            // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            //     console.log("^^^^^^^^^^^^^^^^^^^^^", arg)
            //     try {
            //         const { data: createdPost } = await queryFulfilled
            //         const patchResult = dispatch(
            //             loginApi.util.upsertQueryData('login', { username: "test", password: "test", tenant: "qewqe"}, createdPost)
            //     )
            //     } catch (error) { 
            //         console.log("error = ", error)
            //      }
            // },
        }),
        login: build.query({
            query: ({username, password, tenant}) => ({
                url: `/tenants/${tenant}/user/login`,
                method: 'POST',
                body: {
                    user: username,
                    password: password
                }
            })
        })
        
    })

});

export default loginApi;



