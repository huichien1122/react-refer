import { Modal, Row, Col, Button, Spin, Input, DatePicker, Select} from 'antd';
import React, { Component } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import moment from 'moment';

const { Option } = Select;
const monthFormat = 'MM/YY';
class EditPaymentModal extends Component{
  render() {
    const {
        ePlan,
        eCardNumber,
        eCardHolder,
        eCvc,
        eExpiry,
        eTestCvc,
        eTestExpiry,
        cvc, expiry,
        loadingModal,
    } = this.props;

    let test;
    if (eTestCvc === cvc && eTestExpiry === expiry ){
      test=
        <React.Fragment>
            <Cards cvc={eCvc} expiry={eExpiry} focused="" name={eCardHolder} number={(eCardNumber)}/>
            <br/>
            <Row>
            <Col span={5}>Card Number : </Col>
            <Col span={19}>
                <Input type="number" value={eCardNumber} maxLength={250} onChange={(e)=>this.props.onChangeText(e, 'eCardNumber')}/>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col span={5}>Card Holder : </Col>
            <Col span={19}>
                <Input type="text" value={eCardHolder} maxLength={250} onChange={(e)=>this.props.onChangeText(e, 'eCardHolder')}/>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col span={5}>Card Expiry : </Col>
            <Col span={19}>
                <DatePicker showTime format={monthFormat} 
                value={moment(eExpiry, monthFormat)}
                onChange={(date, dateString)=>this.props.onChangeCardExpiry(date, dateString)} picker="month"
                style={{ width: '100%' }} />
            </Col>
            </Row>
            <br/>
            <Row>
            <Col span={5}>Card CVC : </Col>
            <Col span={19}>
                <Input type="number" value={eCvc} maxLength={250} onChange={(e)=>this.props.onChangeText(e, 'eCvc')}/>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col span={5}>Plan : </Col>
            <Col span={19}>
                <Select value={ePlan} onChange={(e)=>this.props.onChangeNumber(e,'ePlan')} style={{ width: '100%' }}>
                    <Option value={""}>Please Select Plan</Option>
                    <Option value={"small"}>Small (RM 89.99 per month)</Option>
                    <Option value={"medium"}>Medium (RM 169.99 per month)</Option>
                    <Option value={"large"}>Large (RM 259.99 per month)</Option>
                    <Option value={"super"}>Super (RM 339.99 per month)</Option>
                </Select>
            </Col>
            </Row>
            <br/>
        </React.Fragment>
    }

    return (
      <>
        <Modal
          visible={this.props.visible}
          maskClosable={false}
          closable={false}
          title="Edit Card Payment/ Plan Details"
          footer={null}
          width={this.props.width}
        >
        <Spin spinning={loadingModal}>
            <b>Confirm Details Before Edit</b>
            <br/>
            <br/>
            <Row>
                <Col span={5} >
                Old CVC :
                </Col>
                <Col span={19}>
                <Input value={eTestCvc} maxLength={250} onChange={(e)=>this.props.onChangeText(e, 'eTestCvc')}/>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col span={5} >
                Old Expiry :
                </Col>
                <Col span={19}>
                <DatePicker showTime format={monthFormat} 
                    onChange={(date, dateString)=>this.props.onChangeTestCardExpiry(date, dateString)} picker="month"
                    value={eTestExpiry !== "" ? moment(eTestExpiry, monthFormat) : null}
                    style={{ width: '100%' }} />
                </Col>
            </Row>
            <br/>
        
            {test}
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

export default EditPaymentModal;