import { createSlice } from '@reduxjs/toolkit'

const userFeedSlice = createSlice({
    name: 'usersFeed',
    initialState: {
        feed: []
    },
    reducers: {
        addUsersFeed: (state, action) => {
            state.feed = action.payload
        },
        removeOneUserFromFeed: (state, action) => {
            state.feed = state.feed.filter(user => user._id != action.payload);
        },
        removeUsersFeed: (state, action) => {
            state.feed.length = 0
            // return {feed: []}
        }
    }
})


export const { addUsersFeed, removeUsersFeed, removeOneUserFromFeed } = userFeedSlice.actions
export default userFeedSlice.reducer