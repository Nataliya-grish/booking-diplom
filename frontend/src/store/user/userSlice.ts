import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeToken, setToken } from '../../helpers/localStorage.helper';

interface UserState {
  token: string | null,
  isAuth: boolean,
}

const initialState: UserState = {
  token: null,
  isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      setToken(action.payload.token);
      state.isAuth = true;
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