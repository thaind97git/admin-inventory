import { toast } from 'react-toastify';
import {
  TOAST_SUCCESS,
  TOAST_ERROR,
  TOAST_WARN,
  TOAST_INFO,
  TOAST_DEFAULT
} from '../utils/actions';

const TOAST_DEFAULT_OPTIONS = {
  position: 'top-right',
  autoClose: 5000,
  pauseOnHover: true,
  closeOnClick: true,
  hideProgressBar: false
};

const getToastFunctionType = type => {
  switch (type) {
    case TOAST_SUCCESS:
      return toast.success;
    case TOAST_ERROR:
      return toast.error;
    case TOAST_WARN:
      return toast.warn;
    case TOAST_INFO:
      return toast.info;
    case TOAST_DEFAULT:
      return toast;
    default:
      return null;
  }
};

export default {
  displayNotify(state = null, { type, payload }) {
    if (payload) {
      const { message, options = {} } = payload;
      if (!message) {
        return state;
      }
      const opts = Object.assign(TOAST_DEFAULT_OPTIONS, options);
      const doToast = getToastFunctionType(type);
      if (doToast) {
        doToast(message, opts);
        return payload;
      }
    }
    return state;
  }
};