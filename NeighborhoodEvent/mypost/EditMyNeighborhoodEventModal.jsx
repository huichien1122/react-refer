import { Modal, Row, Col, Spin, Button, Upload, Input, Select, InputNumber, Space, DatePicker } from 'antd';
import React, { Component } from 'react';
import{  UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

class EditMyNeighborhoodEventModal extends Component{

  render() {
    const {
      editTitle,
      editCode,
      editDescription,
      editCategory,
      editPrice,
      editPaymentMethod,
      editDate,
      editVenue,
      loadingModal,
      editMediaList,
      editStatusDescription,
      editAmount,
      editBalance
    } = this.props;

    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    
    return (
      <>
        <Modal
          visible={this.props.visible}
          maskClosable={false}
          closable={false}
          title="Neighborhood Event Details"
          footer={null}
        >
          <Spin spinning={loadingModal}>      
          <Row align="middle">
            <Col span={8}>
                <span><b>Neighborhood Event Code</b></span>
            </Col>
            <Col span={16}>
                <span>{editCode}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Event Title&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Input value={editTitle} maxLength={255} onChange={(e)=>this.props.onChangeText(e, 'editTitle')} />
            </Col>
          </Row>
          <br />

          <Row align="middle">
            <Col span={8}>
              Pictures&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Upload
                {...this.props.props2}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                fileList={[...editMediaList]}
              >
                
              <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Col>
          </Row>
          <br />
          
          <br />
          <Row align="middle">
            <Col span={8}>
              Desription&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <TextArea rows={6} value={editDescription} style={{ width: '100%' }} onChange={(e)=>this.props.onChangeText(e, 'editDescription')}/>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
              Category&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Select value={editCategory} onChange={(e)=>this.props.onChangeOther(e, 'editCategory')} style={{ width: '100%' }}>
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
              Price&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <InputNumber value={editPrice} maxLength={255} onChange={(e)=>this.props.onChangeOther(e, 'editPrice')} />
            </Col>
          </Row>
          <br />
          <Row align="middle" style={{visibility: editPrice === 0 ? "hidden" : "visible"}}>
            <Col span={8}>
              Payment Method&nbsp;
              <span className="rq">*</span>
            </Col>
            <Col span={16}>
              <Select value={editPaymentMethod} onChange={(e)=>this.props.onChangeOther(e, 'editPaymentMethod')} style={{ width: '100%' }}>
              <Option value={""}>Please Select Payment Method</Option>
                <Option value={"Cash"}>Cash</Option>
                <Option value={"E-Wallet"}>E-Wallet</Option>
                <Option value={"Online Banking"}>Online Banking</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={12}>
                <span><b>Total Amount For Request</b></span>
            </Col>
            <Col span={12}>
                <span>{editAmount}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={12}>
                <span><b>Balance Amount For Request</b></span>
            </Col>
            <Col span={12}>
                <span>{editBalance}</span>
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
              <DatePicker value={moment(editDate, dateFormat)} showTime onChange={(date, dateString)=>this.props.dateOnChange(date, dateString)}/>
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
              <Input value={editVenue} maxLength={255} onChange={(e)=>this.props.onChangeText(e, 'editVenue')} />
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Status</b></span>
            </Col>
            <Col span={16}>
                <span>{editStatusDescription}</span>
            </Col>
          </Row>
          <br />

          <Row>
            <Col span={24} className="right-item">
              <Button type="primary" onClick={()=>this.props.proceed()} style={{visibility: editStatusDescription === "Pending Request" ? "visible" : "hidden"}}>Edit</Button>
              <Button onClick={()=>this.props.onClose()}>Close</Button>&nbsp;&nbsp;&nbsp;
            </Col>
          </Row>
          </Spin>
        </Modal>

        <>

        </>
      </>
      
      
    )
  }
}

export default EditMyNeighborhoodEventModal;