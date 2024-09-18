import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { persistStore, persistReducer, PURGE, FLUSH, PAUSE, PERSIST, REHYDRATE } from 'redux-persist'
import storage from'redux-persist/lib/storage'

import CategoriesSlice from "./categoriesSlice/categoriesSlice"
import ProductsSlice from "./ProductsSlice/ProductsSlice"
import cartSlice from "./cart/CartSlice"
import authSlice from "./auth/authSlice"


const persistRootConfig = {
    key: 'root',
    storage,
    whitelist : ["cart", "auth"]
}

const persistAuthConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "accessToken"]
}

const rootReducer = combineReducers({
    Category : CategoriesSlice,
    Products: ProductsSlice,
    cart: cartSlice,
    auth : persistReducer(persistAuthConfig, authSlice)
})

const persistorsReducer = persistReducer(persistRootConfig,rootReducer)




export const store = configureStore({
    reducer: persistorsReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE]
            }
        })
})

export const persistorsStore = persistStore(store)


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch