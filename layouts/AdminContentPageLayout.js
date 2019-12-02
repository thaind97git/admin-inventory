import { Fragment } from "react";
import { Layout } from 'antd';
import { Z_INDEX_CONTENT } from '../constant/constants';
const { Content, Footer } = Layout;
const AdminContentPageLayout = ({ marginLeft, children }) => {
    return (
        <Fragment>
            
            <Layout style={{ marginLeft: marginLeft, minHeight: '100vh', zIndex: Z_INDEX_CONTENT }}>
                <Content style={{ margin: '24px 16px 0', marginTop: 80 }}>
                    <div className="admin-content">
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Thaind97git ©2019 Designed by Ant design</Footer>
            </Layout>
            <style jsx>{`
                    .admin-content {
                        background: #fff;
                        text-align: center
                    }
                `}</style>
        </Fragment>
    )
}
export default AdminContentPageLayout;