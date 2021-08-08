import { createAction } from "@reduxjs/toolkit";

export const addEvent = createAction("eventsReduser/addEvent");
export const deleteEvent = createAction("eventsReduser/deleteEvent");
export const editEvent = createAction("eventsReduser/editEvent");
