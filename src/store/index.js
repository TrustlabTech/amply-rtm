'use-strict'

import thunk from 'redux-thunk'
import localForage from 'localforage'
import rootReducer from '../reducers'
import { persistStore, autoRehydrate } from 'redux-persist'
import { createStore, applyMiddleware, compose } from 'redux'

export default (onComplete) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const enhancers = composeEnhancers(applyMiddleware(thunk), autoRehydrate())

  const store = createStore(rootReducer, undefined, enhancers)

  persistStore(store, { storage: localForage }, onComplete)

  return store
}