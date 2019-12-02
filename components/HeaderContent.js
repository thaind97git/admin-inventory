import { Row, Col, Select } from 'antd';
import SearchLayout from '../layouts/SearchLayout'
const { Option } = Select;
const HeaderContent = ({ title, isSearch = false, isPageSize, getPageSize }) => {
    const onChangePageSize = e => {
        isPageSize && typeof (getPageSize) === 'function' && getPageSize(e)
    }
    return (
        <div className="card">
            <Row>
                <Col pull={1} span={24} lg={10}>
                    <h2>{title}</h2>
                </Col>
                {
                    isPageSize && (
                        <Col span={24} lg={4}>
                            <Row>Page size</Row>
                            <Row>
                                <Select
                                    defaultValue={10}
                                    showSearch
                                    style={{ width: 100 }}
                                    optionFilterProp="children"
                                    onChange={(e) => onChangePageSize(e)}>
                                    <Option value={10}>10</Option>
                                    <Option value={25}>25</Option>
                                    <Option value={50}>50</Option>
                                </Select>
                            </Row>
                        </Col>
                    )
                }
                {
                    isSearch && (
                        <Col span={24} lg={10}>
                            <Row>
                                <SearchLayout />
                            </Row>
                        </Col>
                    )
                }
            </Row>
            <style jsx>{`
                h2{
                    padding: 10px 0
                }
            `}</style>
        </div>
    )
}
export default HeaderContent;