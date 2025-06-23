import axios from 'axios';
import { toast } from 'react-toastify';
import { triggerClearAuth } from '../utils/clearAuthHandler';
import { ErrorCode } from '../constants/errorCode';
import { ErrorMessage } from '../constants/errorMessages';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isHandlingTokenError = false;

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const { status } = error.response;
    const errorCode = error.response.data.errorCode as ErrorCode;
    const message = ErrorMessage[errorCode] || 'default error';

    if (errorCode === ErrorCode.TOKEN_INVALID || errorCode === ErrorCode.TOKEN_EXPIRED) {
      if (!isHandlingTokenError) {
        isHandlingTokenError = true;
        toast.error(message);
        triggerClearAuth(() => setTimeout(() => (isHandlingTokenError = false), 0));
      }
      return;
    }

    if (status >= 500) {
      toast.error(ErrorMessage.INTERNAL_SERVER_ERROR);
      return Promise.reject(error);
    }

    // TODO handle other errors

    return Promise.reject(error);
  }
);

export default apiClient;
