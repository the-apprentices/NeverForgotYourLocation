import { combineReducers } from 'redux'
import nav from './navigations'
import auth from './auth'
import locations from './locations'
import saveScreen from './saveScreen'

const rootReducer = combineReducers({ nav, auth, locations, saveScreen })

export default rootReducer