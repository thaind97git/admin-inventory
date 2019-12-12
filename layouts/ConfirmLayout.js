import { Modal } from 'antd';

const confirm = Modal.confirm;

function defaultFunc() {
  console.log('default confirm !')
}

function ConfirmLayout({
  title,
  content,
  okText,
  cancelText = "Cancel",
  functionOk
}) {
  confirm({
    title: title || 'Title confirm default !',
    content: content || 'Content confirm default !',
    okText: okText || 'OK',
    cancelText: cancelText || 'Cancel',
    onOk() {
      return (functionOk ? functionOk() : defaultFunc())
    },
    onCancel() { },
  });
}

module.exports = ConfirmLayout;