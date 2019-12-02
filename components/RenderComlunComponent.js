import React, { Fragment } from 'react';
import AvatarComponent from '../components/AvatarComponent';
import StatusComponent from './StatusComponent';
import { momentDateUser, momentTimeSpanInput } from '../utils/dateUtils';
import ButtonLayout from '../layouts/ButtonLayout';
const RenderColumnComponent = ({
    type = 'text',
    content
}) => {

    return (
        <Fragment>
            {
                  type === 'date' ? content ? momentDateUser(content) : <div className="unknow">Not yet</div>
                : type === 'bDate' ? content ? momentTimeSpanInput(content) : <div className="unknow">Not yet</div> 
                : type === 'avatar' ? <AvatarComponent small url={content} small />
                : type === 'result' ? (
                      content === 'pass' ? <ButtonLayout type="outline-success" size="small" text={content} />
                    : content === 'fail' ? <ButtonLayout type="outline-danger" size="small" text={content} />
                    : <div className="unknow">Not yet</div>
                )
                : type === 'method' ?
                    content === 'duthi' ? 'Dự thi' : content === 'hocbong' ? 'Học Bổng' :
                    content === 'mienthihocba' ? 'Miễn thi học bạ' : content === 'mienthikhac' ? 'Miễn thi khác'
                    : <div className="unknow">Not yet</div>
                : type === 'sex' ? (
                      content === 1 ? 'Male' : content === 2 ? 'Fmale' 
                    : <div className="unknow">Not yet</div>
                )
                : type === 'status' ? <StatusComponent status={status} />
                : content ? content : <div className="unknow">Not yet</div>
            }
        </Fragment>
    )

}
export default RenderColumnComponent;