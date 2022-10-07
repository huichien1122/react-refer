import { Modal, Row, Col, Button, Spin, Table, Tag, Tooltip, Space, message } from 'antd';
import{  EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import moment from 'moment';

import CancelModal from './RequestCancelModal';
import { adminUpdateProviderNeighborhoodEventRequestStatus } from '../../../Controller/Project/neighborhoodevent';
import ApproveMyNeighborhoodEventModal from './ApproveMyNeighborhoodEventModal';

const { confirm } = Modal;

class ViewMyPostRequestModal extends Component{

  constructor(){
    super();
    this.state = {
      approveLoading: false,
      approveModal: false,
      approveData:[],
      approveStatusDescription:"",
      approveID:0,
      approveCancelReason:"",

      cancelID:0,
      cancelLoading:false,
      cancelModal:false,
      cancelReason:"",

    }
  }
  
  approveEditNeighborhoodEventRequestModal = (data) => {
    let txt = "";

    switch(data.status){
      case "P":
        txt = 'Pending Request'
      break;
      case "PA":
        txt = 'Pending Approve'
      break;
      case "A":
        txt = 'Approved'
      break;
      default:
        txt = 'Status Undefined'
      break;
    }

    this.setState({
      approveLoading: false,
      approveModal: true,
      approveData: data,
      approveStatusDescription:txt,
      approveID:data.id,
      approveCancelReason:""
    },()=>{
      //console.log(data);
    }
      
    )
    
  };

  
  CloseApproveModal= () => {
    this.setState({
      approveLoading: false,
      approveModal: false,
      approveData: [],
      approveStatusDescription:"",
      approveID:0,
      approveCancelReason:""
    },()=>{
      //this.getData();
      this.props.onClose();
    })
  };

  onChange = (e, key) => {
    this.setState({
      [key]: e,
    })
  };

  onChangeText = (e, key) => {
    this.setState({
      [key]: e.target.value,
    })
  };

  CompleteNeighborhoodEventRequest= () => {
    const {approveID} = this.state;
    if (approveID !== 0){
        
        confirm({
            title: 'Are you sure want to complete the neighborhood event : ' +(approveID)+  ' ?',
            content: '',
            onOk:() => {
              this.setState({
                approveLoading: true,
              }, ()=>{
                this.onFinalComplete();
              })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }else{
      message.error("Neighborhood Event ID not found!");
    }
  };

  onFinalComplete = async () => {
    const {approveID} = this.state;
    
    const data = {
        id: approveID,
        status:"CP"
    }

    try{ 
        const ret = await adminUpdateProviderNeighborhoodEventRequestStatus(data);
        if(ret.status === 200){
            message.success("Neighborhood Event Request Completed and Paid Successfully!");
            //console.log(ret);
            this.CloseApproveModal();
            
        }else{
            message.error(ret.data.msg);
            this.CloseApproveModal();
        }

        }catch(e){
        message.error("Edit error");
        console.log(e);
        this.CloseApproveModal();
    }
  };

  IncompleteNeighborhoodEventRequest= () => {
    const {approveID} = this.state;
    if (approveID !== 0){
        
        confirm({
            title: 'Are you sure want to complete the neighborhood event request : ' +(approveID)+  ' ?',
            content: '',
            onOk:() => {
              this.setState({
                approveLoading: true,
              }, ()=>{
                this.onFinalIncomplete();
              })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }else{
      message.error("Neighborhood Event ID not found!");
    }
  };

  onFinalIncomplete = async () => {
    const {approveID} = this.state;
    
    const data = {
        id: approveID,
        status:"NC"
    }

    try{ 
      const ret = await adminUpdateProviderNeighborhoodEventRequestStatus(data);
      if(ret.status === 200){
          message.success("Neighborhood Event Become Incompleted and Unpaid!");
          //console.log(ret);
          this.CloseApproveModal();
          
      }else{
          message.error(ret.data.msg);
          this.CloseApproveModal();
      }

      }catch(e){
      message.error("Edit error");
      console.log(e);
      this.CloseApproveModal();
  }
  };

  cancelNeighborhoodEventRequestModal = (data) => {
    this.setState({
      cancelLoading: false,
      cancelModal: true,
      cancelID:data.id,
      cancelReason:""
    })
  };

  
  CloseCancelModal= () => {
    this.setState({
      cancelLoading: false,
      cancelModal: false,
      cancelID:"",
      cancelReason:""
    },()=>{
      this.props.onClose();
    })
  };

  CancelNeighborhoodEvent= () => {
    const {cancelID, cancelReason} = this.state;
    if (cancelID !== 0 && cancelReason!==""){
        
        confirm({
            title: 'Are you sure want to cancel the neighborhood event request : ' +(cancelID)+  ' ?',
            content: '',
            onOk:() => {
              this.setState({
                cancelLoading: true,
              }, ()=>{
                this.onFinalCancel();
              })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }else{
      message.warn("Filled in cancel reason!");
    }
  };

  onFinalCancel = async () => {
    const {cancelID, cancelReason} = this.state;
    
    const data = {
        id: cancelID,
        status:"C",
        cancel_reason:cancelReason
    }

    try{ 
      const ret = await adminUpdateProviderNeighborhoodEventRequestStatus(data);
      if(ret.status === 200){
          message.success("Neighborhood Event Request Canceled Successfully !");
          //console.log(ret);
          this.CloseCancelModal();
          
      }else{
          message.error(ret.data.msg);
          this.CloseCancelModal();
      }

      }catch(e){
      message.error("Edit error");
      console.log(e);
      this.CloseCancelModal();
  }
  };

  
  render() {
    const {
        loadingModal,
        requestList,
        vrStatus,
    } = this.props;

    const columns = [
      {
        title: "Code",
        dataIndex: 'code',
        key: 'code',
        render: (text, record, index) => (
            <span key={`id${record.code}${index}`}>
                {record.code}
            </span>
        )
        },
        {
        title: "Requested By",
        dataIndex: 'requester_email',
        key: 'requester_email',
        render: (text, record, index) => (
            <span key={`requester_email${record.requester_email}${index}`}>
                {record.requester_email}
            </span>
        )
        },
        {
          title: "Requested At",
          dataIndex: "created_at",
          key: 'created_at',
          render: date => moment(date).format("DD-MM-YYYY hh:mm:ss a")

        },
        {
          title: "Participant Amount",
          dataIndex: 'participant_amount',
          key: 'participant_amount',
          render: (text, record, index) => (
              <span key={`participant_amount${record.participant_amount}${index}`}>
                  {record.participant_amount}
              </span>
          )
        },
        {
          title: "Total Price",
          dataIndex: 'total_price',
          key: 'total_price',
          render: (text, record, index) => (
              <span key={`total_price${record.total_price}${index}`}>
                  {record.total_price}
              </span>
          )
        },
        {
            title: "Remarks",
            dataIndex: 'remarks',
            key: 'remarks',
            render: (text, record, index) => (
                <span key={`remarks${record.remarks}${index}`}>
                    {record.remarks}
                </span>
            )
        },
        {
          title: "Status",
          dataIndex: 'status',
          key: 'status',
          render: (text, record, index) => {
            let color = "";
            let txt = "";
            switch(record.status){
                case "I":
                    color = 'red'
                    txt = 'Inactive'
                    break; 
                case "RI":
                    color = 'orange'
                    txt = 'Reported'
                    break; 
                case "P":
                    color = 'green'
                    txt = 'Pending Request'
                    break;
                case "C":
                    color = 'pink'
                    txt = 'Canceled'
                    break;
                case "PA":
                    color = 'blue'
                    txt = 'Pending Approve'
                    break;
                case "R":
                    color = 'gray'
                    txt = 'Rejected'
                    break;
                case "A":
                    color = 'yellow'
                    txt = 'In progress'
                    break;
                case "CP":
                    color = 'purple'
                    txt = 'Completed & Paid'
                    break;
                case "NC":
                    color = 'brown'
                    txt = 'Incompleted & Unpaid'
                    break;        
                default:
                    color = 'default'
                    txt = record.status
                    break;
            }
            return(
              <span key={`sts${record.webpage}${index}`}>
                <Tag color={color}>{txt}</Tag>
              </span>       
          )
          }
        },
        {
          title: "Status At",
          dataIndex: "status_at",
          key: 'status_at',
          render: date => moment(date).format("DD-MM-YYYY hh:mm:ss a")

        },
        {
          title: 'Action',             
          key: 'action',
          render: (text, record, index) => (
          <Space size="middle">
          <Tooltip placement="left" title="Edit">
            <Button onClick={()=>this.approveEditNeighborhoodEventRequestModal(record)} shape="circle" icon={<EditOutlined />} style={{visibility: record.status==="CP" || record.status==="R" || record.status==="NC" || record.status==="I" || record.status==="C" || record.status==="RI" || vrStatus==="RI" ? "hidden" : "visible"}}/>
          </Tooltip>
          <Tooltip placement="left" title="Edit">
            <Button onClick={()=>this.cancelNeighborhoodEventRequestModal(record)} shape="circle" icon={<DeleteOutlined />} style={{visibility: record.status==="CP" || record.status==="R" || record.status==="NC" || record.status==="I" || record.status==="C" || record.status==="RI" || vrStatus==="RI" ? "hidden" : "visible"}}/>
          </Tooltip>             
          </Space>  
           
          )
        }
      ];

    return (
      <>
        <Modal
          visible={this.props.visible}
          maskClosable={false}
          closable={false}
          title={"Neighborhood Event"}
          footer={null}
          width={1050}
        >
            <Spin spinning={loadingModal}>
              
              <Row>
                  <Col span={24} className="right-item">
                  <span><b>***All In progress event request will turned to Completed and Paid when End Request!***</b></span>
                  <br/>
                  <span><b>***All In progress event request will turned to Cancelled when Cancel Request!***</b></span>
                  </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={24} className="right-item">
                    &nbsp;&nbsp;&nbsp;<Button onClick={()=>this.props.onStop()} style={{visibility: vrStatus==="S" || vrStatus==="RI" ? "hidden" : "visible"}} >Close Request</Button>&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;<Button onClick={()=>this.props.onEnd()} style={{visibility: vrStatus==="S" ? "visible" : "hidden"}} >End Request</Button>&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;<Button onClick={()=>this.props.onCancel()} style={{visibility: vrStatus==="RI" ? "hidden" : "visible"}}>Cancel Post</Button>&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;<Button onClick={()=>this.props.onClose()}>Close</Button>&nbsp;&nbsp;&nbsp;
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={24}>
                        <Table 
                        className="responsive__table table__root"
                        key="tb1"
                        rowKey="uid"
                        columns={columns}
                        dataSource={requestList}
                        dataIndex={true}
                        />
                    </Col>
                </Row>
            </Spin>
        </Modal>

        <ApproveMyNeighborhoodEventModal
          loadingModal={this.state.approveLoading}
          visible={this.state.approveModal}
          onClose={this.CloseApproveModal}
          complete={this.CompleteNeighborhoodEventRequest}
          incomplete={this.IncompleteNeighborhoodEventRequest}

          approveData={this.state.approveData}
          approveTotalPrice={this.state.approveTotalPrice}
          approveStatusDescription={this.state.approveStatusDescription}
          approveCancelReason={this.state.approveCancelReason}
          onChange={this.onChange}
          onChangeText={this.onChangeText}
        />

        <CancelModal
          loadingModal={this.state.cancelLoading}
          visible={this.state.cancelModal}
          onClose={this.CloseCancelModal}
          proceed={this.CancelNeighborhoodEvent}

          cancelReason={this.state.cancelReason}
          onChangeText={this.onChangeText}
        />
      </>
    )
  }
}

export default ViewMyPostRequestModal;