'use-strict'

/* base libs */
import { combineReducers } from 'redux'
/* functions/utils */
import eis from './eis'
import eds from './eds'
import eth from './eth'

const rootReducer = combineReducers({
  eth,
  eis,
  eds,
})

export default rootReducer