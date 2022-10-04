import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage';
import appReducer from './reducers/index';

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    //   if (action.type === 'USER_LOGGED_OUT') {
    //     // for all keys defined in your persistConfig(s)
    //     AsyncStorage.removeItem('persist:root')
    //     state = undefined;
    //   }
    return appReducer(state, action);
};

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const initStore = () => {
    let store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),)
    let persistor = persistStore(store)
    return { store, persistor }
}