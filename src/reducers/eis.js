'use-strict'

import tree from '../store/tree'
import { REHYDRATE } from 'redux-persist/constants'
import {
  ACTION_CREATE_DID,
} from '../const'

export default (state = tree.eis, action) => {
  switch(action.type) {
    case ACTION_CREATE_DID: {
      return {
        ...state,
        events: {
          ...state.events,
          createDID: {
            ...state.events.createDID,
            data: state.events.createDID.data.concat([action.payload])
          }
        }
      }}
    case REHYDRATE:
      return {
        ...state,
        ...action.payload.eis,
      }
    default:
      return state
  }
}