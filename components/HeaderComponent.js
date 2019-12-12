import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import { TOGGLE_MENU } from '../store/MenuState';
import { Layout, Avatar, Row, Col, Menu, Dropdown, Icon } from 'antd';
import Router from 'next/router';
import { removeUsername, getUsername, removeToken } from '../config/storageConfig';
const { Header } = Layout;
import { Z_INDEX_HEADER } from '../constant/constants';

const connectToRedux = connect(pick(['isOpenMenu']), dispatch => ({
  displayNotify: (type, message) => {
    dispatch({ type: type, payload: { message: message, options: {} } })
  },
  toggleMenu: bool => {
    dispatch({ type: TOGGLE_MENU, payload: { toggleMenu: bool } })
  }
}));

const logout = () => {
  removeUsername();
  removeToken()
  Router.push("/login")
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
        <a onClick={() => logout()} target="_blank" rel="noopener noreferrer">
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
    setUsername(getUsername())
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