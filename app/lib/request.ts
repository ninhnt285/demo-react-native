import {getAuthHeader, setToken} from './token';
import {useDispatch} from '~/store';
import {apiUrl} from '~/config';

const authUrls = ['/login', '/register'];

export function useRequest() {
  const dispatch = useDispatch();
  const fetcher = async (url: string, options: any = {method: 'GET'}) => {
    try {
      const authHeader = await getAuthHeader();
      console.log(url, authHeader);
      const newOptions = {
        ...options,
        headers: {'Content-Type': 'application/json', ...authHeader},
      };
      // Send request
      const response = await fetch(apiUrl + url, newOptions);

      // Logout if get 401 error
      if (!authUrls.includes(url) && response.status === 401) {
        await setToken(null);
        dispatch({type: 'SET_USER', payload: null});
        throw new Error('401 Error');
      }

      const responseData = await response.json();
      return responseData;
    } catch (err) {
      throw err;
    }
  };

  return fetcher;
}
