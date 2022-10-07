import { Modal, Row, Col, Button, Spin, Input, Upload, Select, InputNumber} from 'antd';
import React, { Component } from 'react';
import {
    PlusOutlined,
    LoadingOutlined
  } from '@ant-design/icons';
  import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const { TextArea } = Input;
const { Option } = Select;
class EditCommunitiesProfile extends Component{
  render() {
    const {
        eName,
        eLogo,
        eCity,
        ePostcode,
        eState,
        eCountry,
        eDeveloper,
        eProperty_type,
        eTotal_units,
        eContact_number,
        eDescription,
        loadingModal,
    } = this.props;

    const uploadButton = (
        <div>
          {loadingModal ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
      <>
        <Modal
          visible={this.props.visible}
          maskClosable={false}
          closable={false}
          title="Update Community Profile"
          footer={null}
          width={this.props.width}
        >
        <Spin spinning={loadingModal}>
            <Row>
                <Col span={5} >
                Logo  :
                </Col>
                <Col span={19}>
                  <Upload  
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}

                    beforeUpload={this.props.beforeUpload}
                    onChange={this.props.handleChange} >
                     {eLogo ? <img src={eLogo} alt="logo" style={{ width: '100%' }} /> : uploadButton}
                  </Upload>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={5} >
                Name :
                </Col>
                <Col span={19}>
                <Input value={eName} maxLength={250} onChange={(e)=>this.props.onChangeText(e, 'eName')}/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={5} >
                Country :
                </Col>
                <Col span={19}>
                <CountryDropdown
                      value={eCountry}
                      onChange={(val) => this.props.selectCountry(val)} style={{ width: '100%' }}/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={5} >
                Region :
                </Col>
                <Col span={19}>
                <RegionDropdown
                    country={eCountry}
                    value={eState}
                    onChange={(val) => this.props.selectRegion(val)} style={{ width: '100%' }}/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={5} >
                City :
                </Col>
                <Col span={19}>
                <Input value={eCity} maxLength={250} onChange={(e)=>this.props.onChangeText(e, 'eCity')}/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={5} >
                Postcode :
                </Col>
                <Col span={19}>
                <InputNumber
                  min={1} max={100000}
                  value={ePostcode}
                  onChange={(e)=>this.props.onChangeNumber(e,'ePostcode')}
                  style={{ width: '100%' }}
                />
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={5} >
                Developer :
                </Col>
                <Col span={19}>
                <Input value={eDeveloper} maxLength={250} onChange={(e)=>this.props.onChangeText(e, 'eDeveoper')}/>
                </Col>
            </Row>
            <br/>
            <Row>
              <Col span={5}>
              Property Type:
              </Col>
              <Col span={19} className="center-item">
                <Select value={eProperty_type} onChange={this.props.onChangePropertyTypeSelection} style={{ width: '100%' }}>
                <Option value={""}>Please Select Property Type</Option>
                <Option value={"Apartment"}>Apartment</Option>
                <Option value={"Condominium"}>Condominium</Option>
                <Option value={"Bungalow"}>Bungalow</Option>
                <Option value={"Villa"}>Villa</Option>
                <Option value={"Service Residence"}>Service Residence</Option>
                <Option value={"Semi-Detached House"}>Semi-Detached House</Option>
                <Option value={"Terrace"}>Terrace</Option>
                <Option value={"Link House"}>Link House</Option>
                <Option value={"Residential Land"}>Residential Land</Option>
              </Select>
              </Col>
            </Row>
            <br />
            <Row>
                <Col span={5} >
                Total Units :
                </Col>
                <Col span={19}>
                <InputNumber
                        min={1} max={100000}
                        value={eTotal_units}
                        onChange={(e)=>this.props.onChangeNumber(e,'eTotal_units')}
                        style={{ width: '100%' }}/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={5} >
                Contact Number :
                </Col>
                <Col span={19}>
                <Input type="number" value={eContact_number} maxLength={250} onChange={(e)=>this.props.onChangeText(e, 'eContact_number')}/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={5} >
                Description :
                </Col>
                <Col span={19}>
                <TextArea rows={5} type="text" value={eDescription} maxLength={250} onChange={(e)=>this.props.onChangeText(e, 'eDescription')}/>
                </Col>
            </Row>
            <br/>
            <Row>
            <Col span={24} align="right-item" >
              <Button onClick={()=>this.props.onClose()}>Close</Button>&nbsp;&nbsp;&nbsp;
              <Button type="primary" onClick={()=>this.props.proceed()}>Confirm</Button>
            </Col>
           </Row>
           <br/>
          </Spin>
        </Modal>
      </>
    );
  }
}

export default EditCommunitiesProfile;