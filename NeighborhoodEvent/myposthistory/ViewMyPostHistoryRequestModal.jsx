import { Modal, Row, Col, Button, Spin, Table, Tag, Tooltip, Space } from 'antd';
import{  EditOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import moment from 'moment';
import RateMyNeighborhoodEventPostHistory from './RateMyNeighborhoodEventPostHistory';

class ViewMyPostHistoryRequestModal extends Component{

  constructor(){
    super();
    this.state = {
      viewData:[],
      viewStatusDescription:"",
      viewLoading: false,
      viewModal: false,
      viewID:0,

    }
  }

  viewNearbyNeighborhoodEventModal= (data) => {
    
    let txt = "";

    switch(data.status){
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
      viewLoading: false,
      viewModal: true,
      viewData: data,
      viewStatusDescription:txt,
      viewID:data.id
    },()=>{
      //console.log(data);
    })
  };



  onCloseViewModal= () => {
    this.setState({
      viewLoading: false,
      viewModal: false,
      viewData: "",
      viewStatusDescription:"",
      viewID:0
    },()=>{
      //this.props.onClose();
    })
  };


  
  render() {
    const {
        loadingModal,
        requestList,
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
            <Button onClick={()=>this.viewNearbyNeighborhoodEventModal(record)} shape="circle" icon={<EditOutlined />} />
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
          title={"Neighborhood Event Request"}
          footer={null}
          width={1050}
        >
            <Spin spinning={loadingModal}>
                <br/>
                <Row>
                    <Col span={24} className="right-item">
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

        <RateMyNeighborhoodEventPostHistory
          visible={this.state.viewModal}
          onClose={this.onCloseViewModal}
          loadingModal={this.state.viewLoading}
          viewData={this.state.viewData}
          viewStatusDescription={this.state.viewStatusDescription}    
          providerId={this.props.vrProviderId}
        />
      </>
    )
  }
}

export default ViewMyPostHistoryRequestModal;