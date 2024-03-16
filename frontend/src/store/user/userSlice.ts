import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeToken, setToken } from '../../helpers/localStorage.helper';

interface UserState {
  token: string | null,
  role: string,
  isAuth: boolean,
}

const initialState: UserState = {
  token: null,
  role: 'client',
  isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; role: string }>) => {
      state.token = action.payload.token;
      setToken(action.payload.token);
      state.isAuth = true;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      removeToken();
    },
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer