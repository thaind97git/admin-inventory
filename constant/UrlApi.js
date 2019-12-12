const HTTP = "http://";
// const HTTP = "";
const PORT = "";
// const SERVER_IP = "192.168.2.105:8000";
// 172.20.10.11
// localhost
// myip
// const SERVER_IP = "192.168.1.34"; //mode
// const SERVER_IP = "172.20.10.2"; //iphone
const SERVER_IP = "inventorymanagement-api.azurewebsites.net";
export const SERVER_PATH = HTTP + SERVER_IP + PORT;

const SERVER_PORT = PORT;

export const CHECK_LOGIN = SERVER_PATH + "/kiem-tra-dang-nhap"
export const LOGIN = SERVER_PATH + "/nhan-vien/dang-nhap";
export const LOGOUT = SERVER_PATH + "/dang-xuat";
/*============USER================*/
export const GET_USERS = SERVER_PATH + "/nhan-vien";
export const CREATE_USER = SERVER_PATH + "/nhan-vien/dang-ky";
export const UPDATE_USER = SERVER_PATH + "/nhan-vien";
export const DELETE_USER = SERVER_PATH + "/nhan-vien";
export const GET_USER = SERVER_PATH + "/nhan-vien";
/*============MAJOR================*/
export const GET_MAJOR = SERVER_PATH + "/nganh-hoc";
export const CREATE_MAJOR = SERVER_PATH + "/nganh-hoc";
export const DELETE_MAJOR = SERVER_PATH + "/nganh-hoc";
export const UPDATE_MAJOR = SERVER_PATH + "/nganh-hoc";
/*============STUDENT================*/
export const GET_STUDENTS = SERVER_PATH + "/sinh-vien";
export const CREATE_STUDENT = SERVER_PATH + "/sinh-vien/dang-ky";
export const DELETE_STUDENT = SERVER_PATH + "/sinh-vien";
export const UPDATE_STUDENT = SERVER_PATH + "/sinh-vien";
export const GET_STUDENT = SERVER_PATH + "/sinh-vien";
/*============SCHOOL================*/
export const GET_SCHOOLS = SERVER_PATH + "/truong-hoc";
export const CREATE_SCHOOL = SERVER_PATH + "/truong-hoc";
export const DELETE_SCHOOL = SERVER_PATH + "/truong-hoc";
export const UPDATE_SCHOOL = SERVER_PATH + "/truong-hoc";
export const GET_SCHOOL = SERVER_PATH + "/truong-hoc";
/*============EXAM================*/
export const GET_EXAMS = SERVER_PATH + "/ky-thi";
export const CREATE_EXAM = SERVER_PATH + "/ky-thi";
export const DELETE_EXAM = SERVER_PATH + "/ky-thi";
export const UPDATE_EXAM = SERVER_PATH + "/ky-thi";
export const GET_EXAM = SERVER_PATH + "/ky-thi";



export const GET_PROVINCES = SERVER_PATH + "/dia-chi/tinh-thanh-pho";
export const GET_DISTRICT = SERVER_PATH + "/dia-chi/quan-huyen";
export const GET_WARD = SERVER_PATH + "/dia-chi/phuong-xa";
export const GET_FORM_REGISTER = SERVER_PATH + "/form-dang-ky";
export const UPDATE_RESULT_FORM = SERVER_PATH + "/form-dang-ky"
export const UPDATE_EXAM_FORM = SERVER_PATH + "/form-dang-ky";

export const GET_METHOD_REGISTER = SERVER_PATH + "/phuong-thuc-dang-ky";
export const UPDATE_METHOD_REGISTER = SERVER_PATH + "/phuong-thuc-dang-ky";
export const DELETE_METHOD_REGISTER = SERVER_PATH + "/phuong-thuc-dang-ky";
export const GET_ONE_METHOD_REGISTER = SERVER_PATH + "/phuong-thuc-dang-ky";


module.exports.URL_SERVER = {
    SERVER_PORT
};


// const HTTP = "http://";
// const PORT = ":3001";
// const SERVER_IP = "localhost";
// const SERVER_PATH = HTTP + SERVER_IP + PORT + '/jdn97';

// const SERVER_PORT = PORT;

// const CHECK_LOGIN = SERVER_PATH + "/user/login"
// const CREATE_AUTHENTICATE = SERVER_PATH + "/user/authenticate/create";
// const CHECK_AUTH = SERVER_PATH + "/user/authenticate";
// /*============USER================*/
// const ALL_USER = SERVER_PATH + "/user/users";
// const CREATE_USER = SERVER_PATH + "/user/create";
// const UPDATE_USER = SERVER_PATH + "/user/update/:username";
// // const UPDATE_ROLE = SERVER_PATH + "/user/:username"
// const DELETE_USER = SERVER_PATH + "/user/delete/:username";
// /*============MENU================*/
// const CREATE_PARENT_MENU = SERVER_PATH + "/pmenu/create";
// const CREATE_SUB_MENU = SERVER_PATH + "/smenu/create";

// /*============PRODUCT================*/
// const CREATE_PRODUCT = SERVER_PATH + "/product/create";
// const ALL_PRODUCT = SERVER_PATH + "/product/products";
// const GET_PRODUCT_ID = SERVER_PATH + "/product/get-byid/:_id";
// const GET_PRODUCT_BYCODE = SERVER_PATH + "/product/get-bycode/:productCode";
// const DELETE_PRODUCT_BYCODE = SERVER_PATH + "/product/delete-bycode/:productCode"; 
// const UPDATE_PRODUCT_BYCODE = SERVER_PATH + "/product/update-bycode/:productCode";
// const GET_SIZE_BYCODE = SERVER_PATH + "/product/get-sizes/:productCode";

// /*============SIZES================*/
// const CREATE_SIZE = SERVER_PATH + "/size/create";
// const ALL_SIZE = SERVER_PATH + "/size/sizes";
// const GET_SIZE_BYID = SERVER_PATH + "/size/get-byid/:_id";
// const GET_SIZE_BYNAME = SERVER_PATH + "/size/get-byname/:name";
// const DELETE_SIZE_BYID = SERVER_PATH +"/size/delete-byid/:_id";
// const DELETE_SIZE_BYNAME = SERVER_PATH +"/size/delete-byname/:name";
// const UPDATE_SIZE_BYID = SERVER_PATH + "/size/update-byid/:_id";
// const UPDATE_SIZE_BYNAME = SERVER_PATH + "/size/update-byname/:name";
// /*============COLORS================*/
// const CREATE_COLOR = SERVER_PATH + "/color/create";
// const ALL_COLOR = SERVER_PATH + "/color/colors";
// const GET_COLOR_BYID = SERVER_PATH + "/color/get-byid/:_id";
// const GET_COLOR_BYNAME = SERVER_PATH + "/color/get-byname/:name";
// const UPDATE_COLOR_BYID = SERVER_PATH + "/color/update-byid/:_id";
// const UPDATE_COLOR_BYNAME = SERVER_PATH + "/color/update-byname/:name";
// const DELETE_COLOR_BYID = SERVER_PATH + "/color/delete-byid/:_id";
// const DELETE_COLOR_BYNAME = SERVER_PATH + "/color/delete-byname/:name";
// module.exports.URL_SERVER = {
//     SERVER_PORT
// };
// module.exports.URL_USER = {
//     CHECK_LOGIN,
//     CREATE_AUTHENTICATE,
//     CHECK_AUTH,
//     ALL_USER,
//     CREATE_USER,
//     UPDATE_USER,
//     DELETE_USER,
// };
// module.exports.URL_PRODUCT = {
//     CREATE_PRODUCT,
//     ALL_PRODUCT,
//     DELETE_PRODUCT_BYCODE,
//     UPDATE_PRODUCT_BYCODE,
//     GET_SIZE_BYCODE,
//     GET_PRODUCT_BYCODE,
//     GET_PRODUCT_ID
// };
// module.exports.URL_MENU = {
//     CREATE_PARENT_MENU,
//     CREATE_SUB_MENU
// };
// module.exports.URL_SIZE = {
//     ALL_SIZE,
//     GET_SIZE_BYID,
//     GET_SIZE_BYNAME,
//     CREATE_SIZE,
//     UPDATE_SIZE_BYID,
//     UPDATE_SIZE_BYNAME,
//     DELETE_SIZE_BYID,
//     DELETE_SIZE_BYNAME
// }
// module.exports.URL_COLOR = {
//     ALL_COLOR,
//     GET_COLOR_BYID,
//     GET_COLOR_BYNAME,
//     CREATE_COLOR,
//     UPDATE_COLOR_BYID,
//     UPDATE_COLOR_BYNAME,
//     DELETE_COLOR_BYID,
//     DELETE_COLOR_BYNAME
// }