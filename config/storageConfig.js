import { isServer } from '../utils'
const key = '__token';
const __username = 'j_username'
export const setToken = token => localStorage.setItem(key, token);

export const getToken = () => localStorage.getItem(key);

export const removeToken = () => localStorage.removeItem(key);

export const setUsername = username => localStorage.setItem(__username, username)

export const removeUsername = () => localStorage.removeItem(__username)

export const getUsername = () => localStorage.getItem(__username)
