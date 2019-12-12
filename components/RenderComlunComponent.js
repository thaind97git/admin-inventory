import React, { Fragment } from 'react';
import StatusComponent from './StatusComponent';
import { formatDateTime } from '../utils/dateUtils';
import { formatPrice } from '../utils'
const RenderColumnComponent = ({
  type = 'text',
  content
}) => {
  const getContentByType = (type, value) => {
    if (!content && content !== false) {
      return <div className="unknow">Not yet</div>
    }
    let result = "";
    switch (type) {
      case "date":
        result = formatDateTime(value);
        break;
      case "sex":
        result = value === 1 ? 'Male' : 'Fmale'
        break;
      case "status":
        result = <StatusComponent status={content} />
        break;
      case "price":
        result = formatPrice(content)
        break;
      default:
        result = content
        break;
    }
    return result;
  }
  return (
    <Fragment>
      {getContentByType(type, content)}
    </Fragment>
  )

}
export default RenderColumnComponent;