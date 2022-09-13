import React, { Component } from 'react';

import { message, Row, Col, Table, Tag, Button,Tooltip,Space, Collapse, Input, Select, Modal} from 'antd';
import{  EditOutlined} from '@ant-design/icons';

import AddAdminModal from './AddAdminModal';
import EditAdminModal from './EditAdminModal';
import { getAdminList, addAdmin, editAdmin} from '../../Controller/Project/admin'
import { GetProfile } from '../../Controller/Project/memprofile';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth, db,} from "../../../firebase";
import { collection,
  query,
  onSnapshot,
  Timestamp,
  setDoc,
  doc,
  updateDoc} from "firebase/firestore";
import validator from 'validator'

const { confirm } = Modal;
const { Panel } = Collapse;
const {Option} = Select;

class AdminList extends Component{
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
      status:"",
      communities_id:0,
      role:0,

      addLoading: false,
      addModal: false,
      addEmail: "",
      addPassword: "",
      addConfirmPassword:"",
      addFname:"",
      addLname:"",
      addPosition:"",
      addContactNumber:"",
      addRole:0,
      isAddRole:false,

      editEmail:"",
      editCreatedAt:"",
      editCreatedBy:"",
      editAvatar:"",
      editID:0,
      editStatus:"",
      editFname:"",
      editLname:"",
      editPosition:"",
      editContactNumber:"",
      editLoading: false,
      editModal: false,
      isEditStatus:true,
      editRole:0,
      isEditRole:true,
    }
  }

  componentDidMount(){
    this.getTableData();
    this.getProfile();
  }

  getProfile = async() => {
    try{
      const ret = await GetProfile();
      //console.log(ret.data)
      if(ret.data.statusCode === 200){
        this.setState({
          communities_id: ret.data.data.communities_id,
          role: ret.data.data.owner,
        },()=>{
          //console.log(this.state.role);
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

  onChangeAddRoleSwitch = () => {
    this.setState({
        isAddRole: this.state.isAddRole? false: true,
        addRole: this.state.isAddRole? 0: 1
    }, ()=>{
      //console.log(this.state.isAddRole)
      //console.log(this.state.addRole)

    })
    
  };

  onChangeEditRoleSwitch = () => {
    this.setState({
        isEditRole: this.state.isEditRole? false: true,
        editRole: this.state.isEditRole? 0: 1
    }, ()=>{
      //console.log(this.state.isEditRole)
      //console.log(this.state.editRole)

    })
    
  };

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
    const { page, limit, orderBy, orderType, email, status } = this.state;
    const data = {
      page: page,
      limit: limit,
      order_by: orderBy,
      order_type: orderType,
      email:email,
      status:status
    }
    try{ 
      const ret = await getAdminList(data)
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


  addAdmin = () => {
    this.setState({
      addModal: true,
      isOwner:true,
    })
  }

  onCloseAddModal = () => {
    this.setState({
      addLoading: false,
      addModal: false,
      addEmail: "",
      addPassword: "",
      addConfirmPassword:"",
      addFname:"",
      addLname:"",
      addPosition:"",
      addContactNumber:""
    })
  }

  onAddAdmin = () => {
    const { addEmail,
      addPassword,
      addConfirmPassword,
      addFname,
      addLname,
      addPosition,
      addContactNumber,
      communities_id } = this.state;

    if(addEmail === "" || addPassword === "" || addConfirmPassword===""
    || addFname === "" || addLname === "" || addPosition === "" || addContactNumber === ""){
      message.warn("Please Input value");
    } 
    else if (addConfirmPassword !== addPassword){
      message.warn("Make sure password must same with confirm password!");
    }
    else if(communities_id === 0){
      message.warn("Communities ID undefined!");
    }
    else if (!validator.isEmail(addEmail)){
      message.warn("Email is not valid!");
    }
    else if (addPassword.length < 6){
      message.warn("Make sure password must more than 6 character!");
    }
    else {
      this.setState({
      addLoading: true,
      },()=>{this.onSignupFirebase(addEmail, addPassword, communities_id);})
    }
  }
  onSignupFirebase= async(email, password, communities_id) => {
    //console.log(email, password);
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        if (result.user.uid !== ""){
          
          await setDoc(doc(db, "users", result.user.uid), {
          uid: result.user.uid,
          email: email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: false,
          communities_id:communities_id,
          active:true,
          role:"admin"
          });

          //console.log(result.user.uid);
          this.onFinalAddAdmin();
          
        }
        
      } catch (e) {
        message.error("The Email Already In Use!");
        console.log(e);
        this.setState({
          addLoading: false,
        })
      }
  };

  
  onFinalAddAdmin = async() => {
    
    const { addEmail,
      addPassword,
      addFname,
      addLname,
      addPosition,
      addContactNumber,
      addRole } = this.state;
    
      const data = {
        email: addEmail,
        password: addPassword,
        fname:addFname,
        lname:addLname,
        position: addPosition,
        contact_number: addContactNumber,
        role:addRole
      }

    try{
      const ret = await addAdmin(data)
      if(ret.status === 200){
        message.success("Admin Added Successfully!");
        this.onCloseAddModal();
        this.getTableData();
      } else {
        this.setState({
          addLoading: false,
        })
        message.error(ret.data.msg);
      }
    }catch(e){
      //
    }
  }
  
  clearFilter = () => {
    const { email, status  } = this.state;
    if (email==="" && status===""){
      //console.log("cannot")
    }
    else{
      this.setState({
        email:"",
        status:""
      },() => {
        this.getTableData()
      });
    }
    
};

onFilter = () => {
    const { email, status} = this.state;
    if (email==="" && status===""){
      //console.log("cannot")
    }
    else{
      this.getTableData();
    }
};

  onChangeEditSwitch = () => {
    this.setState({
        isEditStatus: this.state.isEditStatus? false: true,
        editStatus: this.state.isEditStatus? "I": "A"
    }, ()=>{
      //console.log(this.state.isStatus)
      //console.log(this.state.editStatus)

    })
    
  };

  editAdmin = (record) => {
    //console.log(record)
    let status = true;
    let role = true;
    if(record.status==="A"){
        status=true;
    }
    else{
        status=false;
    }

    if(record.owner===1){
        role=true;
    }
    else{
        role=false;
    }

    this.setState({
      editModal:true,
      editID:record.id,
      editAvatar:record.avatar,
      editEmail:record.email,
      editCreatedAt:record.created_at,
      editCreatedBy:record.created_by,
      editStatus:record.status,
      editLname:record.lname,
      editFname:record.fname,
      editPosition:record.position,
      editContactNumber:record.contact_number,
      isEditStatus:status,
      isEditRole:role,
      editRole:record.owner
    });
  }

  onEditAdmin = () => {
    const {editID,editFname,
      editLname,
      editPosition,
      editContactNumber} = this.state;
    if (editID === 0 || editFname ==="" || editLname ==="" || editPosition ===""
    || editContactNumber ===""){
      message.warn("Please Input Value!")
    }else{
      confirm({
            title: 'Are you sure want to edit : ' +(editID)+  ' ?',
            content: '',
            onOk:() => {
              this.setState({
                loading: true,
              }, ()=>{
                this.onFinalEditAdmin();
              })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }
  };

  onFinalEditAdmin = async () => {
    const {editID, editStatus,editFname,
      editLname,
      editPosition,
      editContactNumber,
    communities_id, editEmail, editRole} = this.state;
    
    const data = {
        id: editID,
        status:editStatus,
        fname: editFname,
        lname: editLname,
        position: editPosition,
        contact_number: editContactNumber,
        role:editRole,
    }

    try{ 
        const ret = await editAdmin(data)
        if(ret.status === 200){
            
            //console.log(ret);
            if(editStatus ==="A"){
              //console.log(communities_id,editEmail);//
              const usersRef = collection(db, "users");
              // create query object
              const q = query(usersRef);
              // execute query
              onSnapshot(q, (querySnapshot) => {
                
                querySnapshot.forEach((doc1) => {
                  if(communities_id === doc1.data().communities_id && editEmail === doc1.data().email){
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
                  if(communities_id === doc1.data().communities_id && editEmail === doc1.data().email){
                    this.setState({
                    },async()=>{
                      await updateDoc(doc(db, "users", doc1.data().uid), {
                        active: false,
                      });
                    })
                  }
                });            
               return 
              });
            }
            message.success("Admin Edited Successfully!");
            this.onCloseEditModal();
            this.getTableData();
            
        }else{
            message.error(ret.data.msg);
            this.setState({
            data: [],
            })
            this.onCloseEditModal();
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

  onCloseEditModal = () => {
    this.setState({
      editLoading: false,
      editModal: false,
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
          title: "Owner",
          dataIndex: 'owner',
          key: 'owner',
          sorter: (a, b) => a.owner - b.owner,
          sortOrder: sortedInfo.columnKey === 'owner' && sortedInfo.order,
          render: (text, record, index) => {
            let color = "";
            let txt = "";
            switch(record.owner){
              case 1:
              color = 'green'
              txt = 'Super Admin'
              break;
              case 0:
                color = 'default'
                txt = 'Admin'
                break;
              default:
                color = 'default'
                txt = record.owner
                break;
               }
               return(
                 <span key={`sts${record.owner}${index}`}>
                   <Tag color={color}>{txt}</Tag>
                 </span>       
             )
          }
        }
        ,
        {
          title: "Position",
          dataIndex: 'position',
          key: 'position',
          sorter: (a, b) => a.position - b.position,
          sortOrder: sortedInfo.columnKey === 'position' && sortedInfo.order,
          render: (text, record, index) => (
              <span key={`position${record.position}${index}`}>
                  {record.position}
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
          title: t('Action'),             
          key: 'action',
          render: (text, record, index) => (
            <Space size="middle">
          <Tooltip placement="left" title="Edit">
            <Button onClick={()=>this.editAdmin(record)} shape="circle" icon={<EditOutlined />} style={{visibility: this.state.role===0 ? "hidden" : "visible"}}/>
          </Tooltip>          
          </Space>  
           
          )
        },
    ];
    return (
      <>
        <Row>
          <Col span={12}>
            <h1>Admin List</h1>
          </Col>
          <Col span={12} className="right-item">
            <Button type="primary" onClick={this.addAdmin} style={{visibility: this.state.role===0 ? "hidden" : "visible"}}>Add Admin</Button>
          </Col>
        </Row>
        <br />

        <Row>
            <Col span={24}>
            <Collapse defaultActiveKey={['0']} onChange={this.callback}>
                <Panel header="Choose to Filter : " key="1">
                <Row align="middle">
                    <Col xs={6} sm={5} md={4} lg={3} xl={3}>
                        <b>Email : </b>
                    </Col>
                    <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                        <Input value={this.state.email} maxLength={50} onChange={(e)=>this.onChangeText(e, 'email')}/>
                    </Col>
                </Row>
                <br/>
                <Row align="middle">
                    <Col xs={6} sm={5} md={4} lg={3} xl={3}>
                        <b>Status : </b>
                    </Col>
                    <Col xs={17} sm={14} md={11} lg={8} xl={6} className="left-item">
                        <Select value={this.state.status} onChange={(e)=>this.onChange(e, 'status')} style={{ width: '100%' }}>
                        <Option value={""}>Please Select Status</Option>
                        <Option value={"A"}>Active</Option>
                        <Option value={"I"}>Inactive</Option>
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
        <AddAdminModal
          visible={this.state.addModal}
          onClose={this.onCloseAddModal}

          loadingModal={this.state.addLoading}
          addEmail={this.state.addEmail}
          addPassword={this.state.addPassword}
          addConfirmPassword={this.state.addConfirmPassword}
          addFname={this.state.addFname}
          addLname={this.state.addLname}
          addPosition={this.state.addPosition}
          addContactNumber={this.state.addContactNumber}
          isAddRole={this.state.isAddRole}
          onChangeSwitch={this.onChangeAddRoleSwitch}
          onChangeText={this.onChangeText}
          proceed={this.onAddAdmin}
        />
        <EditAdminModal
            visible={this.state.editModal}
            onClose={this.onCloseEditModal}

            loadingModal={this.state.editLoading}
            editID={this.state.editID}
            editAvatar={this.state.editAvatar}
            editEmail={this.state.editEmail}
            editCreatedAt={this.state.editCreatedAt}
            editCreatedBy={this.state.editCreatedBy}
            editStatus={this.state.editStatus}
            isEditStatus={this.state.isEditStatus}
            editRole={this.state.editRole}
            isEditRole={this.state.isEditRole}
            editFname={this.state.editFname}
            editLname={this.state.editLname}
            editPosition={this.state.editPosition}
            editContactNumber={this.state.editContactNumber}

            onChangeText={this.onChangeText}
            onChangeSwitch={this.onChangeEditSwitch}
            onChangeRoleSwitch={this.onChangeEditRoleSwitch}
            proceed={this.onEditAdmin}
        />
        </>
    )
  }
}

export default withTranslation('common')(AdminList);