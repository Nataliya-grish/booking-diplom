import axios, { AxiosResponse } from "axios";
import { getToken } from "../helpers/localStorage.helper";

async function fetchData(url: string, opts: object, callback?: () => void): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: `${import.meta.env.VITE_MAIN_URL}`,
      url,
      headers: {
        Authorization: 'Bearer ' + (getToken() || ''),
      },
      responseType: 'json',
      ...opts,
    })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          reject(error.response);
        } else {
          reject(error);
        }
      })
      .finally(callback);
  });
}

export default fetchData;