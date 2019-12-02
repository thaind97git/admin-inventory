
const key = 'j_token';
const __username = 'j_username'
/**
 * Get value with `key` from Web Storage
 * @name getItem
 * @param {string} key
 * @returns {Object} Object value get from `key` 
 */
export const getItem = function getItem(key) {
    let result = localStorage.getItem(key)
    return JSON.parse(result);
}

/**
 * Set new value with `key` from Web Storage
 * @name setItem
 * @param {string} key
 * @param {any} value
 */
export const setItem = function setItem(key, value) {
    let valueSet = JSON.stringify(value);
    return localStorage.setItem(key, valueSet);
}

/**
 * Remove [`key` and `this.value`] from Web Storage
 * @name removeItem
 * @param {string} key
 */
export const removeItem = (key) => {
    return localStorage.removeItem(key);
}

/**
 * RemoveAll [`key` and `this.value`] from Web Storage
 * @name removeAll
 * @param {string} key
 */
export const removeAll = function removeAll() {
    return localStorage.removeAll();
}

export const setToken = (token) => {
    return localStorage.setItem(key, token);
}

export const getToken = () => {
    return localStorage.getItem(key);
}
export const removeToken = () => {
    return localStorage.removeItem(key);
}

export const setUsername = (username) => {
    return localStorage.setItem(__username, username)
}

export const removeUsername = () => {
    return localStorage.removeItem(__username)
}

export const getUsername = () => {
    return localStorage.getItem(__username)
}
