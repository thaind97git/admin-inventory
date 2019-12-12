import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import LoadingComponent from '../components/LoadingComponent';
import { bindActionCreators } from 'redux';
import * as UserState from '../store/UserState';

const connectToRedux = connect(
    pick(['isLoggedIn']),
    dispatch => ({
        userAction: bindActionCreators(UserState, dispatch)
    })
)

function Authen(AuthComponent) {
    class AuthenHOC extends Component {
        static getInitialProps = async ctx => {
            return AuthComponent.getInitialProps
                ? AuthComponent.getInitialProps(ctx)
                : {};
        };
        componentDidMount() {
            const { checkHOC } = this.props.userAction;
            checkHOC()
        }
        render() {
            const { isLoggedIn } = this.props;
            return (
                !isLoggedIn ? <LoadingComponent /> : <AuthComponent />
            )
        }
    }
    return connectToRedux(AuthenHOC);
}
export default Authen;