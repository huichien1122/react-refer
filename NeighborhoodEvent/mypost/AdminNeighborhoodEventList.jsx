import React, { Component } from 'react';

import { message, Row, Col, Table, Tag, Button,Tooltip,Space, Collapse, Input, Select, Modal } from 'antd';
import{  EyeOutlined, EditOutlined} from '@ant-design/icons';

import { withTranslation } from 'react-i18next';
import { adminAddProviderNeighborhoodEvent, adminGetNeighborhoodEventList, adminUpdProviderNeighborhoodEvent, adminUpdateProviderNeighborhoodEventStatus } from '../../../Controller/Project/neighborhoodevent';
import AddMyNeighborhoodEventModal from './AddMyNeighborhoodEventModal';
import EditMyNeighborhoodEventModal from './EditMyNeighborhoodEventModal';
import ViewMyPostRequestModal from './ViewMyPostRequestModal';
import CancelModal from './ServiceCancelModal';


const { Panel } = Collapse;
const {Option} = Select;
const { confirm } = Modal;

class AdminNeighborhoodEventList extends Component{
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
        code:"",
        requestCode:"",

        addLoading: false,
        addModal: false,
        addAppMedia:[],
        addMediaList:[],
        addTitle: "",
        addDescription: "",
        addCategory:"",
        addPrice:0,
        addAmount:0,
        addDate:"",
        addVenue:"",
        addPaymentMethod:"",
        
        editStatusDescription:"",
        editTitle: "",
        editCode: "",
        editDescription: "",
        editCategory:"",
        editPrice:0,
        editDate:"",
        editVenue:"",
        editPaymentMethod:"",
        editLoading: false,
        editModal: false,
        editID:0,
        editAppMedia:[],
        editMediaList:[],
        editUnchangePhotoList:[],
        editAmount:0,
        editBalance:0,

        vrLoading:false,
        vrModal:false,
        vrRequestList:false,
        vrId:0,
        vrStatus:"",
  
