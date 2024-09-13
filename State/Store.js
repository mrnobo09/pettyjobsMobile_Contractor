import {configureStore} from '@reduxjs/toolkit'
import loginReducer from './auth/loginSlice'
import jobReducer from "./jobSlice"
const initialState = {

}

const Store = configureStore(
    {
        reducer:{
            login:loginReducer,
            getJob:jobReducer,
        },
    }
)

export default Store