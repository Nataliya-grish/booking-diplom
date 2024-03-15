import { useState } from 'react';
import fetchData from './fetchData';
import { RegData, SearchHotelsDto } from '../types/interfaces';

export default function useFetchData() {
  const [usersLoading, setUsersLoading] = useState(true);

  const usersDB = {
    loading: usersLoading,
    getInfo() {
      setUsersLoading(true);

      const result = fetchData('users/findall', { method: 'GET' }, () => setUsersLoading(false));
      return result;
    },
  };

  const authCheck = {
    getInfo() {
      const result = fetchData('auth/checkauth', { method: 'GET' });
      return result;
    }
  }

  const authUser = {
    login(email: string, password: string) {
      const result = fetchData('auth/signin', { method: 'POST', data: { email, password } });
      return result;
    },
    register(data: RegData) {
      const result = fetchData('auth/signup', { method: 'POST', data });
      return result;
    }
  }

  const hotelsAPI = {
    search(searchParams: SearchHotelsDto) {
      const result = fetchData('hotels', { method: 'GET', params: searchParams });
      return result;
    },
  };

  return {
    usersDB, authCheck, authUser, hotelsAPI
  };
}