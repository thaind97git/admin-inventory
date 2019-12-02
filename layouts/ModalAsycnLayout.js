import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import ButtonLayout from './ButtonLayout';
import { DIALOG_SUCCESS, DIALOG_ERROR } from '../utils/actions';

const connectToRedux = connect(null, dispatch => ({
    displayDialog: (type, title, content) => {
        dispatch({ type: type, payload: { title: title, content: content } })
    }
}))
const ModalAsycnLayout = ({
    cancelModelText = "Cancel", // text Button cancel of Model
    okModelText = "Ok", // text Button Ok of Model
    children, // content of Model
    titleModel = "Title model default", // title of Model
    PromiseCallAPI, 
    valueButton,
    titleButton, // title Button before open Model
    typeButton, // type Button before open Model
    sizeButton, // size Button before open Model
    isDisplayDialog = true, // is Display dialog when execute PromiseCallAPI
    titleSuccessDialog,
    contentSuccessDialog,
    titleErrorDialog,
    contentErrorDialog,
    displayDialog
}) => {
    const [visible, setVisible] = useState(false); // Open model
    const [confirmLoading, setConfirmLoading] = useState(false)
    const handleOk = (PromiseCallAPI) => {
        setConfirmLoading(true);
        PromiseCallAPI.then((rs) => {
            setVisible(false)
            setConfirmLoading(false)
            isDisplayDialog && displayDialog(DIALOG_SUCCESS, titleSuccessDialog, contentSuccessDialog)
        }, err => {
            setVisible(false)
            setConfirmLoading(false)
            isDisplayDialog && displayDialog(DIALOG_ERROR, titleErrorDialog, contentErrorDialog)
        })
    };

    return (
        <Fragment>
            <ButtonLayout
                text={titleButton}
                type={typeButton}
                onClick={() => setVisible(true)}
                size={sizeButton}
                value={valueButton}
            />
            <Modal
                title={titleModel}
                cancelText={cancelModelText}
                okText={okModelText}
                visible={visible}
                confirmLoading={confirmLoading}
                onOk={() => handleOk(PromiseCallAPI)}
                onCancel={() => setVisible(false)}

            >
                <div>{children}</div>
            </Modal>
        </Fragment>
    );
}

export default connectToRedux(ModalAsycnLayout);