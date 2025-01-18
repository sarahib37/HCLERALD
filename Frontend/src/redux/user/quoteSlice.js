import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    quotes: [],
    error: null,
    loading: false,
}

const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {
        addQuoteStart: (state) => {
            state.loading = true;
        },
        addQuoteSuccess: (state,action) => {
            state.quotes=action.payload
            state.loading = false;
            state.error = null;
        },
        addQuoteFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateQuotes(state,action){
            state.quotes=action.payload
        },
    }
})

export const {addQuoteFailure, addQuoteStart, addQuoteSuccess, updateQuotes} = quoteSlice.actions;

export default quoteSlice.reducer;