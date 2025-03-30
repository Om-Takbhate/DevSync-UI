import { createSlice } from "@reduxjs/toolkit";

const userRequestsSlice = createSlice({
    name:'requests',
    initialState: {
        requests: []
    },
    reducers: {
        addRequests: (state, action)=>{
            state.requests = action.payload
        },
        removeRequest: (state, action) =>{
            state.requests = state.requests.filter(request => request._id != action.payload);
        },
        removeAllRequests: (state, action)=>{
            state.requests.length = 0
        }
    }
})


export const {addRequests,removeAllRequests, removeRequest} = userRequestsSlice.actions
export default userRequestsSlice.reducer