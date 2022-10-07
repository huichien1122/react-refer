import { Row, Col } from 'antd';
import React, { Component } from 'react';

class DashboardHeader extends Component{
  render() {
    const {
      curTab
    } = this.props;
    return (
      <>
      {/* <span onClick={()=>this.props.onChangeTabs("statistic")}>Statistic</span> | &nbsp; */}
      <Row className="h__menu">
        <Col span={24}>
          <Row gutter={[]} className="center-item">
            <Col
            onClick={()=>this.props.onChangeTabs("allpost")}
            span={8}
            className={`h__tab ${curTab === "allpost" ? 'h_selected' : ''}`}>
              <span>All Post</span>
            </Col>
            <Col
            onClick={()=>this.props.onChangeTabs("mypost")}
            span={8}
            className={`h__tab ${curTab === "mypost" ? 'h_selected' : ''}`}>
              <span>Admin Post</span>
            </Col>
            <Col
            onClick={()=>this.props.onChangeTabs("myposthistory")}
            span={8}
            className={`h__tab ${curTab === "myposthistory" ? 'h_selected' : ''}`}>
              <span>Admin Post History</span>
            </Col>
          </Row>
        </Col>
      </Row>
      </>
    )
  }
}

export default DashboardHeader;