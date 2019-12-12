import { GET_STUDENT } from "../constant/UrlApi";
import { requestAPI, doGet } from "../config";

export const GET_STUDENTS_API = "GET_STUDENTS_API";
export const GET_PRODUCT_DETAILS_API = "GET_STUDENT_DETAIL_API";
export const getProductDetailsAPI = id => async dispatch => {
  let product = {}
  try {
    const rs = await doGet({
      path: `/api/Products/${id}`
    })
    product = (rs && rs.data) ? (rs.data[0] || {}) : {}
  } catch (error) {
    product = {};
  }
  dispatch(getProductDetailsAPISelector(product))
}

const getProductDetailsAPISelector = (data) => ({
  type: GET_PRODUCT_DETAILS_API,
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
  product: (state = {}, { type, payload }) => {
    if (type === GET_PRODUCT_DETAILS_API) {
      return payload.data
    }
    return state;
  }
}