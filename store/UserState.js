import axios from 'axios';
import Router from 'next/router';
import { CHECK_LOGIN } from '../constant/UrlApi';
import * as Utils from '../utils/utils';
import { LOGIN_SUCCESS, LOGIN_FAIL } from '../utils/actions';

const optionCheckLogin = {
    method: "GET",
    data: {},
    withCredentials: true
}

export const checkHOC = () => dispatch => {
    axios(CHECK_LOGIN, optionCheckLogin)
        .then(({ data }) => {
            if (!Utils.isEmptyObject(data.data)) {
                dispatch(login_success())
                Utils.currentUrl() === '/login' && Utils.redirectURL('/dashboard');
            } else {
                dispatch(login_fail())
            }
            
        })
        .catch(err => {
            dispatch(login_fail())
        })
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
        // if (type === LOGOUT) {
        //     axios.get(URL_USER.LOGOUT)
        //     return false;
        // }
        return state;
    }
}