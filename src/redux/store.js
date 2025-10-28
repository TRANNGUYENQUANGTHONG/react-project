import { configureStore } from "@reduxjs/toolkit";
import reducerUser from "./reducers/reducerUser"
const store = configureStore({
    reducer:{
        users:reducerUser
    }
})
export default store;