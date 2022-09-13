import { Modal, Row, Col, Button, Input, Spin, Switch } from 'antd';
import React, { Component } from 'react';


class AddAdminModal extends Component{
  render() {
    const {
        addEmail,
        addPassword,
        addConfirmPassword,
        addFname,
        addLname,
        addPosition,
        addContactNumber,
        isAddRole,
      loadingModal
    } = this.props;

    return (
      <>
        <Modal
          visible={this.props.visible}
          maskClosable={false}
          closable={false}
          title="Add New Admin"
          footer={null}
        >
          <Spin spinning={loadingModal}>
          <Row align="middle">
            <Col span={8}>
              Email&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={addEmail} maxLength={100} onChange={(e)=>this.props.onChangeText(e, 'addEmail')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Password&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input.Password value={addPassword} maxLength={200} onChange={(e)=>this.props.onChangeText(e, 'addPassword')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Confirm Password&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input.Password value={addConfirmPassword} maxLength={200} onChange={(e)=>this.props.onChangeText(e, 'addConfirmPassword')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Last Name&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={addLname} maxLength={100} onChange={(e)=>this.props.onChangeText(e, 'addLname')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              First Name&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={addFname} maxLength={100} onChange={(e)=>this.props.onChangeText(e, 'addFname')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Position&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={addPosition} maxLength={100} onChange={(e)=>this.props.onChangeText(e, 'addPosition')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Contact Number&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={addContactNumber} maxLength={100} onChange={(e)=>this.props.onChangeText(e, 'addContactNumber')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Super Admin&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
            <Switch checked={isAddRole} onChange={this.props.onChangeSwitch} /></Col>
          </Row>
          <br />
          <Row>
            <Col span={24} className="right-item">
              <Button onClick={()=>this.props.onClose()}>Close</Button>&nbsp;&nbsp;&nbsp;
              <Button type="primary" onClick={()=>this.props.proceed()}>Add</Button>
            </Col>
          </Row>
          </Spin>
        </Modal>
      </>
    )
  }
}

export default AddAdminModal;