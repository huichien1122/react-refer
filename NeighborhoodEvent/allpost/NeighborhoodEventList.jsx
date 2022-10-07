import React, { Component } from 'react';

import { message, Row, Col, Table, Tag, Button,Tooltip,Space, Collapse, Input, Select, Modal } from 'antd';
import{  EyeOutlined, EditOutlined} from '@ant-design/icons';

import { withTranslation } from 'react-i18next';
import { getNeighborhoodEventList, inactiveNeighborhoodEvent } from '../../../Controller/Project/neighborhoodevent';
import { getResidentList } from '../../../Controller/Project/resident';
import ViewServiceRequestModal from './ViewServiceRequestModal';
import ServiceCancelModal from './ServiceCancelModal'
import ViewNeighborhoodEventModal from './ViewNeighborhoodEventModal';


const { Panel } = Collapse;
const {Option} = Select;
const { confirm } = Modal;

class NeighborhoodEventList extends Component{
    constructor(){
        super();
        this.state = {
        sortedData: {},
        data: [],
        loadingTable: true,
        total_records: 0,
        page: 1,
        limit: 10,
        orderBy: "id",
        orderType: "desc",
        status:"",
        title:"",
        category:"",
        price1:"",
        price2:"",
        code:"",
        requestCode:"",
        paymentMethod:"",
        providerId:0,

        residentList:[],

        vrLoading:false,
        vrModal:false,
        vrRequestList:false,
        vrId:0,
        vrStatus:"",
        vrProviderId:0,

        vrcLoading:false,
        vrcModal:false,
        vrcCancelReason:"",

        viewData:[],
        viewStatusDescription:"",
        viewPhoto:"",
        viewLoading: false,
        viewModal: false,
        }
    }

    componentDidMount(){
        this.getTableData();
        this.getResidentList();
    }

    getResidentList = async () => {
        const data = {
          page: 1,
          limit: 10000,
          order_by: "id",
          order_type: "asc",
          status:"A",
        }
        try{ 
          const ret = await getResidentList(data)
          if(ret.status === 200){
            this.setState({
              residentList: ret.data.data,
            })
            //console.log(ret);
          }else{
            message.error(ret.data.msg);
          }
    
        }catch(e){
          message.error("get resident list error");
          console.log(e);
        }
      }
    


    onChangeText = (e, key) => {
        this.setState({
        [key]: e.target.value,
        })
    }

    onChange = (e, key) => {
        this.setState({
        [key]: e,
        })
    };

    getTableData = async () => {
        this.setState({
        loadingTable: true,
        })
        const { page, limit, orderBy, orderType, title, status, category, code, requestCode,paymentMethod, price1, price2, providerId } = this.state;
        const data = {
        page: page,
        limit: limit,
        order_by: orderBy,
        order_type: orderType,
        title:title,
        category:category,
        price1:price1,
        price2:price2,
        code:code,
        request_code:requestCode,
        status:status,
        payment_method:paymentMethod,
        provider_id:providerId,
        }
        try{ 
        const ret = await getNeighborhoodEventList(data);
        if(ret.status === 200){
            this.setState({
            data: ret.data.data,
            total_records: ret.data.total_records,
            loadingTable: false,
            })
            //console.log(ret);
        }else{
            message.error(ret.data.msg);
            this.setState({
            loadingTable: false,
            data: [],
            })
        }

        }catch(e){
        message.error("table error");
        console.log(e);
        this.setState({
            loadingTable: false,
            data: [],
        })
        }
    }

    handleChange = (page, pageSize, sorter) => {
        let order_type = sorter.order !== false ? (sorter.order === "ascend" ? "asc" : (sorter.order === "descend" ? "desc" : "desc")) : "desc";
        let order_by  = sorter.column !== undefined ? sorter.field : "created_at";
        // console.log(order_type, order_by)
        this.setState({
            loadingTable: true,
            sortedData: sorter,
            page: page.current,
            limit: page.pageSize,
            orderBy: order_by,
            orderType: order_type,
        }, () => {
            this.getTableData();
        })
    }
  
    clearFilter = () => {
    const { title, status, category, code,requestCode, paymentMethod, price1, price2, providerId} = this.state;
    if (title==="" && status==="" && code==="" && requestCode==="" && paymentMethod==="" && price1===""
    && price2==="" && providerId===0 && category===""){
      //console.log("cannot")
    }
    else{
      this.setState({
        status:"",
        title:"",
        category:"",
        price1:"",
        price2:"",
        code:"",
        requestCode:"",
        paymentMethod:"",
        providerId:0,
      },() => {
        this.getTableData()
      });
    }
    
    };

