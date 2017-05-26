'use-strict'

import tree from '../store/tree'
import { REHYDRATE } from 'redux-persist/constants'

export default (state = tree.eth, action) => {
  switch(action.type) {
    case REHYDRATE:
      return Object.assign({},
        state,
        action.payload.eth
      )
    default:
      return state
  }
}