import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch } from '../store/hooks';
import {
  OnSubscribeToChatMessage,
  onConnectSocket,
  onDisconnectSocket,
  onErrorEvents,
  onSubscribeToChatEvents
} from '../store/socketSlice';

export const socket = io(import.meta.env.VITE_SERVER_URL, {
  autoConnect: false,
});

export const SocketClient = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function onConnect() {
      dispatch(onConnectSocket());
    }

    function onDisconnect() {
      dispatch(onDisconnectSocket());
    }

    function onSubscribeToChatEvent(value: OnSubscribeToChatMessage ) {
      dispatch(onSubscribeToChatEvents(value));
    }

    function onErrorEvent(value: (...args: any[]) => void ) {
      dispatch(onErrorEvents(value));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('subscribeToChat', onSubscribeToChatEvent);
    socket.on('error', onErrorEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('subscribeToChat', onSubscribeToChatEvent);
      socket.off('error', onErrorEvent);
    };
  }, []);
};