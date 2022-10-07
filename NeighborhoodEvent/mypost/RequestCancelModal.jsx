import { Modal, Row, Col, Button, Spin, Input } from 'antd';
import React, { Component } from 'react';

const { TextArea } = Input;

class CancelModal extends Component{
  render() {
    const {
        loadingModal,
        cancelReason,
    } = this.props;

    return (
      <>
        <Modal
          visible={this.props.visible}
          maskClosable={false}
          closable={false}
          title="Cancel The Neighborhood Event Request"
          footer={null}
        >
          <Spin spinning={loadingModal}>
          <Row align="middle">
            <Col span={8}>
                Cancel Reason &nbsp;
            </Col>
            <Col span={16}>
                <TextArea rows={5} value={cancelReason} onChange={(e)=>this.props.onChangeText(e, 'cancelReason')} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24} className="right-item">
                <Button type="primary" onClick={()=>this.props.proceed()}>Cancel</Button>&nbsp;&nbsp;&nbsp;
              <Button onClick={()=>this.props.onClose()}>Close</Button>
              
            </Col>
          </Row>
          </Spin>
        </Modal>
      </>
    )
  }
}

export default CancelModal;