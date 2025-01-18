import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    users: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false
        },
        updateUserRoles(state,action){
            state.users=action.payload
        },
        updateCurrentUser(state) {
            if (state.currentUser?.email) {
                const matchingUser = state.users.find(user => user.email === state.currentUser.email);
        
                if (matchingUser) {
                    state.currentUser = matchingUser;
                }
            }
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const {signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateAdminStatus, updateCurrentUser, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, updateUserRoles, signOutUserSuccess} = userSlice.actions;

export default userSlice.reducer;