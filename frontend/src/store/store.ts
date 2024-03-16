import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import hotelReducer from './hotels/hotelsSlice';
import roomsReducer from './rooms/roomsSlice';

const store = configureStore({
  reducer: {
    reducer: {
      user: userReducer,
      hotels: hotelReducer,
      rooms: roomsReducer,
    },
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;