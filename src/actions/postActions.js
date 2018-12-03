import {FETCH_PRODUCTS} from './types'

export const  fetchData=() => dispatch=>{
   
   return fetch('http://localhost/reactApp/Api/class.php')
    .then(resp=>resp.json())
    .then(items=>dispatch({
        type:FETCH_PRODUCTS,
        payload:items
    }));
}






