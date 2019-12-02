import { GET_STUDENT } from "../constant/UrlApi";
import { requestAPI } from "../config";

export const GET_STUDENTS_API = "GET_STUDENTS_API";
export const GET_STUDENT_DETAIL_API = "GET_STUDENT_DETAIL_API";
export const getStudentDetailAPI = (id) => async dispatch => {
    const opt2 = { method: 'GET', url: `${GET_STUDENT}/${id}` }
    await requestAPI(opt2).then(rs => {
        dispatch(getStudentDetailAPISelector(rs.data.data || {}))
    }).catch(err => {
        console.log(err)
        dispatch(getStudentDetailAPISelector({}))
    })
}

const getStudentDetailAPISelector = (data) => ({
    type: GET_STUDENT_DETAIL_API,
    payload: {
        data: data
    }
})


export const getListStudentsAPI = (id) => async dispatch => {
    const opt = { method: 'GET', url: GET_STUDENT }
    await requestAPI(opt).then(rs => {
        dispatch(getListStudentsAPISelector(rs.data.data || []))
    }).catch(err => {
        console.log(err)
        dispatch(getListStudentsAPISelector([]))
    })
}

const getListStudentsAPISelector = (data) => ({
    type: GET_STUDENTS_API,
    payload: {
        data: data
    }
})

export default {
    students: (state = [], { type, payload }) => {
        if (type === GET_STUDENTS_API) {
            return payload.data
        }
        return state;
    },
    student: (state = {}, { type, payload }) => {
        if (type === GET_STUDENT_DETAIL_API) {
            return payload.data
        }
        return state;
    }
}