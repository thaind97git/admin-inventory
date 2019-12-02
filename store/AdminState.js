import { GET_PROVINCES, GET_DISTRICT, GET_WARD, GET_SCHOOLS, GET_EXAMS } from "../constant/UrlApi";
import { requestAPI } from "../config";
import { DEFAULT_PAGING } from '../config';

export const SET_TOTAL_PAGE = "SET_TOTAL_PAGE";
export const FETCH_LOADING = "FETCH_LOADING";
export const GET_PROVINCES_API = "GET_PROVINCES_API";
export const GET_DISTRICTS_API = "GET_DISTRICTS_API";
export const GET_WARDS_API = "GET_WARDS_API";

export const GET_SCHOOLS_API = "GET_SCHOOLS_API";
export const GET_EXAMS_API = "GET_EXAMS_API";


export const getListProvincesAPI = () => async dispatch => {
    const opt2 = { method: 'GET', url: GET_PROVINCES }
    await requestAPI(opt2).then(rs => {
        dispatch(getListProvincesAPISelector(rs.data.data || []))
    }).catch(err => {
        console.log(err)
        dispatch(getListProvincesAPISelector([]))
    })
}

const getListProvincesAPISelector = (data) => ({
    type: GET_PROVINCES_API,
    payload: {
        data: data
    }
})

export const getListDistrictsAPI = idCity => async dispatch => {
    const opt2 = { method: 'GET', url: `${GET_DISTRICT}/${idCity}` }
    await requestAPI(opt2).then(rs => {
        dispatch(getListDistrictAPISelector(rs.data.data || []))
    }).catch(err => {
        console.log(err)
        dispatch(getListDistrictAPISelector([]))
    })
}

const getListDistrictAPISelector = (data) => ({
    type: GET_DISTRICTS_API,
    payload: {
        data: data
    }
})

export const getListWardsAPI = idDistrict => async dispatch => {
    const opt2 = { method: 'GET', url: `${GET_WARD}/${idDistrict}` }
    await requestAPI(opt2).then(rs => {
        dispatch(getListWardAPISelector(rs.data.data || []))
    }).catch(err => {
        console.log(err)
        dispatch(getListWardAPISelector([]))
    })
}

const getListWardAPISelector = (data) => ({
    type: GET_WARDS_API,
    payload: {
        data: data
    }
})

export const getListSchoolsAPI = () => async dispatch => {
    const opt2 = { method: 'GET', url: `${GET_SCHOOLS}?page_num=1&page_row=100` }
    await requestAPI(opt2).then(rs => {
        dispatch(getListSchoolsAPISelector(rs.data.data.result || []))
    }).catch(err => {
        console.log(err)
        dispatch(getListSchoolsAPISelector([]))
    })
}

const getListSchoolsAPISelector = (data) => ({
    type: GET_SCHOOLS_API,
    payload: {
        data: data
    }
})

export const getAllListExamsAPI = () => async dispatch => {
    const opt = {
        method: 'GET',
        url: `${GET_EXAMS}?page_num=1&page_row=100`
    }
    await requestAPI(opt).then(rs => {
        dispatch(getListExamsAPISelector(rs.data.data.result || []))
    }).catch(err => {
        console.log(err)
        dispatch(getListExamsAPISelector([]))
    })
}

const getListExamsAPISelector = (data) => ({
    type: GET_EXAMS_API,
    payload: {
        data: data
    }
})



export default {
    listProvinces: (state = [], { type, payload }) => {
        if (type === GET_PROVINCES_API) {
            return payload.data;
        }
        return state;
    },
    listDistricts: (state = [], { type, payload }) => {
        if (type === GET_DISTRICTS_API) {
            return payload.data
        }
        return state;
    },
    listWards: (state = [], { type, payload }) => {
        if (type === GET_WARDS_API) {
            return payload.data
        }
        return state;
    },
    student: (state = {}, { type, payload }) => {
        if (type === GET_STUDENT_DETAIL_API) {
            return payload.data
        }
        return state;
    },
    listSchools: (state = [], { type, payload }) => {
        if (type === GET_SCHOOLS_API) {
            return payload.data;
        }
        return state;
    },
    listExams: (state = [], { type, payload }) => {
        if (type === GET_EXAMS_API) {
            return payload.data;
        }
        return state;
    },
}