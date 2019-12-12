import React, { Fragment, Component } from 'react';
import { Icon } from 'antd';

const getSizeNumberBySize = ({ small, medium, large }) => {
  switch (true) {
    case small:
      return 24;
    case medium:
      return 48;
    case large:
      return 100;
    default:
      return 48;
  }
};

class AvatarComponent extends Component {
  render() {
    const { url, small, medium, large } = this.props;
    const sizeNumber = getSizeNumberBySize({ small, medium, large });
    const styleIcon = {
      width: `${sizeNumber}px`,
      height: `${sizeNumber}px`,
      fontSize: `${sizeNumber / 2}px`,
      color: 'white',
      backgroundColor: '#2196f3',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
    return (
      <Fragment>
        {
          url ? (
            <img src={url} alt="" />

          ) : <span><Icon type="user" style={styleIcon} /></span>
        }
        <style jsx>{`
                img{
                    width: ${sizeNumber}px;
                    height: ${sizeNumber}px;
                    border-radius: 50%
                }
            `}</style>
      </Fragment>
    )
  }
}

export default AvatarComponent;