import { Modal, Row, Col, Spin, Button, Image, Avatar, message } from 'antd';
import React, { Component } from 'react';
import ViewOthersProfileModal from '../../WorkforceJob/ViewOthersProfileModal';
import { getResidentTotalRating } from '../../../Controller/Project/feedback';
import moment from 'moment';
import { GetResidentProfile } from '../../../Controller/Project/resident';

class RateMyNeighborhoodEventPostHistory extends Component{
  constructor(){
    super();
    this.state = {
      viewProfileData:"",
      viewLoading: false,
      viewModal: false,
      viewProfileStatus:"",
      viewTotalRating:0,

      Fcomment:"",
      Frate:0,
      FLoading:false,
      FModal:false,

      VFData:[],
      VFLoading:false,
      VFModal:false,
    }
  }

  getResidentTotalRating = async() => {
    const data = {
      resident_id: this.state.viewProfileData.id
    }
    try{
      const ret = await getResidentTotalRating(data)
      //console.log(ret.data)
      if(ret.data.statusCode === 200){
        this.setState({
          viewTotalRating: ret.data.data,
        },()=>{
          //console.log(this.state.viewTotalRating);
        })
    }            
    else{
      message.error(ret.data.msg);
    }       
    //console.log(ret)
  }catch(e){
    message.error("Get Details error");
    console.log(e);
  }
  };


  getProfile = async() => {
    const data = {
      resident_id: this.props.viewData.requester_id,
    }
    try{
      const ret = await GetResidentProfile(data);
      //console.log(ret.data)
      if(ret.data.statusCode === 200){
        let txt = "";
        switch(ret.data.data.status){
            case "A":
              txt = 'Active'
            break;
            case "I":
              txt = 'Inactive'
            break;
            case "PVO":
              txt = 'Pending Verify By Owner'
            break;
            default:
              txt = 'Pending Verify By Administration'
            break;
            }
        this.setState({
          viewProfileData: ret.data.data,
          viewProfileStatus: txt,
        },()=>{
          this.getResidentTotalRating();
          //console.log(ret)
        })
    }            
    else{
      message.error(ret.data.msg);
    }       
    //console.log(ret)
  }catch(e){
    message.error("Get Details error");
    console.log(e);
  }
  };

  viewOthersProfileModal= () => {
      this.setState({
        viewLoading: false,
        viewModal: true,
      },()=>{
        this.getProfile();
      })
    };
  
    
  onCloseViewModal= () => {
      this.setState({
        viewLoading: false,
        viewModal: false,
        viewProfileData: "",
        viewProfileStatus: "",
        viewTotalRating:0,
      },()=>{
        //this.getData();
      })
  };

  render() {
    const {
      viewData,
      loadingModal,
      viewStatusDescription
    } = this.props;

    

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
                <span><b>Request Code</b></span>
            </Col>
            <Col span={16}>
                <span>{viewData.code}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Participant Amount</b></span>
            </Col>
            <Col span={16}>
                <span>{viewData.participant_amount}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Received Price</b></span>
            </Col>
            <Col span={16}>
                <span>RM {viewData.total_price}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Remarks</b></span>
            </Col>
            <Col span={16}>
                <span>{viewData.remarks}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle">
            <Col span={8}>
                <span><b>Status</b></span>
            </Col>
            <Col span={16}>
                <span>{viewStatusDescription}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle" style={{visibility: viewData.status==="PA" ? "hidden" : "visible"}}>
            <Col span={8}>
                <span><b>Finished At</b></span>
            </Col>
            <Col span={16}>
                <span>{moment(viewData.status_at).format("DD-MMM-YYYY HH:mm:ss")}</span>
            </Col>
          </Row>
          <br />
          <Row align="middle"  style={{visibility: viewData.cancel_reason !=="" ? "visible" : "hidden"}}>
            <Col span={8}>
                <span><b>Reason</b></span>
            </Col>
            <Col span={16}>
                <span>{viewData.cancel_reason}</span>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Row align="middle" style={{visibility: viewData.requester_email!=="" ? "visible" : "hidden"}}>
            <Col span={8}>
                <span><b>Requested By:</b></span>
            </Col>
          </Row>
          <br />
          <Row align="middle" style={{visibility: viewData.requester_email!=="" ? "visible" : "hidden"}}>
            <Col span={24}>
              <Avatar src={<Image src={viewData.requester_avatar} style={{ width: 32, height: 32 }}
                fallback="data:image/png;base64,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"
              />} />&nbsp;&nbsp;
              <b className='p_size_large' onClick={()=>this.viewOthersProfileModal()}>{viewData.requester_email} ({viewData.requester_detailed_address})</b>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24} className="right-item">
              <Button onClick={()=>this.props.onClose()}>Close</Button>&nbsp;&nbsp;&nbsp;
            </Col>
          </Row>
          </Spin>
        </Modal>

        <>
        <ViewOthersProfileModal
          visible={this.state.viewModal}
          onClose={this.onCloseViewModal}
          loadingModal={this.state.viewLoading}
          viewData={this.state.viewProfileData}
          viewStatus={this.state.viewProfileStatus}
          viewTotalRating={this.state.viewTotalRating}
          />
        </>
      </>
      
      
    )
  }
}

export default RateMyNeighborhoodEventPostHistory;