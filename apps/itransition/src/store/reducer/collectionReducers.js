import { createReducer } from "@reduxjs/toolkit";
import { addUserCollection } from "../actions/addUserCollection";
import { loadUserCollections, loadUserCollectionsSuccess } from "../actions/loadUserCollections";

const initialState = {
    collections: []
};

const collectionReducers = createReducer(initialState, (builder) => {
    builder
        .addCase(loadUserCollections, (state, action) => {})
        .addCase(loadUserCollectionsSuccess, (state, action) => {
            state.collections = action.payload;
        })
        .addCase(addUserCollection, (state, action) => {})
})

export default collectionReducers;