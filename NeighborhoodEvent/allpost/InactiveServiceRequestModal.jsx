import { Modal, Row, Col, Button, Spin, Input } from 'antd';
import React, { Component } from 'react';

const { TextArea } = Input;

class InactiveServiceRequestModal extends Component{
  render() {
    const {
        loadingModal,
        inactiveReason,
    } = this.props;

    return (
      <>
        <Modal
          visible={this.props.visible}
          maskClosable={false}
          closable={false}
          title="Inactive Neighborhood Event Request"
          footer={null}
        >
          <Spin spinning={loadingModal}>
            <Row align="middle">
            <Col span={8}>
            <span><b>Reason :</b></span>
            </Col>
            <Col span={16}>
                <TextArea rows={5} value={inactiveReason} onChange={(e)=>this.props.onChangeText(e, 'inactiveReason')} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24} className="right-item">
                <Button type="primary" onClick={()=>this.props.proceed()}>Confirm</Button>&nbsp;&nbsp;&nbsp;
              <Button onClick={()=>this.props.onClose()}>Close</Button>
              
            </Col>
          </Row>
          </Spin>
        </Modal>
      </>
    )
  }
}

export default InactiveServiceRequestModal;