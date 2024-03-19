import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { socket } from '../../socket/SocketClient';
import { MessageData } from '../../types/interfaces';

export interface OnSubscribeToChatMessage {
  supportReqID: string,
  message: MessageData,
}

export interface SocketIOState {
  isConnected: boolean,
  subscribeToChatEvents: OnSubscribeToChatMessage[],
  errorEvents: Function[],
}

const initialState: SocketIOState = {
  isConnected: socket.connected,
  subscribeToChatEvents: [],
  errorEvents: [],
};

const socketSlice = createSlice({
  name: 'socketIO',
  initialState,
  reducers: {
    onConnectSocket: (state: SocketIOState) => {
      state.isConnected = true; 
    },
    onDisconnectSocket: (state: SocketIOState) => {
      state.isConnected = false; 
    },
    onSubscribeToChatEvents: (state: SocketIOState, { payload }: PayloadAction<OnSubscribeToChatMessage>): void => {
      state.subscribeToChatEvents = [...state.subscribeToChatEvents, payload];
    },
    onErrorEvents: (state: SocketIOState, { payload }: PayloadAction<Function>): void => {
      state.errorEvents = [...state.errorEvents, payload];
    },
  },
})

export const { onConnectSocket, onDisconnectSocket, onSubscribeToChatEvents, onErrorEvents } = socketSlice.actions

export default socketSlice.reducer;