import { Modal, Row, Col, Button, Input, Spin, Switch, Image } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';

class EditAdminModal extends Component{
  render() {
    const {
        editFname,
        editLname,
        editAvatar,
        editEmail,
        editCreatedAt,
        editCreatedBy,
        editPosition,
        editContactNumber,
        isEditStatus,
        isEditRole,
      loadingModal
    } = this.props;

    return (
      <>
        <Modal
          visible={this.props.visible}
          maskClosable={false}
          closable={false}
          title="Edit Admin Account"
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
                src={editAvatar}
                fallback="data:image/png;base64,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"
            />
            </Col>
          </Row>
          <br /> 
          <Row align="middle">
            <Col span={8}>
              Email&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={editEmail} disabled={true} />
            </Col>
          </Row>
          <br /> 
          <Row align="middle">
            <Col span={8}>
              Last Name&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={editLname} maxLength={100} onChange={(e)=>this.props.onChangeText(e, 'editLname')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              First Name&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={editFname} maxLength={100} onChange={(e)=>this.props.onChangeText(e, 'editFname')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Position&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={editPosition} maxLength={100} onChange={(e)=>this.props.onChangeText(e, 'editPosition')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Contact Number&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={editContactNumber} maxLength={100} onChange={(e)=>this.props.onChangeText(e, 'editContactNumber')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Status&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
            <Switch checked={isEditStatus} onChange={this.props.onChangeSwitch} /></Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Super Admin&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
            <Switch checked={isEditRole} onChange={this.props.onChangeRoleSwitch} /></Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Created By&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={editCreatedBy} disabled={true} />
            </Col>
          </Row>
          <br /> 
          <Row align="middle">
            <Col span={8}>
              Created At&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={moment(editCreatedAt).format("DD-MM-YYYY hh:mm:ss a")} disabled={true} />
            </Col>
          </Row>
          <br /> 
          <Row>
            <Col span={24} className="right-item">
              <Button type="primary" onClick={()=>this.props.proceed()}>Edit</Button>&nbsp;&nbsp;&nbsp;
              <Button onClick={()=>this.props.onClose()}>Close</Button>
              
            </Col>
          </Row>
          </Spin>
        </Modal>
      </>
    )
  }
}

export default EditAdminModal;