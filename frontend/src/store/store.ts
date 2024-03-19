import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import hotelReducer from './hotelsSlice';
import roomsReducer from './roomsSlice';
import usersReducer from './usersSlice';
import socketIOReducer from './socketSlice';

export const store: any = configureStore({
  reducer: {
      user: userReducer,
      hotels: hotelReducer,
      rooms: roomsReducer,
      users: usersReducer,
      socketIO: socketIOReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

