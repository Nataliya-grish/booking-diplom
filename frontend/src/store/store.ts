import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import hotelReducer from './hotels/hotelsSlice';

const store = configureStore({
  reducer: {
    reducer: {
      user: userReducer,
      hotels: hotelReducer,
    },
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;