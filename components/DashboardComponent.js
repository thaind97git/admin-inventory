import { Fragment } from 'react';
import { connect } from 'react-redux';
import ButtonLayout from '../layouts/ButtonLayout';
import ModalAsycnLayout from '../layouts/ModalAsycnLayout';
import ConfirmLayout from '../layouts/ConfirmLayout';
import axios from 'axios';
import { URL_USER } from '../constant/UrlApi';
import {
    TOAST_SUCCESS,
    TOAST_ERROR,
    TOAST_WARN,
    TOAST_DEFAULT,
    DIALOG_SUCCESS,
    DIALOG_ERROR,
    DIALOG_INFO
} from '../utils/actions';

const connectToRedux = connect(null, dispatch => ({
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message } })
    },
    displayDialog: (type, title, content) => {
        dispatch({ type: type, payload: { title: title, content: content } })
    }
}))

const DashboardComponent = ({ displayNotify, displayDialog }) => {
    return (
        <Fragment>
            <div className="padding-table">
                Dashboard Component
                <div>{process.env.NODE_ENV}</div>
                {/* <ButtonLayout 
                    onClick={() => displayDialog(DIALOG_SUCCESS, 'Success')} 
                    text="Success" 
                    type="success" />
                <ButtonLayout 
                    onClick={() => ConfirmLayout({})} 
                    text="Primary" 
                    type="primary" />
                <ButtonLayout 
                    onClick={() => displayDialog(DIALOG_ERROR, 'Error')} 
                    text="Danger" 
                    type="danger" />
                <ButtonLayout 
                    onClick={() => displayDialog(DIALOG_INFO, 'Infor')}
                    text="Default" 
                    type="default" />
                <ButtonLayout 
                    text="Toast Success" 
                    type="success" 
                    onClick={() => displayNotify(TOAST_SUCCESS, 'Toast notifycation success')} />
                <ButtonLayout 
                    text="Toast Error" 
                    type="danger" 
                    onClick={() => displayNotify(TOAST_ERROR, 'Toast notifycation error')} />
                <ButtonLayout 
                    text="Toast Warning" 
                    type="danger" 
                    onClick={() => displayNotify(TOAST_WARN, 'Toast notifycation warning')} />
                <ButtonLayout 
                    text="Toast Default" 
                    type="default" 
                    onClick={() => displayNotify(TOAST_DEFAULT, 'Toast notifycation default')} /> */}

                <h2>Inventory Management</h2>

                {/* <ModelAsycnLayout
                    titleModel={<h3>Here is model example about asycn</h3>}
                    okModelText="Save"
                    cancelModelText="Cancel"
                    PromiseCallAPI={axios.get(URL_USER.ALL_USER)}
                    titleButton="Open Modal with async logic"
                    typeButton="primary"
                    sizeButton="middle"
                    titleSuccessDialog={<h1>Success</h1>}
                    contentErrorDialog="Completed !"
                    titleErrorDialog={<h2>Error</h2>}
                    contentErrorDialog="Something wrong !"
                >
                    <h1>ModelComponent</h1>
                </ModelAsycnLayout> */}
            </div>
        </Fragment>
    )
}

export default connectToRedux(DashboardComponent);