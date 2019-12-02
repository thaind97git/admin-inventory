import NavComponent from '../components/NavComponent';
import { Fragment } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
import { WIDTH_MENU, Z_INDEX_SIDER } from '../constant/constants';
const connectToRedux = connect(pick(['isOpenMenu']), null)
const { Sider } = Layout;
const SiderLayout = ({ isOpenMenu }) => {
    const styleSider = {
        overflowY: 'hidden', overflowX: 'hidden', position: 'fixed',
        height: '100vh', paddingTop: 63, zIndex: Z_INDEX_SIDER,
        left: !isOpenMenu ? 0 : -WIDTH_MENU
    }
    return (
        <Fragment>
            <Sider width={WIDTH_MENU} style={styleSider}>
                <img src="/static/image/lo_fug.jpg" className="logo" />
                <NavComponent />
            </Sider>
            <style jsx>{`
                .logo {
                    width: 100%;
                }
            `}</style>
        </Fragment>
    )
}

export default connectToRedux(SiderLayout);