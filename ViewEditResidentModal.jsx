import { Modal, Row, Col, Spin, Button, Image, Switch } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';

class ViewEditResidentModal extends Component{
  render() {
    const {
      viewID,
      viewEmail,
      viewRole,
      viewCreatedAt,
      viewCreatedBy,
      viewUpdatedAt,
      viewUpdatedBy,
      viewLname,
      viewFname,
      viewDetailedAddress,
      viewAvatar,
      viewContactNumber,
      viewAbout,
      viewTotalRating,
      viewHomeOwner,
      viewCommunitiesName,
      isEditStatus,
      isStatus,
      isPVO,
        loadingModal,
        viewStatusDescription
    } = this.props;
    

    return (
      <>
        <Modal
          visible={this.props.visible}
          maskClosable={false}
          closable={false}
          title="View & Edit Resident Details"
          footer={null}
        >
          <Spin spinning={loadingModal}>
          <Row align="middle">
            <Col span={8}>
              Avatar&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
            <Image
                width={200}
                src={viewAvatar}
                fallback="data:image/png;base64,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"
            />
            </Col>
          </Row>
          <br /> 
          <Row align="middle">
            <Col span={8}>
                <span><b>ID</b></span>
            </Col>
            <Col span={16}>
                <span>{viewID}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Email</b></span>
            </Col>
            <Col span={16}>
                <span>{viewEmail}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Last Name</b></span>
            </Col>
            <Col span={16}>
                <span>{viewLname}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>First Name</b></span>
            </Col>
            <Col span={16}>
                <span>{viewFname}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Total Rating</b></span>
            </Col>
            <Col span={16}>
                <span>{viewTotalRating}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>About</b></span>
            </Col>
            <Col span={16}>
                <span>{viewAbout}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Communities Name</b></span>
            </Col>
            <Col span={16}>
                <span>{viewCommunitiesName}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Detailed Address</b></span>
            </Col>
            <Col span={16}>
                <span>{viewDetailedAddress}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Role</b></span>
            </Col>
            <Col span={16}>
                <span>{viewRole}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Contact Number</b></span>
            </Col>
            <Col span={16}>
                <span>{viewContactNumber}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Home Owner Name</b></span>
            </Col>
            <Col span={16}>
                <span>{viewHomeOwner}</span>
            </Col>
          </Row>
          
          <br />
          
          <Row align="middle">
            <Col span={8}>
            <span><b>Created At : </b></span>
            </Col>
            <Col span={16}>
                <span>{moment(viewCreatedAt).format("DD-MM-YYYY hh:mm:ss a")}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle" style={{visibility: viewCreatedBy !== "" ? "visible" : "hidden"}}>
            <Col span={8}>
            <span><b>Created By :</b></span>
            </Col>
            <Col span={16}>
                <span>{viewCreatedBy}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle" style={{visibility: viewUpdatedAt !== "" || viewUpdatedAt !== null ? "visible" : "hidden"}}>
            <Col span={8}>
            <span><b>Updated At : </b></span>
            </Col>
            <Col span={16}>
                <span>{moment(viewUpdatedAt).format("DD-MM-YYYY hh:mm:ss a")}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle" style={{visibility: viewUpdatedBy !== "" || viewUpdatedBy !== null ? "visible" : "hidden"}}>
            <Col span={8}>
            <span><b>Updated By :</b></span>
            </Col>
            <Col span={16}>
                <span>{viewUpdatedBy}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle" style={{visibility: isStatus ? "visible" : "hidden"}}>
            <Col span={8}>
            <span><b>Status</b></span>
            </Col>
            <Col span={16}>
                <span>{viewStatusDescription}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle" style={{visibility: isStatus ? "hidden" : "visible"}}>
            <Col span={8}>
              Status&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
            <Switch checked={isEditStatus} onChange={this.props.onChangeEditSwitch} /></Col>
          </Row>
          <br />
          <Row>
            <Col span={24} className="right-item">
              <Button style={{visibility: isStatus && !isPVO ? "visible" : "hidden"}} type="primary" onClick={()=>this.props.approve()}>Approve Request</Button>
              <Button style={{visibility: isStatus && !isPVO ? "visible" : "hidden"}} type="primary" onClick={()=>this.props.reject()}>Reject Request</Button>
              <Button style={{visibility: isStatus ? "hidden" : "visible"}} type="primary" onClick={()=>this.props.editStatus()}>Edit Status</Button>
              <Button onClick={()=>this.props.onClose()}>Close</Button>&nbsp;&nbsp;&nbsp;
            </Col>
          </Row>
          </Spin>
        </Modal>
      </>
    )
  }
}

export default ViewEditResidentModal;