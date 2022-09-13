import React, { Component } from 'react';
import { message, Row, Col, Table, Tag, Button,Tooltip,Space, Collapse, Input, Select, Modal} from 'antd';
import{  EditOutlined } from '@ant-design/icons';
import { getResidentList, updResidentStatus, getHomeOwnerList } from '../../Controller/Project/resident'
import { withTranslation } from 'react-i18next';
import ViewEditResidentModal from './ViewEditResidentModal';
import moment from 'moment';
import { db,} from "../../../firebase";
import { collection,
  query,
  onSnapshot,
  doc,
  updateDoc} from "firebase/firestore";
import { getResidentTotalRating } from '../../Controller/Project/feedback';

const { confirm } = Modal;
const { Panel } = Collapse;
const {Option} = Select;

class ResidentList extends Component{
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
      email:"",
      fname:"",
      lname:"",
      contact_number:"",
      status:"",
      detailed_address:"",
      home_owner_id:0,

      viewID:"",
      viewEmail:"",
      viewRole:"",
      viewStatus:"",
      viewCreatedAt:"",
      viewCreatedBy:"",
      viewUpdatedAt:"",
      viewUpdatedBy:"",
      viewLname:"",
      viewFname:"",
      viewDetailedAddress:"",
      viewAvatar:"",
      viewContactNumber:"",
      viewAbout:"",
      viewTotalRating:"",
      viewHomeOwner:"",
      viewCommunitiesName:"",
      viewCommunitiesId:0,
      viewLoading: false,
      viewModal: false,
      isEditStatus:true,
      isStatus:true,
      viewStatusDescription:"",
      isPVO:false,

