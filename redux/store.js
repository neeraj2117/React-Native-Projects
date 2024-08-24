import { configureStore } from '@reduxjs/toolkit'
import user, {userSlice} from '../redux/slices/user'

export const store = configureStore({
  reducer: {
    user
  }
})
