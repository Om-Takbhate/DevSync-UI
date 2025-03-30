import {createSlice} from '@reduxjs/toolkit'

const userConnectionSlice = createSlice({
    name: 'connections',
    initialState: {
        connections: []
    },
    reducers: {
        addSingleConnection: (state, action)=>{
            state.connections = [...state.connections, ...action.payload]

        },
        addConnections: (state, action)=>{
            state.connections = action.payload
        },
        removeConnections: (state, action) => {
            state.connections.length = 0
        }
    }
})


export const {addConnections, addSingleConnection, removeConnections} = userConnectionSlice.actions
export default userConnectionSlice.reducer