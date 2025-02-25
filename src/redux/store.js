import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { authReducer } from './auth'
import { summaryReducer } from './transactions'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
}

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
]

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    summary: summaryReducer,
  },
  middleware,
  devTools: true,
})

const persistor = persistStore(store)
export { store, persistor }
