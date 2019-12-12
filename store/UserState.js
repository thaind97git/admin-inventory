import Router from 'next/router';
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../utils/actions';
import { getToken } from '../config/storageConfig';
import { currentUrl, redirectURL } from '../utils'

export const checkHOC = () => dispatch => {
    if (getToken()) {
        dispatch(login_success())
        currentUrl() === '/login' && redirectURL('/dashboard');
    } else {
        dispatch(login_fail())
    }
}
export const login_success = () => ({
    type: LOGIN_SUCCESS,
    payload: {
        data: "Login success !"
    }
})
const login_fail = () => ({
    type: LOGIN_FAIL,
    payload: {
        data: "Login fail !"
    }
})


export default {
    isLoggedIn(state = false, { type, payload }) {
        if (type === LOGIN_SUCCESS) {
            return true;
        }
        if (type === LOGIN_FAIL) {
            Router.push('/login')
            return false;
        }
        return state;
    }
}