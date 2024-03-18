import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeToken, setToken } from '../helpers/localStorage.helper';

interface UserState {
  access_token: string | null;
  role: string;
  isAuth: boolean;
  id: string | null;
}

const initialState: UserState = {
  access_token: null,
  role: 'client',
  isAuth: false,
  id: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ access_token: string, role: string, id: string }>) => {
      state.access_token = action.payload.access_token;
      setToken(action.payload.access_token);
      state.isAuth = true;
      state.role = action.payload.role;
      state.id = action.payload.id;

    },
    logout: (state) => {
      Object.assign(state, initialState);
      removeToken();
    },
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer;