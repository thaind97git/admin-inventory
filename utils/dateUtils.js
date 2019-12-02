import moment from 'moment';
export const formatDateServer = (date) => {
    return date ? moment(date).format('DD/MM/YYYY') : '';
}
export const formatTimeServer = (time) => {
    return time ? moment(time).format('h:mm A') : '';
}

export const momentDateUser = (timeSpan) => {
    return timeSpan ? moment(+timeSpan).format("DD/MM/YYYY h:mm A") : '';
}

export const momentDatePicker = (time) => {
    return time ? moment(time, 'DD/MM/YYYY') : null;
}

export const momentTimeSpanPicker = (timeSpan) => {
    return timeSpan ? moment.unix(+timeSpan) : null;
}

export const momentTimeSpanInput = (timeSpan) => {
    return timeSpan ? moment.unix(+timeSpan).format("DD/MM/YYYY") : null;
}

export const momentTimePickerUser = (time) => {
    return time ? moment(time, 'h:mm A') : null
}