        vrcLoading:false,
        vrcModal:false,
        vrcCancelReason:"",
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
        },()=>{
          if(this.state.addPrice===0){
            this.setState({
              addPaymentMethod:""
          })
          
          }
    
          if(this.state.editPrice===0){
            this.setState({
              editPaymentMethod:""
          })
          
          }
        })
    };

    dateOnChange = (date, dateString) => {
        this.setState({ 
          addDate: dateString,      
        },()=>{
          //console.log(this.state.addTobeDeliveredAt);
        })
    };

    dateOnChange2 = (date, dateString) => {
      this.setState({ 
        editDate: dateString,      
      },()=>{
        //console.log(this.state.editTobeDeliveredAt);
      })
    };

    getTableData = async () => {
        this.setState({
        loadingTable: true,
        })
        const { page, limit, orderBy, orderType, title, status, category, code, requestCode } = this.state;
        const data = {
        page: page,
        limit: limit,
        order_by: orderBy,
        order_type: orderType,
        title:title,
        category:category,
        code:code,
        request_code:requestCode,
        status:status,
        }
        try{ 
        const ret = await adminGetNeighborhoodEventList(data);
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
    const { title, status, category, code,requestCode } = this.state;
    if (title==="" && status==="" && code==="" && requestCode==="" && category===""){
      //console.log("cannot")
    }
    else{
      this.setState({
        status:"",
        title:"",
        category:"",
        code:"",
        requestCode:"",
      },() => {
        this.getTableData()
      });
    }
    
    };

    onFilter = () => {
        const { title, status, category, code, requestCode } = this.state;
        if (title==="" && status==="" && code==="" && requestCode==="" && category===""){
        //console.log("cannot")
        }
        else{
        this.getTableData();
        }
    };

    addNewNeighborhoodEvent= () => {
        this.setState({
          addModal: true,
        })
    };
    
    onCloseAddModal = () => {
        this.setState({
          addLoading: false,
          addModal: false,
          addAppMedia:[],
          addMediaList:[],
          addTitle: "",
          addDescription: "",
          addCategory:"",
          addPrice:0,
          addAmount:0,
          addTobeDeliveredAt:"",
          addPaymentMethod:"",
        },()=>{
            this.getTableData();
            //this.getAssetReserveList();
        })
    };
    
    handleUploadChange = info => {
        let fileList = [...info.fileList];
    
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-5);
    
        // 2. Read from response and show file link
        fileList = fileList.map(file => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url;
          }
          return file;
        });
    
        let fileList2 = fileList.map(file => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url;
          }
          return file.originFileObj;
        });
        
    
        this.setState({ 
          addAppMedia:fileList2,
          addMediaList:fileList 
        },()=>{
          //console.log(this.state.addAppMedia)
          //console.log(this.state.addMediaList)
        });
    };
    
    onAddNeighborhoodEvent= () => {
        const {  addTitle, addCategory, addDescription, addAmount, addDate, addVenue} = this.state;
    
        if(addTitle === "" ||addDescription === "" || addCategory ==="" || 
        addAmount ===0  || addDate ==="" || addVenue===""){
          message.warn("Please Input value");
        }
        else {
          confirm({
            title: 'Are you sure want to add new neighborhood event post?',
            content: '',
            onOk:() => {
              this.setState({
                addLoading: true,
              }, ()=>{
                this.onFinalAddNeighborhoodEvent();
              })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }
    };
    
    onFinalAddNeighborhoodEvent= async() => {
        const {addAppMedia, addTitle, addCategory, addDescription, addPrice, addAmount, addDate, addVenue, addPaymentMethod } = this.state;
    
        const data = new FormData();
        data.append('title', addTitle);
    
        for (let i = 0; i < addAppMedia.length; i++) {
          data.append('pictures', addAppMedia[i])
        }
        //https://www.freecodecamp.org/news/formdata-explained/
    
        //data.append('pictures', addAppMedia);
        data.append('description', addDescription);
        data.append('category', addCategory);
        data.append('price', addPrice);
        data.append('amount', addAmount);
        data.append('payment_method', addPaymentMethod);
        data.append('date', addDate);
        data.append('venue', addVenue);
        //console.log(data.getAll('pictures'))
        
        try{
          //console.log(data)
          const ret = await adminAddProviderNeighborhoodEvent(data);
          if(ret.status === 200){
            message.success("Your Neighborhood Event Post Added Successfully!");
            this.onCloseAddModal();
          } else {
            this.setState({
              addLoading: false,
            })
            message.error(ret.data.msg);
          }
        }catch(e){
          //
        }
    };

    EditMyNeighborhoodEventModal = (data) => {
      let txt = "";
  
      switch(data.status){
        case "P":
          txt = 'Pending Request'
        break;
        case "S":
          txt = 'Close Request, is Full!'
        break;
        default:
          txt = 'Status Undefined'
        break;
      }
  
      var pic = data.photo.split(",");
      //console.log(this.state.editMediaList)
      //console.log(this.state.editAppMedia)
      var t = -1;
        for (let i = 0; i < pic.length; i++) {
  
          const fileList = 
          {
            uid: t.toString(),
            name: data.code +"_"+ i+1 +".png",
            status: 'done',
            url: pic[i],
            thumbUrl: pic[i],
          }
          this.setState({ editMediaList: this.state.editMediaList.push(fileList) });
          this.setState({ editUnchangePhotoList: this.state.editUnchangePhotoList.push(pic[i]) });
          t=t-1;
  
          //console.log(pic[i])
        }
      
  
      this.setState({
        editTitle: data.title,
        editCode: data.code,
        editDescription: data.description,
        editCategory:data.category,
        editPrice:data.price,
        editPaymentMethod:data.payment_method,
        editDate:data.date,
        editVenue:data.venue,
        editStatusDescription:txt,
        editID:data.id,
        editMediaList: this.state.editMediaList,
        editUnchangePhotoList:this.state.editUnchangePhotoList,
        editLoading: false,
        editModal: true,
        editAmount:data.amount,
        editBalance:data.balance,
      },()=>{
        //console.log(this.state.editUnchangePhotoList)
      })
      
    };
  
    
    onCloseEditModal= () => {
      this.setState({
        editLoading: false,
        editModal: false,
        editTitle: "",
        editCode: "",
        editDescription: "",
        editCategory:"",
        editPrice:0,
        editPaymentMethod:"",
        editDate:"",
        editVenue:"",
        editStatusDescription:"",
        editID:0,
        editAppMedia:[],
        editMediaList:[],
        editUnchangePhotoList:[],
        editAmount:0,
        editBalance:0
      },()=>{
        this.getTableData();
      })
    };
  
    handleUploadChange2 = info => {
      let fileList = [...info.fileList];
  
      // 1. Limit the number of uploaded files
      // Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-5);
  
      // 2. Read from response and show file link
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file;
      });
  
      let fileList2 = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
        return file.originFileObj;
      });
  
      let fileList3 = fileList.map(file => {
        if (file.response) {
          // Component will show file.url as link
          file.url = file.response.url;
        }
  
        let result = undefined;
  
        if(file.originFileObj === undefined){
          result = file.url;
        }
  
        //console.log(result);
        return result;
      });
  
      this.setState({ 
        editMediaList:fileList,
        editAppMedia:fileList2.filter(element => {
          return element !== undefined;
        }),
        editUnchangePhotoList:fileList3.filter(element => {
          return element !== undefined;
        })
        , 
      },()=>{
        //console.log(this.state.editAppMedia)
        //console.log(this.state.editMediaList)
        //console.log(this.state.editUnchangePhotoList)
      });
    };
  
    editNeighborhoodEvent= () => {
      const {   editID, editTitle,
        editCode,
        editDescription,
        editCategory,
        editDate, editVenue} = this.state;
  
      if(editID ===0 || editTitle === "" ||editDescription === "" || editCategory ==="" || editDate ==="" || editVenue===""){
        message.warn("Please Input value");
      }
      else {
        confirm({
          title: "Are you sure want to edit "+ editCode+ " neighborhood event post?",
          content: '',
          onOk:() => {
            this.setState({
              editLoading: true,
            }, ()=>{
              this.onFinalEditNeighborhoodEvent();
            })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    };
  
    onFinalEditNeighborhoodEvent= async() => {
      const {editAppMedia, editTitle,
        editID,
        editDescription,
        editCategory,
        editPrice,
        editPaymentMethod,
        editDate, editVenue,
      editUnchangePhotoList } = this.state;
  
      const data = new FormData();
      data.append('id', editID);
      data.append('title', editTitle);
  
      for (let i = 0; i < editAppMedia.length; i++) {
        data.append('pictures', editAppMedia[i])
      }
      //https://www.freecodecamp.org/news/formdata-explained/
  
      //data.append('pictures', addAppMedia);
      data.append('description', editDescription);
      data.append('category', editCategory);
      data.append('price', editPrice);
      data.append('payment_method', editPaymentMethod);
      data.append('date', editDate);
      data.append('venue', editVenue);
      data.append('unchanged_pictures', editUnchangePhotoList);
      //console.log(data.getAll('pictures'))
      
      try{
        //console.log(data)
        const ret = await adminUpdProviderNeighborhoodEvent(data);
        if(ret.status === 200){
          message.success("Your Neighborhood Event Post Edited Successfully!");
          window.location.reload();
          this.onCloseEditModal();
        } else {
          this.setState({
            editLoading: false,
          })
          message.error(ret.data.msg);
        }
      }catch(e){
        //
      }
  };

  ViewMyNeighborhoodEventRequestModal= (record) => {
    this.setState({
        vrRequestList:record.NeighborhoodEventRequestList,
        vrLoading:false,
        vrModal:true,
        vrId:record.NeighborhoodEvent.id,
        vrStatus:record.NeighborhoodEvent.status,
    },()=>{
      //console.log(this.state.vrId);
    })
  };

  onCloseVRModal = () => {
    this.setState({
      vrLoading: false,
      vrModal: false,
      vrRequestList:[],
      vrId:0,
      vrStatus:""
    },()=>{
        this.getTableData();
        //this.getAssetReserveList();
    })
  };

  stopNeighborhoodEvent= () => {
    const {vrId} = this.state;
    if (vrId !== 0){
        
        confirm({
            title: 'Are you sure want to cancel the event : ' +(vrId)+  ' ?',
            content: '',
            onOk:() => {
              this.setState({
                vrLoading: true,
              }, ()=>{
                this.onFinalStop();
              })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }else{
      message.error("Neighborhood Event Not Found!");
    }
  };

  onFinalStop = async () => {
    const {vrId} = this.state;
    
    const data = {
        id: vrId,
        status:"S"
    }

    try{ 
      const ret = await adminUpdateProviderNeighborhoodEventStatus(data);
      if(ret.status === 200){
          message.success("Neighborhood Event Change to Close Request Status Successfully !");
          //console.log(ret);
          this.onCloseVRModal();
          
      }else{
          message.error(ret.data.msg);
          this.onCloseVRModal();
      }

      }catch(e){
      message.error("Edit error");
      console.log(e);
      this.onCloseVRModal();
  }
  };

  endNeighborhoodEvent= () => {
    const {vrId} = this.state;
    if (vrId !== 0){
        
        confirm({
            title: 'Are you sure want to end the event : ' +(vrId)+  ' ?',
            content: '',
            onOk:() => {
              this.setState({
                vrLoading: true,
              }, ()=>{
                this.onFinalEnd();
              })
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }else{
      message.error("Neighborhood Event Not Found!");
    }
  };

  onFinalEnd = async () => {
    const {vrId} = this.state;
    
    const data = {
        id: vrId,
        status:"E"
    }

    try{ 
      const ret = await adminUpdateProviderNeighborhoodEventStatus(data);
      if(ret.status === 200){
          message.success("Neighborhood Event Change to End Request Status Successfully !");
          //console.log(ret);
          this.onCloseVRModal();
          
      }else{
          message.error(ret.data.msg);
          this.onCloseVRModal();
      }

      }catch(e){
      message.error("Edit error");
      console.log(e);
      this.onCloseVRModal();
  }
  };

  cancelNeighborhoodEvent= () => {
    const {vrcCancelReason, vrId} = this.state;
    if (vrId !== 0 && vrcCancelReason!==""){
        
        confirm({
            title: 'Are you sure want to cancel the event : ' +(vrId)+  ' ?',
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
      message.warn("Filled in cancel reason!");
    }
  };

  onFinalCancel = async () => {
    const {vrcCancelReason, vrId} = this.state;
    
    const data = {
        id: vrId,
        status:"C",
        cancel_reason:vrcCancelReason
    }

    try{ 
      const ret = await adminUpdateProviderNeighborhoodEventStatus(data);
      if(ret.status === 200){
          message.success("Neighborhood Event Canceled Successfully !");
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
          title: "Status At",
          dataIndex: 'status_at',
          key: 'status_at',
          sorter: (a, b) => a.status_at - b.status_at,
          sortOrder: sortedInfo.columnKey === 'status_at' && sortedInfo.order,
          render: (text, record, index) => (
              <span key={`status_at${record.NeighborhoodEvent.status_at}${index}`}>
                  {record.NeighborhoodEvent.status_at}
              </span>
          )
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
          title: "Partcipant Amount",
          dataIndex: 'amount',
          key: 'amount',
          sorter: (a, b) => a.amount - b.amount,
          sortOrder: sortedInfo.columnKey === 'amount' && sortedInfo.order,
          render: (text, record, index) => (
              <span key={`amount${record.NeighborhoodEvent.amount}${index}`}>
                  {record.NeighborhoodEvent.amount}
              </span>
          )
        },
        {
          title: "Partcipant Balance",
          dataIndex: 'balance',
          key: 'balance',
          sorter: (a, b) => a.balance - b.balance,
          sortOrder: sortedInfo.columnKey === 'balance' && sortedInfo.order,
          render: (text, record, index) => (
              <span key={`balance${record.NeighborhoodEvent.balance}${index}`}>
                  {record.NeighborhoodEvent.balance}
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
          render: (text, record, index) => {
            return(
            <Space size="middle">
            <Tooltip placement="left" title="Edit">
              <Button onClick={()=>this.EditMyNeighborhoodEventModal(record.NeighborhoodEvent)} shape="circle" icon={<EditOutlined />} />
            </Tooltip> 
            <Tooltip placement="left" title="View">
              <Button onClick={()=>this.ViewMyNeighborhoodEventRequestModal(record)} shape="circle" icon={<EyeOutlined />} />
            </Tooltip>          
            </Space>
            )
          }
        },
    ];

    const props = {
        onChange: this.handleUploadChange,
        multiple: true,
    };
  
    const props2 = {
        onChange: this.handleUploadChange2,
        multiple: true,
    };

    return (
      <>
        <Row>
          <Col span={12}>
            <h1>Neighborhood Event List</h1>
          </Col>
          <Col span={12} className="right-item">
            <Button type="primary" onClick={this.addNewNeighborhoodEvent}>Add New Neighborhood Event</Button>
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
        <AddMyNeighborhoodEventModal
          visible={this.state.addModal}
          onClose={this.onCloseAddModal}
          
          loadingModal={this.state.addLoading}
          addTitle={this.state.addTitle}
          addDescription={this.state.addDescription}
          addCategory={this.state.addCategory}
          addPrice={this.state.addPrice}
          addAmount={this.state.addAmount}
          addPaymentMethod={this.state.addPaymentMethod}
          addMediaList={this.state.addMediaList}
          addVenue={this.state.addVenue}
          
          onChangeText={this.onChangeText}
          onChangeOther={this.onChange}
          dateOnChange={this.dateOnChange}
          props={props}
          proceed={this.onAddNeighborhoodEvent}
        />
        <EditMyNeighborhoodEventModal
              visible={this.state.editModal}
              onClose={this.onCloseEditModal}
              loadingModal={this.state.editLoading}
              editTitle={this.state.editTitle}
              editCode={this.state.editCode}
              editDescription={this.state.editDescription}
              editCategory={this.state.editCategory}
              editPrice={this.state.editPrice}
              editPaymentMethod={this.state.editPaymentMethod}
              editDate={this.state.editDate}
              editVenue={this.state.editVenue}
              editMediaList={this.state.editMediaList}
              editStatusDescription={this.state.editStatusDescription}
              editAmount={this.state.editAmount}
              editBalance={this.state.editBalance}

              onChangeText={this.onChangeText}
              onChangeOther={this.onChange}
              dateOnChange={this.dateOnChange2}
              props2={props2}
              proceed={this.editNeighborhoodEvent}  
        />

        <ViewMyPostRequestModal
          visible={this.state.vrModal}
          onClose={this.onCloseVRModal}
          
          loadingModal={this.state.vrLoading}
          requestList={this.state.vrRequestList}
          onStop={this.stopNeighborhoodEvent}
          onEnd={this.endNeighborhoodEvent}

          onCancel={this.onCancelServiceModal}
          vrStatus={this.state.vrStatus}
        />

        <CancelModal
          visible={this.state.vrcModal}
          onClose={this.CloseCancelModal}
          proceed={this.cancelNeighborhoodEvent}
          loadingModal={this.state.vrcLoading}
          vrcCancelReason={this.state.vrcCancelReason}
          onChangeText={this.onChangeText}
        />
        </>
    )
  }
}

export default withTranslation('common')(AdminNeighborhoodEventList);