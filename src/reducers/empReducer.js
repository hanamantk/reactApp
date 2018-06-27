import {FETCH_USERS,NEW_EMP} from '../actions/types'
const initialState={
    item:[],
    items:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case FETCH_USERS:
           return {
               ...state,
               items:action.payload
           }
         
           case NEW_EMP:
           return {
               ...state,
               items:action.payload
           } 
        default :
        return state;
    }
}