import {createReducer} from "@reduxjs/toolkit";
import {showEditor, closeEditor} from "./modalActions";

export default createReducer(false, {
    [showEditor]: (state, action) => ({isEditorShown: true}),
    [closeEditor]: (state, action) => ({isEditorShown: false}),
    // [addContact]: (state, action) => [...state, action.payload],
    // [deleteContact]: (state, action) =>
    //     state.filter((item) => item.id !== action.payload),
    // [addFromLocalStorage]: (state, action) => [...state, ...action.payload],
});