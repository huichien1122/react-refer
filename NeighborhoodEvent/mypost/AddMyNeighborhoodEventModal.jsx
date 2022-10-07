import { Modal, Row, Col, Button, Input, Spin, Select,Upload, InputNumber, } from 'antd';
import React, { Component } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';


const { Option } = Select;
const { TextArea } = Input;


class AddMyNeighborhoodEventModal extends Component{
  render() {
    const {
      addTitle,
      addDescription,
      addCategory,
      addPrice,
      addAmount,
      addPaymentMethod,
      addVenue,
      loadingModal,
      addMediaList

    } = this.props;

    return (
      <>
        <Modal
          visible={this.props.visible}
          maskClosable={false}
          closable={false}
          title="Add New Neighborhood Event Post"
          footer={null}
        >
          <Spin spinning={loadingModal}>
          <Row align="middle">
            <Col span={8}>
              Event Title&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={addTitle} maxLength={255} onChange={(e)=>this.props.onChangeText(e, 'addTitle')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Upload Photo&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              {/* <Input rows={3} value={addAppMedia} style={{ width: '100%' }} onChange={(e)=>this.props.onChangeText(e, 'addAppMedia')}/> */}
              <Upload {...this.props.props} fileList={addMediaList} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture">
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Desription&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <TextArea rows={3} value={addDescription} style={{ width: '100%' }} onChange={(e)=>this.props.onChangeText(e, 'addDescription')}/>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Category&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Select value={addCategory} onChange={(e)=>this.props.onChangeOther(e, 'addCategory')} style={{ width: '100%' }}>
                <Option value={"Festival"}>Festival</Option>
                <Option value={"Fair"}>Fair</Option>
                <Option value={"Sport"}>Sport</Option>
                <Option value={"Trip"}>Trip</Option>
                <Option value={"Voluntering"}>Volunteering</Option>
                <Option value={"Party"}>Party</Option>
                <Option value={"Clean-up Day"}>Clean-up Day</Option>
                <Option value={"Others"}>Others</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Amount&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <InputNumber value={addAmount} maxLength={255} onChange={(e)=>this.props.onChangeOther(e, 'addAmount')} />
            </Col>
          </Row>
          
          <br />
          <Row align="middle">
            <Col span={8}>
              Price&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <InputNumber value={addPrice} maxLength={255} onChange={(e)=>this.props.onChangeOther(e, 'addPrice')} />
            </Col>
          </Row>
          <br />
          
          <Row align="middle" style={{visibility: addPrice === 0 ? "hidden" : "visible"}}>
            <Col span={8}>
              Payment Method&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Select value={addPaymentMethod} onChange={(e)=>this.props.onChangeOther(e, 'addPaymentMethod')} style={{ width: '100%' }}>
              <Option value={""}>Please Select Payment Method</Option>
                <Option value={"Cash"}>Cash</Option>
                <Option value={"E-Wallet"}>E-Wallet</Option>
                <Option value={"Online Banking"}>Online Banking</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Date&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Space direction="vertical">
              <DatePicker showTime onChange={(date, dateString)=>this.props.dateOnChange(date, dateString)}/>
              </Space>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Venue&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={addVenue} maxLength={255} onChange={(e)=>this.props.onChangeText(e, 'addVenue')} />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col span={24} className="right-item">
              <Button type="primary" onClick={()=>this.props.proceed()}>Add</Button>&nbsp;&nbsp;&nbsp;
              <Button onClick={()=>this.props.onClose()}>Close</Button>
            </Col>
          </Row>
          </Spin>
        </Modal>
      </>
    )
  }
}

export default AddMyNeighborhoodEventModal;
