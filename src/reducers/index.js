import { combineReducers } from 'redux'
import nav from './navigations'
import auth from './auth'
import locations from './locations'


const rootReducer = combineReducers({ nav, auth, locations })

export default rootReducer