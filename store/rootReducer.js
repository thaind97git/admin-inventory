import userReducer from './UserState';
import toastReducer from './ToastState';
import menuReducer from './MenuState';
import dialogReducer from './DialogState';
import UtilsReducer from './UtilsState';
import AdminReducer from './AdminState';
import ProductReducer from './ProductState';
import { combineReducers } from 'redux';
import { reducers as apiReducers } from 'redux-api-call';

export default combineReducers({
    ...apiReducers,
    ...userReducer,
    ...toastReducer,
    ...menuReducer,
    ...dialogReducer,
    ...UtilsReducer,
    ...AdminReducer,
    ...ProductReducer
})