    onFilter = () => {
        const { title, status, category, code, requestCode, paymentMethod, price1, price2, providerId} = this.state;
        if (title==="" && status==="" && code==="" && requestCode==="" && paymentMethod==="" && price1===""
        && price2==="" && providerId===0 && category===""){
        //console.log("cannot")
        }
        else{
        this.getTableData();
        }
    };

    handleProviderSelectorOnChange=(value, event) => {
        this.setState({ 
            providerId: value,      
        },()=>{
          //console.log(this.state.serviceProviderId)
        })
    };

    ViewMyNeighborhoodEventRequestModal= (record) => {
        this.setState({
            vrRequestList:record.NeighborhoodEventRequestList,
            vrLoading:false,
            vrModal:true,
            vrId:record.NeighborhoodEvent.id,
            vrStatus:record.NeighborhoodEvent.status,
            vrProviderId:record.NeighborhoodEvent.provider_id,
        },()=>{
          //console.log(this.state.vrProviderId);
        })
    };
    
    onCloseVRModal = () => {
        this.setState({
          vrLoading: false,
          vrModal: false,
          vrRequestList:[],
          vrId:0,
          vrStatus:"",
          vrProviderId:0,
        },()=>{
            this.getTableData();
            //this.getAssetReserveList();
        })
    };

    onCancelServiceModal = () => {
        this.setState({
          vrcLoading: false,
          vrcModal: true,
          vrcCancelReason:""
        })
    };
    
      
    CloseCancelModal= () => {
        this.setState({
          vrcLoading:false,
          vrcModal:false,
          vrcCancelReason:"",
        },()=>{
          this.onCloseVRModal();
        })
    };

