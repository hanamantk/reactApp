import {combineReducers} from 'redux'
import prodReducer from './prodReducer'

export default  combineReducers({
    prod:prodReducer
})