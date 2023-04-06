import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../Components/postsSlice';


export const store = configureStore({
    reducer: {
        posts: postsReducer
    }
})