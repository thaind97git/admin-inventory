import Router from 'next/router';
import axios from 'axios';

export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}

export function redirectURL(url, option) {
    return Router.replace(url)
}

export function currentUrl() {
    return Router.route;
}

export async function fetchData(Url, body = {}) {
    const tmp = await axios.get(Url, body)
    let data = tmp.data ? tmp.data.data : []
    return data;
}

export function mapIndex( array = [], index = 0 ) {
    if (Array.isArray(array)) {
        let currentNo = index;
        array.map(item => {
            currentNo++;
            item.key = currentNo;
        })
        return array;
    }
    return [];
}