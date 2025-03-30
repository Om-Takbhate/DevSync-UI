import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import userFeedReducer from './slices/userFeedSlice'
import userConnectionReducer from './slices/userConnectionSlice'
import requestReducer from './slices/userRequests'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        usersFeed: userFeedReducer,
        userConnections: userConnectionReducer,
        requests: requestReducer
    }
})


export default appStore