import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slices/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    auth: AuthSlice
})

const persistedReducer = persistReducer(persistConfig, reducer);

const Store = configureStore({
    reducer: persistedReducer
})

export default Store;