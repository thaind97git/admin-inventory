import { Modal } from 'antd';
import { DIALOG_ERROR, DIALOG_INFO, DIALOG_WARN, DIALOG_SUCCESS } from '../utils/actions';

const DIALOG_DEFAULT_OPTIONS = {

}

const getDialogFunctionType = type => {
  switch (type) {
    case DIALOG_SUCCESS:
      return Modal.success;
    case DIALOG_ERROR:
      return Modal.error;
    case DIALOG_WARN:
      return Modal.warning;
    case DIALOG_INFO:
      return Modal.info;
    default:
      return toast;
  }
};

function isEmpty(value) {
  if (value === null || value === undefined || value === '') {
    return true;
  }
  return false;
}

export default {
  displayDialog: (state = null, { type, payload }) => {
    if (payload) {
      const { title, content = "", onOK, okText } = payload;
      if (!title) {
        return state;
      }
      const doDialog = getDialogFunctionType(type);
      if (doDialog) {
        doDialog({
          title: title,
          content: content,
          onOk() { typeof (onOK) === 'function' ? onOK() : function () { } },
          okText: okText || 'OK',
          maskClosable: true,
        })
        return payload;
      }
    }
    return state;
  }
}