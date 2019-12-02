import React, { Component } from 'react';
import LoginComponent from '../components/LoginComponent';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import { bindActionCreators } from 'redux';
import * as UserState from '../store/UserState';

const connectToRedux = connect(
    pick(['isLoggedIn']),
    dispatch => ({
        userAction: bindActionCreators(UserState, dispatch)
    })
)

class LoginPage extends Component {
    componentDidMount() {
        const { checkHOC } = this.props.userAction
        checkHOC();
    }
    render() {
        return (
            <LoginComponent/>
        )
    }

}
export default (connectToRedux(LoginPage));