import { configureStore, Tuple } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";

const logger = createLogger({
    collapsed: true,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: () => new Tuple(thunk, logger),
});

export default store;

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']