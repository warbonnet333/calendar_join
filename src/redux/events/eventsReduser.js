import {createReducer} from "@reduxjs/toolkit";
import {addEvent, deleteEvent, editEvent} from "./eventsActions";

export default createReducer([], {
    [addEvent]: (state, action) => [...state, action.payload],
    [deleteEvent]: (state, action) =>
        state.filter((item) => item.id !== action.payload),
    [editEvent]: (state, action) => [...action.payload],
});