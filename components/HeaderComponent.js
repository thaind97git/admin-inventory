import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import { TOGGLE_MENU } from '../store/MenuState';
import { Layout, Avatar, Row, Col, Menu, Dropdown, Icon } from 'antd';
import Router from 'next/router';
import * as storageConfig from '../config/storageConfig';
const { Header } = Layout;
import { LOGOUT } from '../constant/UrlApi';
import { TOAST_ERROR } from '../utils/actions';
import { Z_INDEX_HEADER } from '../constant/constants';

const connectToRedux = connect(pick(['isOpenMenu']), dispatch => ({
    displayNotify: (type, message) => {
        dispatch({ type: type, payload: { message: message, options: {} } })
    },
    toggleMenu: bool => {
        dispatch({ type: TOGGLE_MENU, payload: { toggleMenu: bool } })
    }
}));

const logout = (displayNotify) => {
    const optionLogout = {
        method: "GET",
        data: {},
        withCredentials: true
    }
    axios(LOGOUT, optionLogout)
        .then(({ data }) => {
            if (data.status === 200) {
                storageConfig.removeUsername();
                Router.push("/login");
            } else {
                displayNotify(TOAST_ERROR, 'Có lỗi không xác định !')
            }
        })
        .catch(err => {
            displayNotify(TOAST_ERROR, 'Có lỗi không xác định !')
        })
}


const menu = (username, displayNotify) => {
    return (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    Change password
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={() => logout(displayNotify)} target="_blank" rel="noopener noreferrer">
                    <Icon type="logout" />   Logout, {username}
                </a>
            </Menu.Item>
        </Menu>
    )
}


const HeaderComponent = ({
    title,
    displayNotify,
    isCollepse,
    toggleMenu,
    isOpenMenu
}) => {
    const [username, setUsername] = useState("");
    useEffect(() => {
        setUsername(storageConfig.getUsername())
    })
    return (
        <Fragment>
            <Header style={{
                background: '#6288e7',
                boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                position: 'fixed', 
                zIndex: Z_INDEX_HEADER, 
                width: '100%', 
            }}>
                <Row>
                    <Col span={23}>
                        <Row>
                            <Col xs={3} sm={2} lg={1}>
                                {
                                    isCollepse && <Icon
                                        onClick={() => toggleMenu(!isOpenMenu)}
                                        style={{ color: 'white', fontSize: 16, cursor: 'pointer' }}
                                        // type={isOpenMenu ? "menu" : "close"}
                                        type="menu"
                                         />
                                }
                            </Col>
                            <Col xs={21} sm={22} lg={23}>
                                <h3 className="title">{title}</h3>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1}>
                        <Dropdown overlay={menu(username, displayNotify)} placement="bottomRight">
                            <Avatar style={{ cursor: 'pointer' }} size="default" icon="user" />
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
            <style jsx>{`
                .title{
                    color: #fff;
                }
            `}</style>
        </Fragment>
    )
}
export default connectToRedux(HeaderComponent);