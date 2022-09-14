import React, { Component } from 'react';
import {
  LoadingOutlined
} from '@ant-design/icons';

class PAGESAMPLE extends Component{
  render() {
    return (
      <>
        <div className="loading__root">
          <div className="loading__center">
            <LoadingOutlined spin={true} className="loading__icon" />
          </div>
        </div>
      </>
    )
  }
}

export default PAGESAMPLE;