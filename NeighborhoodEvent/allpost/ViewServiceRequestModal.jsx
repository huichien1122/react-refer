import { Modal, Row, Col, Button, Spin, Table, Tag, Tooltip, Space, message } from 'antd';
import{  DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import React, { Component } from 'react';
import moment from 'moment';
import ViewServiceRequestDetailsModal from './ViewServiceRequestDetailsModal';
import { inactiveNeighborhoodEventRequest } from '../../../Controller/Project/neighborhoodevent';
import InactiveServiceRequestModal from './InactiveServiceRequestModal';

const { confirm } = Modal;

class ViewServiceRequestModal extends Component{

  constructor(){
    super();
    this.state = {
      approveLoading: false,
      approveModal: false,
      approveData:[],
      approveStatusDescription:"",
      approveID:0,

      inactiveID:0,
      inactiveLoading:false,
      inactiveModal:false,
      inactiveReason:"",

    }
  }

  approveEditNeighborhoodEventRequestModal = (data) => {
    let txt = "";

    switch(data.status){
      case "PA":
          txt = 'Pending Approve'
      break;
      case "A":
          txt = 'Approved, In Progress'
      break;
      case "R":
          txt = 'Rejected'
      break;
      case "C":
          txt = 'Canceled'
      break;
      case "CP":
          txt = 'Completed and Paid'
      break;
      case "NC":
          txt = 'Not Completed and Unpaid'
      break;
      case "I":
          txt = 'Inactive'
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
    },()=>{
      //this.getData();
      //this.props.onClose();
    })
  };
  
  inactiveNeighborhoodEventRequestModal = (data) => {
    this.setState({
      inactiveLoading: false,
      inactiveModal: true,
      inactiveID:data.id,
      inactiveReason:""
    })
  };

  
  CloseInactiveModal= () => {
    this.setState({
      inactiveLoading: false,
      inactiveModal: false,
      inactiveID:"",
      inactiveReason:""
    },()=>{
      this.props.onClose();
    })
  };

  InactiveWorkforceJob= () => {
    const {inactiveID, inactiveReason} = this.state;
    if (inactiveID !== 0 || inactiveReason===""){
        
        confirm({
            title: 'Are you sure want to cancel the event request : ' +(inactiveID)+  ' ?',
            content: '',
            onOk:() => {
              this.setState({
                inactiveLoading: true,
              }, ()=>{
                this.onFinalInactive();
              })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }else{
      message.error("Filled in inactive reason!");
    }
  };

  onFinalInactive = async () => {
    const {inactiveID, inactiveReason} = this.state;
    
    const data = {
        id: inactiveID,
        reason:inactiveReason
    }

    try{ 
      const ret = await inactiveNeighborhoodEventRequest(data);
      if(ret.status === 200){
          message.success("Neighborhood Event Request Inactive Successfully !");
          //console.log(ret);
          this.CloseInactiveModal();
          
      }else{
          message.error(ret.data.msg);
          this.CloseInactiveModal();
      }

      }catch(e){
      message.error("Edit error");
      console.log(e);
      this.CloseInactiveModal();
  }
  };

  onChangeText = (e, key) => {
    this.setState({
      [key]: e.target.value,
    })
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
          dataIndex: 'particpant_amount',
          key: 'particpant_amount',
          render: (text, record, index) => (
              <span key={`particpant_amount${record.particpant_amount}${index}`}>
                  {record.particpant_amount}
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
            <Button onClick={()=>this.approveEditNeighborhoodEventRequestModal(record)} shape="circle" icon={<EyeOutlined />}/>
          </Tooltip>
          <Tooltip placement="left" title="Edit">
            <Button onClick={()=>this.inactiveNeighborhoodEventRequestModal(record)} shape="circle" icon={<DeleteOutlined />} style={{visibility: record.status==="P" ||record.status==="PA" || record.status==="A"? "visible" : "hidden"}}/>
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
                <Row style={{visibility: vrStatus==="I" || vrStatus==="E" || vrStatus==="C" || vrStatus==="RI" ? "hidden" : "visible"}}>
                  <Col span={24} className="right-item">
                  <span><b>***Inactive will make all in progress, and be reported post become Inactive also!***</b></span>
                  </Col>
                </Row>
                <br/>
                <Row>
                    <Col span={24} className="right-item">
                    &nbsp;&nbsp;&nbsp;<Button onClick={()=>this.props.onInactive()} style={{visibility: vrStatus==="I" || vrStatus==="E" || vrStatus==="C" || vrStatus==="RI" ? "hidden" : "visible"}}>Inactive Post</Button>&nbsp;&nbsp;&nbsp;
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

        <ViewServiceRequestDetailsModal
          loadingModal={this.state.approveLoading}
          visible={this.state.approveModal}
          onClose={this.CloseApproveModal}

          approveData={this.state.approveData}
          approveStatusDescription={this.state.approveStatusDescription}
          onChange={this.onChange}
          vrProviderId={this.props.vrProviderId}
        />

        <InactiveServiceRequestModal
          visible={this.state.inactiveModal}
          onClose={this.CloseInactiveModal}
          loadingModal={this.state.inactiveLoading}
          inactiveReason={this.state.inactiveReason}
          onChangeText={this.onChangeText}
          proceed={this.InactiveWorkforceJob}
        />
      </>
    )
  }
}

export default ViewServiceRequestModal;