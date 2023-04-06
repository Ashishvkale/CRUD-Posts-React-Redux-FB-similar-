import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

let tempKey = 0

const initialState = {
    posts: [],
}

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    console.log(initialPost)
    return initialPost;
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    console.log(initialPost)
    return initialPost;
})

export const deletePost = createAsyncThunk('posts/deletePost', async (initialPost) => {
    console.log(initialPost)
    return initialPost;
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString()
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addNewPost.fulfilled, (state, action) => {
                tempKey+=1
                action.payload.id = tempKey;

                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                console.log(action.payload)
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                action.payload.date = new Date().toISOString();
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = [...posts, action.payload];
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const posts = state.posts.filter(post => post.id !== id);
                state.posts = posts;
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts;

export const selectPostById = (state, postId) =>
    state.posts.posts.find(post => post.id === postId);

export const { postAdded } = postsSlice.actions

export default postsSlice.reducer


