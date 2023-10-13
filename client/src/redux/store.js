import { configureStore} from '@reduxjs/toolkit'
import userReducer from "./user/userSlice"


export const store = configureStore({
  reducer: {user: userReducer},
  middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware({
    serializableCheck:false,
  }),
  //add any additional middleware needed here

],
})