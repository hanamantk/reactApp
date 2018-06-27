import {FETCH_USERS,NEW_EMP} from './types'

export const  fetchData=() => dispatch=>{
   return fetch('https://reqres.in/api/users/')
    .then(resp=>resp.json())
    .then(posts=>dispatch({
        type:FETCH_USERS,
        payload:posts
    }));
}

export const  getEmpDetail=(id) => dispatch=>{
    return fetch('https://reqres.in/api/users/'+id)
     .then(resp=>resp.json())
     .then(posts=>dispatch({
         type:NEW_EMP,
         payload:posts
     }));
 }





