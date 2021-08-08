import {configureStore} from '@reduxjs/toolkit';
// import sessionReducer from './session/sessionReducer';
// import trainingReducer from './training/trainingReducer';
// import { loaderReducer } from './loader/loaderReducer';
// import { booksReducer } from './books/booksReducer';
// import { errorReducer } from './error/errorReducer';
import modalReducer from './modal/modalReducer';
import eventsReducer from './events/eventsReduser';
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: {
        modals: modalReducer,
        events: eventsReducer
    },
    middleware: [thunk],
});