    cancelNeighborhoodEvent= () => {
        const {vrcCancelReason, vrId} = this.state;
        if (vrId !== 0 || vrcCancelReason===""){
            
            confirm({
                title: 'Are you sure want to inactive the event : ' +(vrId)+  ' ?',
                content: '',
                onOk:() => {
                  this.setState({
                    vrcLoading: true,
                  }, ()=>{
                    this.onFinalCancel();
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
    
    onFinalCancel = async () => {
        const {vrcCancelReason, vrId} = this.state;
        
        const data = {
            id: vrId,
            reason:vrcCancelReason
        }
    
        try{ 
          const ret = await inactiveNeighborhoodEvent(data);
          if(ret.status === 200){
              message.success("Neighborhood Event Inactive Successfully !");
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

    ViewMyNeighborhoodEventModal= (data) => {
        let txt = "";
    
        switch(data.NeighborhoodEvent.status){
            case "C":
            txt = 'Canceled'
          break;
            case "E":
            txt = 'End Service'
          break;
            case "I":
            txt = 'Inactive'
          break;
          case "S":
            txt = 'Close Request, Transaction in processing'
          break;
          case "P":
            txt = 'Pending Request'
          break;
          case "RI":
            txt = 'Be Reported'
          break;
          default:
            txt = 'Status Undefined'
          break;
        }
    
        this.setState({
          viewLoading: false,
          viewModal: true,
          viewData: data.NeighborhoodEvent,
          viewPhoto:data.NeighborhoodEvent.photo,
          viewStatusDescription:txt,
        })
    };
      
    onCloseViewModal= () => {
        this.setState({
          viewLoading: false,
          viewModal: false,
          viewData: "",
          viewPhoto:"",
          viewStatusDescription:"",
        },()=>{
          this.getTableData();
        })
    };
    
      


  render() {
    const { t } = this.props;
    const { 
      sortedData, page, total_records, data,
     } = this.state;
    const sortedInfo = sortedData || {};

    const columns = [
        {
            title: t('table.no'),
            dataIndex: 'index',
            key: 'index',
            width: '3%',
            render : (text,record,index) => (index + 1) + (page - 1) * 10  ,
        },
        {
            title: "Event Title",
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title - b.title,
            sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`title${record.NeighborhoodEvent.title}${index}`}>
                    {record.NeighborhoodEvent.title}
                </span>
        )
        },
        {
            title: "Code",
            dataIndex: 'code',
            key: 'code',
            sorter: (a, b) => a.code - b.code,
            sortOrder: sortedInfo.columnKey === 'code' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`code${record.NeighborhoodEvent.code}${index}`}>
                    {record.NeighborhoodEvent.code}
                </span>
            )
        },  
        {
          title: "Status",
          dataIndex: 'status',
          key: 'status',
          sorter: (a, b) => a.status - b.status,
          sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
          render: (text, record, index) => {
            let color = "";
            let txt = "";
            switch(record.NeighborhoodEvent.status){
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
                case "E":
                    color = 'blue'
                    txt = 'End Event'
                    break;
                case "S":
                    color = 'yellow'
                    txt = 'Close Request, In Progress'
                    break;
                default:
                    color = 'default'
                    txt = record.NeighborhoodEvent.status
                    break;
            }
            return(
              <span key={`sts${record.NeighborhoodEvent.status}${index}`}>
                <Tag color={color}>{txt}</Tag>
              </span>       
          )
          }
        },
        {
            title: "Category",
            dataIndex: 'category',
            key: 'category',
            sorter: (a, b) => a.category - b.category,
            sortOrder: sortedInfo.columnKey === 'category' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`category${record.NeighborhoodEvent.category}${index}`}>
                    {record.NeighborhoodEvent.category}
                </span>
            )
        },
        {
            title: "Price",
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`price${record.NeighborhoodEvent.price}${index}`}>
                    {record.NeighborhoodEvent.price}
                </span>
            )
        },
        {
            title: "Payment Method",
            dataIndex: 'payment_method',
            key: 'payment_method',
            sorter: (a, b) => a.payment_method - b.payment_method,
            sortOrder: sortedInfo.columnKey === 'payment_method' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`payment_method${record.NeighborhoodEvent.payment_method}${index}`}>
                    {record.NeighborhoodEvent.payment_method}
                </span>
            )
        },
        {
          title: "Event Provider Email",
          dataIndex: 'provider_email',
          key: 'provider_email',
          sorter: (a, b) => a.provider_email - b.provider_email,
          sortOrder: sortedInfo.columnKey === 'provider_email' && sortedInfo.order,
          render: (text, record, index) => {
            let txt = "";
            if(record.NeighborhoodEvent.provider_email===""){
              txt='NULL'
            }else{
              txt=record.NeighborhoodEvent.provider_email
            }
            return(
              <span key={`provider_email${record.NeighborhoodEvent.provider_email}${index}`}>
                  {txt}
              </span>
            )
          }
        },
        {
          title: t('Action'),             
          key: 'action',
          render: (text, record, index) => (
            <Space size="middle">
          <Tooltip placement="left" title="Edit">
            <Button onClick={()=>this.ViewMyNeighborhoodEventRequestModal(record)} shape="circle" icon={<EditOutlined />} />
          </Tooltip> 
          <Tooltip placement="left" title="Edit">
            <Button onClick={()=>this.ViewMyNeighborhoodEventModal(record)} shape="circle" icon={<EyeOutlined />} />
          </Tooltip>          
          </Space>  
           
          )
        },
    ];

    const residentSelectorItems = this.state.residentList.map((e) =>
          <Option value={e.id} >{e.detailed_address} ({e.email})</Option>
    );

    return (
      <>
        <Row>
          <Col span={12}>
            <h1>Neighborhood Event List</h1>
          </Col>
        </Row>
        <br />

        <Row>
            <Col span={24}>
            <Collapse defaultActiveKey={['0']} onChange={this.callback}>
                <Panel header="Choose to Filter : " key="1">
                    <Row align="middle">
                        <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                            <b>Title : </b>
                        </Col>
                        <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                            <Input value={this.state.title} maxLength={50} onChange={(e)=>this.onChangeText(e, 'title')}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row align="middle">
                        <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                            <b>Code : </b>
                        </Col>
                        <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                            <Input value={this.state.code} maxLength={50} onChange={(e)=>this.onChangeText(e, 'code')}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row align="middle">
                        <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                            <b>Event Request Code : </b>
                        </Col>
                        <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                            <Input value={this.state.requestCode} maxLength={50} onChange={(e)=>this.onChangeText(e, 'requestCode')}/>
                        </Col>
                    </Row>
                    <br/>
                    <Row align="middle">
                        <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                            <b>Category : </b>
                        </Col>
                        <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                        <Select value={this.state.category} onChange={(e)=>this.onChange(e, 'category')} style={{ width: '100%' }}>
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
                    <br/>
                    <Row align="middle">
                        <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                            <b>Payment Method : </b>
                        </Col>
                        <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                        <Select value={this.state.paymentMethod} onChange={(e)=>this.onChange(e, 'paymentMethod')} style={{ width: '100%' }}>
                            <Option value={"Cash"}>Cash</Option>
                            <Option value={"E-Wallet"}>E-Wallet</Option>
                            <Option value={"Online Banking"}>Online Banking</Option>
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row align="middle">
                        <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                            <b>Lowest Price : </b>
                        </Col>
                        <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                            <Select value={this.state.price1} onChange={(e)=>this.onChange(e, 'price1')} style={{ width: '100%' }}>
                            <Option value={"0"}>FREE</Option>
                            <Option value={"3"}>RM3</Option>
                            <Option value={"5"}>RM5</Option>
                            <Option value={"10"}>RM10</Option>
                            <Option value={"15"}>RM15</Option>
                            <Option value={"20"}>RM20</Option>
                            <Option value={"25"}>RM25</Option>
                            <Option value={"30"}>RM30</Option>
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row align="middle">
                        <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                            <b>Highest Price : </b>
                        </Col>
                        <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                            <Select value={this.state.price2} onChange={(e)=>this.onChange(e, 'price2')} style={{ width: '100%' }}>
                            <Option value={"0"}>FREE</Option>
                            <Option value={"5"}>RM5</Option>
                            <Option value={"10"}>RM10</Option>
                            <Option value={"20"}>RM20</Option>
                            <Option value={"30"}>RM30</Option>
                            <Option value={"40"}>RM40</Option>
                            <Option value={"50"}>RM50</Option>
                            <Option value={"60"}>RM60</Option>
                            <Option value={"70"}>RM70</Option>
                            <Option value={"80"}>RM80</Option>
                            <Option value={"90"}>RM90</Option>
                            <Option value={"100"}>RM100</Option>
                            <Option value={"300"}>RM300</Option>
                            <Option value={"500"}>RM500</Option>
                            <Option value={"1000"}>RM1000</Option>
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row align="middle">
                        <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                            <b>Provider Email : </b>
                        </Col>
                        <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                            <Select
                            showSearch
                            style={{ width: '100%' }}
                                
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                            option.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                            optionA.children.toString().toLowerCase().localeCompare(optionB.children.toString().toLowerCase())
                            }

                            value={this.state.providerId}

                            onSelect={(value, event) => this.handleProviderSelectorOnChange(value, event)}
                            >
                            <Option value={0}>Select Provider Email</Option>       
                            {residentSelectorItems}
                        </Select>
                        </Col>
                    </Row>
                    <br/>
                <Row align="middle">
                    <Col span={1.5} className="left-item">
                        <Button type="primary" onClick={this.onFilter}>Filter</Button>
                    </Col>
                    <Col span={1.5} offset={1} className="left-item">
                        <Button type="primary" onClick={this.clearFilter}>Clear</Button>
                    </Col>
                </Row>
                <br/>
                </Panel>
            </Collapse>
            </Col>
          </Row>
          <br />


        <>
        <Row>
          <Col span={24}>
            <Table 
              className="responsive__table table__root"
              key="tb1"
              rowKey="uid"
              columns={columns}
              dataSource={data}
              dataIndex={true}
              // scroll={{ x: 2000 }}
              onChange={this.handleChange}
              // loading={loadingTable}
              pagination={{defaultCurrent: 1,
                  total:total_records ,
                  showTotal:(total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                  showSizeChanger: true,
                  position: ['bottomRight'],
                  size: 'small',
              }}
              onRow={(record, rowIndex) => {
                  return {
                  // onClick: event => {this.handleRow(record)}, // click row
                  };
              }}
          />
          </Col>
        </Row>
        </>
        <ViewServiceRequestModal
          visible={this.state.vrModal}
          onClose={this.onCloseVRModal}
          
          loadingModal={this.state.vrLoading}
          requestList={this.state.vrRequestList}
          vrStatus={this.state.vrStatus}
          vrProviderId={this.state.vrProviderId}
          onInactive={this.onCancelServiceModal}
        />

        <ServiceCancelModal
          visible={this.state.vrcModal}
          onClose={this.CloseCancelModal}
          proceed={this.cancelNeighborhoodEvent}
          loadingModal={this.state.vrcLoading}
          vrcCancelReason={this.state.vrcCancelReason}
          onChangeText={this.onChangeText}
        />

        <ViewNeighborhoodEventModal
            visible={this.state.viewModal}
            onClose={this.onCloseViewModal}
            loadingModal={this.state.viewLoading}
            viewData={this.state.viewData}
            viewPhoto={this.state.viewPhoto}
            viewStatusDescription={this.state.viewStatusDescription}
        />
        </>
    )
  }
}

export default withTranslation('common')(NeighborhoodEventList);