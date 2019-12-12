import { GET_PROVINCES, GET_DISTRICT, GET_WARD, GET_SCHOOLS, GET_EXAMS } from "../constant/UrlApi";
import { requestAPI, doGet } from "../config";
import { DEFAULT_PAGING } from '../config';

export const SET_TOTAL_PAGE = "SET_TOTAL_PAGE";
export const FETCH_LOADING = "FETCH_LOADING";
export const GET_CATEGORIES_API = "GET_CATEGORIES_API";
export const GET_UNITS_API = "GET_UNITS_API";
export const GET_WARDS_API = "GET_WARDS_API";

export const GET_SCHOOLS_API = "GET_SCHOOLS_API";
export const GET_EXAMS_API = "GET_EXAMS_API";

const GET_EMPLOYEE_BY_ID_API = "GET_EMPLOYEE_BY_ID_API";


export const getListCategoriesAPI = () => async dispatch => {
  let categories = [];
  try {
    const rs = await doGet({
      path: "/api/Categories"
    })
    categories = (rs && rs.data) ? rs.data : []
  } catch (error) {
    categories = [];
  }
  dispatch(getListCategoriesAPISelector(categories))
}

const getListCategoriesAPISelector = data => ({
  type: GET_CATEGORIES_API,
  payload: {
    data: data
  }
})

export const getListUnitsAPI = () => async dispatch => {
  let units = [];
  try {
    const rs = await doGet({
      path: "/api/Units"
    })
    units = (rs && rs.data) ? rs.data : []
  } catch (error) {
    units = [];
  }
  dispatch(getListUnitsAPISelector(units))
}

const getListUnitsAPISelector = (data) => ({
  type: GET_UNITS_API,
  payload: {
    data: data
  }
})

export const getEmployeeByIdAPI = id => async dispatch => {
  let employee = {};
  try {
    const rs = await doGet({
      path: "/api/Employees/" + id
    })
    employee = (rs && rs.data) ? rs.data : {}
  } catch (error) {
    employee = {};
  }
  dispatch(getEmployeeByIdAPISelector(employee))
}

const getEmployeeByIdAPISelector = (data) => ({
  type: GET_EMPLOYEE_BY_ID_API,
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
  listCategories: (state = [], { type, payload }) => {
    if (type === GET_CATEGORIES_API) {
      return payload.data;
    }
    return state;
  },
  listUnits: (state = [], { type, payload }) => {
    if (type === GET_UNITS_API) {
      return payload.data
    }
    return state;
  },
  employee: (state = {}, { type, payload }) => {
    if (type === GET_EMPLOYEE_BY_ID_API) {
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