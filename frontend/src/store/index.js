import {configureStore,combineReducers} from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from "../redux/reducer/auth.reducer";
const rootReducer = combineReducers({
    auth: authReducer,
})
const persistConfig = {
    key: 'root',
    storage,
    whitelist:[],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware : (getDefaultMiddleWare) => getDefaultMiddleWare({
        serializableCheck : false
    })
});
export const persistor = persistStore(store);