      homeOwnerList:[],
    }
  }

  componentDidMount(){
    this.getTableData();
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

  getHomeOwnerList = async() => {

    try{ 
      const ret = await getHomeOwnerList()
      if(ret.status === 200){
        this.setState({
          homeOwnerList: ret.data.data,
        },()=>{
          //console.log(this.state.homeOwnerList);
        })
      }else{
        message.error(ret.data.msg);
      }

    }catch(e){
    }
  };

  getTableData = async () => {
    this.setState({
      loadingTable: true,
    })
    const { page, limit, orderBy, orderType, email, status, fname, lname, contact_number, detailed_address, home_owner_id } = this.state;
    const data = {
      page: page,
      limit: limit,
      order_by: orderBy,
      order_type: orderType,
      email:email,
      fname:fname,
      lname:lname,
      contact_number:contact_number,
      status:status,
      detailed_address: detailed_address,
      home_owner_id: home_owner_id
    }
    try{ 
      const ret = await getResidentList(data)
      if(ret.status === 200){
        this.setState({
          data: ret.data.data,
          total_records: ret.data.total_records,
          loadingTable: false,
        },()=>{
          this.getHomeOwnerList();
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

  getResidentTotalRating = async(residentId) => {
    const data = {
      resident_id: residentId
    }
    try{
      const ret = await getResidentTotalRating(data);
      //console.log(ret.data)
      if(ret.data.statusCode === 200){
        this.setState({
          viewTotalRating: ret.data.data,
          viewLoading: false,
          viewModal: true,
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


  viewResidentListModal= (record) => {
    if(record.status==="A" || record.status==="I"){
      if(record.status==="A"){
        this.setState({
          viewID:record.id,
          viewEmail:record.email,
          viewRole:record.role,
          viewStatus:record.status,
          viewCreatedAt:record.created_at,
          viewCreatedBy:record.created_by,
          viewUpdatedAt:record.updated_at,
          viewUpdatedBy:record.updated_by,
          viewLname:record.lname,
          viewFname:record.fname,
          viewDetailedAddress:record.detailed_address,
          viewAvatar:record.avatar,
          viewContactNumber:record.contact_number,
          viewAbout:record.about,
          viewHomeOwner:record.home_owner,
          viewCommunitiesName:record.communities_name,
          viewCommunitiesId:record.communities_id,
          isEditStatus:true,
          isStatus:false,
          viewStatusDescription:"Active"
        },()=>{
          this.getResidentTotalRating(record.id);
        })
      }else{
        this.setState({
          viewID:record.id,
          viewEmail:record.email,
          viewRole:record.role,
          viewStatus:record.status,
          viewCreatedAt:record.created_at,
          viewCreatedBy:record.created_by,
          viewUpdatedAt:record.updated_at,
          viewUpdatedBy:record.updated_by,
          viewLname:record.lname,
          viewFname:record.fname,
          viewDetailedAddress:record.detailed_address,
          viewAvatar:record.avatar,
          viewContactNumber:record.contact_number,
          viewAbout:record.about,
          viewHomeOwner:record.home_owner,
          viewCommunitiesName:record.communities_name,
          viewCommunitiesId:record.communities_id,
          isEditStatus:false,
          isStatus:false,
          viewStatusDescription:"Inactive"
        },()=>{
          this.getResidentTotalRating(record.id);
        })
      }
    }else{
      if(record.status==="PVO"){
        this.setState({
          viewID:record.id,
          viewEmail:record.email,
          viewRole:record.role,
          viewStatus:record.status,
          viewCreatedAt:record.created_at,
          viewCreatedBy:record.created_by,
          viewUpdatedAt:record.updated_at,
          viewUpdatedBy:record.updated_by,
          viewLname:record.lname,
          viewFname:record.fname,
          viewDetailedAddress:record.detailed_address,
          viewAvatar:record.avatar,
          viewContactNumber:record.contact_number,
          viewAbout:record.about,
          viewTotalRating:record.total_rating,
          viewHomeOwner:record.home_owner,
          viewCommunitiesName:record.communities_name,
          viewCommunitiesId:record.communities_id,
          viewLoading: false,
          viewModal: true,
          isEditStatus:false,
          isStatus:true,
          viewStatusDescription:"Pending Verify By Owner",
          isPVO:true,
        })
      }else{
          this.setState({
            viewID:record.id,
            viewEmail:record.email,
            viewRole:record.role,
            viewStatus:record.status,
            viewCreatedAt:record.created_at,
            viewCreatedBy:record.created_by,
            viewUpdatedAt:record.updated_at,
            viewUpdatedBy:record.updated_by,
            viewLname:record.lname,
            viewFname:record.fname,
            viewDetailedAddress:record.detailed_address,
            viewAvatar:record.avatar,
            viewContactNumber:record.contact_number,
            viewAbout:record.about,
            viewTotalRating:record.total_rating,
            viewHomeOwner:record.home_owner,
            viewCommunitiesName:record.communities_name,
            viewCommunitiesId:record.communities_id,
            viewLoading: false,
            viewModal: true,
            isEditStatus:false,
            isStatus:true,
            viewStatusDescription:"Pending Verify By Administrator",
            isPVO:false,
        })
      }
      
    }
  }

  
  onCloseViewModal= () => {
    this.setState({
      viewLoading: false,
      viewModal: false,
      viewID:"",
      viewEmail:"",
      viewRole:"",
      viewStatus:"",
      viewCreatedAt:"",
      viewCreatedBy:"",
      viewUpdatedAt:"",
      viewUpdatedBy:"",
      viewLname:"",
      viewFname:"",
      viewDetailedAddress:"",
      viewAvatar:"",
      viewContactNumber:"",
      viewAbout:"",
      viewTotalRating:"",
      viewHomeOwner:"",
      viewCommunitiesName:"",
      viewCommunitiesId:0,
      isStatus:true,
      isEditStatus:true,
    },()=>{
      this.getTableData();
    })
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
    const { email, status, fname, lname, contact_number, detailed_address, home_owner_id} = this.state;
    if (email==="" && status==="" && fname ==="" && lname ==="" && contact_number===""&& detailed_address==="" && home_owner_id===0){
      //console.log("cannot")
    }
    else{
      this.setState({
        email:"",
        status:"",
        fname:"",
        lname:"",
        contact_number:"",
        detailed_address:"",
        home_owner_id:0
      },() => {
        this.getTableData()
      });
    }
    
  };

  onFilter = () => {
      const { email, status, fname, lname, contact_number, detailed_address, home_owner_id} = this.state;
      if (email==="" && status==="" && fname ==="" && lname ==="" && contact_number===""
      && detailed_address==="" && home_owner_id===0){
        //console.log("cannot")
      }
      else{
        this.getTableData();
      }
  };

  onChangeEditSwitch = () => {
    this.setState({
        isEditStatus: this.state.isEditStatus? false: true,
        viewStatus: this.state.isEditStatus? "I": "A"
    }, ()=>{
      //console.log(this.state.isStatus)
      //console.log(this.state.editStatus)

    })
  };

  editStatus = () => {
    const {viewID} = this.state;
    if (viewID !== 0){
        
        confirm({
            title: 'Are you sure want to edit : ' +(viewID)+  ' ?',
            content: '',
            onOk:() => {
              this.setState({
                loading: true,
              }, ()=>{
                this.onFinalEditStatus();
              })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }else{
      message.error("Resident ID not found!");
    }
  };


  approve = () => {
    const {viewID} = this.state;
    if (viewID !== 0){
        
        confirm({
            title: 'Are you sure want to approve request from member : ' +(viewID)+  ' ?',
            content: '',
            onOk:() => {
              this.setState({
                loading: true,
                viewStatus:"A"
              }, ()=>{
                this.onFinalEditStatus();
              })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }else{
      message.error("Resident ID not found!");
    }
  };

  reject = () => {
    const {viewID} = this.state;
    if (viewID !== 0){
        
        confirm({
            title: 'Are you sure want to reject request from member : ' +(viewID)+  ' ?',
            content: '',
            onOk:() => {
              this.setState({
                loading: true,
                viewStatus:"R"
              }, ()=>{
                this.onFinalEditStatus();
              })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }else{
      message.error("Resident ID not found!");
    }
  };

  onFinalEditStatus = async () => {
    const {viewID, viewStatus, viewCommunitiesId, viewEmail} = this.state;
    
    const data = {
        id: viewID,
        status:viewStatus,
    }

    console.log(viewCommunitiesId, viewEmail)
    try{ 
        const ret = await updResidentStatus(data)
        if(ret.status === 200){
            //console.log(ret);
            //console.log(viewCommunitiesId,viewEmail)
            if(viewStatus ==="A"){
              const usersRef = collection(db, "users");
              // create query object
              const q = query(usersRef);
              // execute query
              onSnapshot(q, (querySnapshot) => {
                
                querySnapshot.forEach((doc1) => {
                  if(viewCommunitiesId === doc1.data().communities_id && viewEmail === doc1.data().email){
                    this.setState({
                    },async()=>{
                      await updateDoc(doc(db, "users", doc1.data().uid), {
                        active: true,
                      });
                    })
                  }
                  return
                });            
                
              });

            }else{
              const usersRef = collection(db, "users");
              // create query object
              const q = query(usersRef);
              // execute query
              onSnapshot(q, (querySnapshot) => {
                
                querySnapshot.forEach((doc1) => {
                  if(viewCommunitiesId === doc1.data().communities_id && viewEmail === doc1.data().email){
                    this.setState({
                    },async()=>{
                      await updateDoc(doc(db, "users", doc1.data().uid), {
                        active: false,
                      });
                    })
                  }
                  return
                });            
                
              });
            }
            message.success("Resident Status Edited Successfully!");
            this.onCloseViewModal();
            this.getTableData();
            
        }else{
            message.error(ret.data.msg);
            this.setState({
            data: [],
            })
            this.onCloseViewModal();
            this.getTableData();
        }

        }catch(e){
        message.error("Edit error");
        console.log(e);
        this.setState({
            data: [],
        })
        this.getTableData();
    }
  };

  handleOwnerSelectorOnChange=(value, event) => {
    this.setState({ 
      home_owner_id: value,      
    },()=>{
      //console.log(this.state.home_owner_id)
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
        title: "Detailed Address",
        dataIndex: 'detailed_address',
        key: 'detailed_address',
        sorter: (a, b) => a.detailed_address - b.detailed_address,
        sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
        render: (text, record, index) => (
            <span key={`detailed_address${record.detailed_address}${index}`}>
                {record.detailed_address}
            </span>
        )
      },
      {
        title: "Email",
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email - b.email,
        sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
        render: (text, record, index) => (
            <span key={`email${record.email}${index}`}>
                {record.email}
            </span>
        )
        },
        {
            title: "Contact Number",
            dataIndex: 'contact_number',
            key: 'contact_number',
            sorter: (a, b) => a.contact_number - b.contact_number,
            sortOrder: sortedInfo.columnKey === 'contact_number' && sortedInfo.order,
            render: (text, record, index) => (
                <span key={`contact_number${record.contact_number}${index}`}>
                    {record.contact_number}
                </span>
            )
        },
        {
          title: "Role",
          dataIndex: 'role',
          key: 'role',
          sorter: (a, b) => a.role - b.role,
          sortOrder: sortedInfo.columnKey === 'role' && sortedInfo.order,
          render: (text, record, index) => {
            let color = "";
            switch(record.role){
                case "Master Owner":
                    color = 'Green'
                break;
                case "Sub Owner":
                   color = 'Blue'
                break;
                default:
                   color = 'default'
                break;
               }
               return(
                 <span key={`sts${record.role}${index}`}>
                   <Tag color={color}>{record.role}</Tag>
                 </span>       
             )
          }
        }
        ,
        {
          title: "Status",
          dataIndex: 'status',
          key: 'status',
          sorter: (a, b) => a.status - b.status,
          sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
          render: (text, record, index) => {
            let color = "";
            let txt = "";
            switch(record.status){
              case "A":
                color = 'green'
                txt = 'Active'
                break;
              case "I":
                color = 'red'
                txt = 'Inactive'
                break;
              case "PVO":
                color = 'purple'
                txt = 'Pending Verify By Owner'
              break;
              case "PVA":
                color = 'blue'
                txt = 'Pending Verify By Administator'
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
          title: "Created At",
          dataIndex: "created_at",
          key: 'created_at',
          sorter: (a, b) => a.created_at - b.created_at,
          sortOrder: sortedInfo.columnKey === 'created_at' && sortedInfo.order,
          render: date => moment(date).format("DD-MM-YYYY hh:mm:ss a")

        },
        {
          title: "Created By",
          dataIndex: 'created_by',
          key: 'created_by',
          sorter: (a, b) => a.created_by - b.created_by,
          sortOrder: sortedInfo.columnKey === 'created_by' && sortedInfo.order,
          render: (text, record, index) => {
            let txt = "";
            if(record.created_by===""){
              txt='Own Register'
              return(
              <span key={`created_by${record.created_by}${index}`}>
                  <Tag color="default">{txt}</Tag>
              </span>
            )
            }else{
              return(
                <span key={`created_by${record.created_by}${index}`}>
                    {record.created_by}
                </span>
              )
            }
            
          }
        },
        {
          title: t('Action'),             
          key: 'action',
          render: (text, record, index) => (
            <Space size="middle">
              <Tooltip placement="right" title="View">  
                <Button onClick={()=>this.viewResidentListModal(record)} shape="circle" icon={<EditOutlined />} />
              </Tooltip>        
            </Space>  
           
          )
        },
    ];


    const homeOwnerSelectorItems = this.state.homeOwnerList.map((e) =>
    <Option value={e.id} >{e.email} ({e.detailed_address})</Option>
    );

    return (
      <>
        <Row>
          <Col span={12}>
            <h1>Resident List</h1>
          </Col>
        </Row>
        <br />

        <Row>
            <Col span={24}>
            <Collapse defaultActiveKey={['0']} onChange={this.callback}>
                <Panel header="Choose to Filter : " key="1">
                <Row align="middle">
                    <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                        <b>Email : </b>
                    </Col>
                    <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                        <Input value={this.state.email} maxLength={50} onChange={(e)=>this.onChangeText(e, 'email')}/>
                    </Col>
                </Row>
                <br/>
                <Row align="middle">
                    <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                        <b>Detailed Address : </b>
                    </Col>
                    <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                        <Input value={this.state.detailed_address} maxLength={50} onChange={(e)=>this.onChangeText(e, 'detailed_address')}/>
                    </Col>
                </Row>
                <br/>
                <Row align="middle">
                    <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                        <b>Home Owner : </b>
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

                        value={this.state.home_owner_id}

                        onSelect={(value, event) => this.handleOwnerSelectorOnChange(value, event)}
                        >
                        <Option value={0}>Please Select Owner Email</Option>       
                        {homeOwnerSelectorItems}
                      </Select>
                    </Col>
                </Row>
                <br/>
                <Row align="middle">
                    <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                        <b>Status : </b>
                    </Col>
                    <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                        <Select value={this.state.status} onChange={(e)=>this.onChange(e, 'status')} style={{ width: '100%' }}>
                        <Option value={""}>Please Select Status</Option>
                        <Option value={"A"}>Active</Option>
                        <Option value={"I"}>Inactive</Option>
                        <Option value={"PVO"}>Pending Verify By Owner</Option>
                        <Option value={"PVA"}>Pending Verify By Administrator</Option>
                        </Select>
                    </Col>
                </Row>
                <br/>
                <Row align="middle">
                    <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                        <b>Last Name : </b>
                    </Col>
                    <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                        <Input value={this.state.lname} maxLength={50} onChange={(e)=>this.onChangeText(e, 'lname')}/>
                    </Col>
                </Row>
                <br/>
                <Row align="middle">
                    <Col xs={6} sm={5} md={4} lg={4} xl={4}>
                        <b>First Name : </b>
                    </Col>
                    <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                        <Input value={this.state.fname} maxLength={50} onChange={(e)=>this.onChangeText(e, 'fname')}/>
                    </Col>
                </Row>
                <br/>
                <Row align="middle">
                    <Col xs={6} sm={5} md={5} lg={4} xl={4}>
                        <b>Contact Number : </b>
                    </Col>
                    <Col xs={17} sm={14} md={11} lg={6} xl={6} className="left-item">
                        <Input value={this.state.contact_number} maxLength={50} onChange={(e)=>this.onChangeText(e, 'contact_number')}/>
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
            <ViewEditResidentModal
              visible={this.state.viewModal}
              onClose={this.onCloseViewModal}

              loadingModal={this.state.viewLoading}

              viewID={this.state.viewID}
              viewEmail={this.state.viewEmail}
              viewRole={this.state.viewRole}
              viewStatus={this.state.viewStatus}
              viewLname={this.state.viewLname}
              viewFname={this.state.viewFname}
              viewDetailedAddress={this.state.viewDetailedAddress}
              viewAvatar={this.state.viewAvatar}
              viewContactNumber={this.state.viewContactNumber}
              viewAbout={this.state.viewAbout}
              viewTotalRating={this.state.viewTotalRating}
              viewHomeOwner={this.state.viewHomeOwner}
              viewCommunitiesName={this.state.viewCommunitiesName}
              viewCreatedAt={this.state.viewCreatedAt}
              viewCreatedBy={this.state.viewCreatedBy}
              viewUpdatedAt={this.state.viewUpdatedAt}
              viewUpdatedBy={this.state.viewUpdatedBy}

              isEditStatus={this.state.isEditStatus}
              isStatus={this.state.isStatus}
              isPVO={this.state.isPVO}
              viewStatusDescription={this.state.viewStatusDescription}

              onChangeEditSwitch = {this.onChangeEditSwitch}

              approve={this.approve}
              reject={this.reject}
              editStatus={this.editStatus}
            
            />        
        </>
    )
  }
}

export default withTranslation('common')(ResidentList);