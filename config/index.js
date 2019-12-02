import axios from 'axios';
import { REQUEST_OPTION_DEFAULT } from './options';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
export const requestAPI = ({ 
    method = 'GET',
    url = '',
    data = {},
    headers = {},
    responseType = 'json',
}) => {
    if (url.length === 0) {
        console.log('URL is require');
        return
    }
    const opt = {
        method: method,
        url: url,
        data: data,
        headers: headers,
        responseType: responseType,
        cancelToken: source.token
    }
    return axios(Object.assign(REQUEST_OPTION_DEFAULT, opt));
}

export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: { span: 6 },
        lg: { span: 7 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        md: { span: 18 },
        lg: { span: 17 }
    }
}
export const spanCol = {
    span: 24,
    md: 24,
    lg: 12
}

export const DEFAULT_PAGING = {
    pageSize: 10,
    pageIndex: 1
}
