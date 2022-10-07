import React, { Component} from 'react';
import {Col,Row, message, Card, Button, Modal} from 'antd';
import { getCommunities, UpdCommunities, UpdCommunities2, UpdCardPayment } from '../Controller/Project/communities';
import EditCommunitiesProfile from './EditCommunitiesProfile';
import EditPaymentModal from './EditPaymentModal';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { GetProfile } from '../Controller/Project/memprofile';

const { confirm } = Modal;
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must smaller than 5MB!');
      return
    }
    return isJpgOrPng && isLt2M;
  }
  
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class CommunitiesProfile extends Component{
    constructor(){
        super();
        this.state ={
            id: 0,
            code: "",
            name: "",
            logo: "",
            city: "",
            postcode: 0,
            state: "",
            country: "",
            developer: "",
            property_type: "",
            total_units: 0,
            contact_number: "",
            description: "",
            plan:"",
            cardNumber:"",
            cardHolder:"",
            cvc:"",
            expiry:"",
            status: "",
            created_by: "",
            created_at: "",
            planDescription:"",
            role:0,

            editLoading: false,
            viewModal: false,
            eName: "",
            eLogo: "",
            eCity: "",
            ePostcode: 0,
            eState: "",
            eCountry: "",
            eDeveloper: "",
            eProperty_type: "",
            eTotal_units: 0,
            eContact_number: "",
            eDescription: "",
            profilePicture:[],

            editLoading2: false,
            viewModal2: false,
            ePlan:"",
            eCardNumber:"",
            eCardHolder:"",
            eCvc:"",
            eExpiry:"",
            eTestCvc:"",
            eTestExpiry:"",
        }
    }

    componentDidMount(){
        this.getProfile();
        this.getAdminProfile();
    }

    getAdminProfile = async() => {
      try{
        const ret = await GetProfile();
        //console.log(ret.data)
        if(ret.data.statusCode === 200){
          this.setState({
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

    getProfile = async() => {
        try{
          const ret = await getCommunities();
          if(ret.data.statusCode === 200){
            let txt = "";
            switch(ret.data.data.plan){
              case "small":
                txt = 'Small (RM 89.99 per month)'
                break;
              case "medium":
                txt = 'Medium (RM 169.99 per month)'
                break;
              case "large":
                txt = 'Large (RM 259.99 per month)'
                break;
              default:
                txt = 'Super (RM 339.99 per month)'
                break;
            }
            this.setState({
                id: ret.data.data.id,
                code: ret.data.data.code,
                name: ret.data.data.name,
                logo: ret.data.data.logo,
                city: ret.data.data.city,
                postcode: ret.data.data.postcode,
                state: ret.data.data.state,
                country: ret.data.data.country,
                developer: ret.data.data.developer,
                property_type: ret.data.data.property_type,
                total_units: ret.data.data.total_units,
                contact_number: ret.data.data.contact_number,
                description: ret.data.data.description,
                plan:ret.data.data.plan,
                cardNumber:ret.data.data.number,
                cardHolder:ret.data.data.holder,
                cvc:ret.data.data.cvc,
                expiry:ret.data.data.expiry,
                status: ret.data.data.status,
                created_by: ret.data.data.created_by,
                created_at: ret.data.data.created_at,
                planDescription:txt,
            }
            );
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

    onChangeText = (e, key) => {
        this.setState({
          [key]: e.target.value,
        })
    };

    changeCommunityProfileModal=()=>{
        this.setState({
          viewModal:true,
          editLoading:false,
          eName: this.state.name,
          eLogo: this.state.logo,
          eCity: this.state.city,
          ePostcode: this.state.postcode,
          eState: this.state.state,
          eCountry: this.state.country,
          eDeveloper: this.state.developer,
          eProperty_type: this.state.property_type,
          eTotal_units: this.state.total_units,
          eContact_number: this.state.contact_number,
          eDescription: this.state.description,
        })
    };

    onCloseViewModal = () => {
        this.setState({
            editLoading: false,
            viewModal: false,
            eName: "",
            eLogo: "",
            eCity: "",
            ePostcode: 0,
            eState: "",
            eCountry: "",
            eDeveloper: "",
            eProperty_type: "",
            eTotal_units: 0,
            eContact_number: "",
            eDescription: "",
        },()=>{
            this.getProfile();
          })
    };

    selectCountry = (val) => {
        this.setState({ eCountry: val });
    };

    selectRegion = (val) => {
        this.setState({ eState: val });
    };

    onChangePropertyTypeSelection= (e) => {
        this.setState({
          eProperty_type: e,
        })
    };

    onChangeNumber= (e, key) => {
      this.setState({
        [key]: e,
      })
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ editLoading: true });
          return;
        }else{
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              profilePicture:info.file.originFileObj,
              editLoading: false,
              eLogo:imageUrl
            },()=>{
              //console.log(this.state.profilePicture)
            })
          );
        }
    };

    onEditCommunitiesModal= () => {
        const {
            eName,
            eCity,
            ePostcode,
            eState,
            eCountry,
            eDeveloper,
            eProperty_type,
            eTotal_units,
            eContact_number,
            eDescription,
          profilePicture} = this.state;
    
    
        if(eName === "" || eCity === "" || ePostcode === 0 || eState === ""
        || eCountry === "" || eDeveloper === "" || eProperty_type === ""
        || eTotal_units === 0 || eContact_number === "" || eDescription === ""){
          message.warn("Please Input value");
        }else if(profilePicture.length===0){
            confirm({
              title: 'Are you sure you want to edit communities profile?',
              content: '',
              onOk:() => {
                this.setState({
                  editLoading: true,
                }, ()=>{
                  this.onFinalEditCommunitiesProfileModal();
              })
              },
              onCancel() {
                console.log('Cancel');
              },
            });
        }
        else {
          confirm({
            title: 'Are you sure you want to edit communities profile?',
            content: '',
            onOk:() => {
              this.setState({
                editLoading: true,
              }, ()=>{
                this.onFinalEditCommunitiesProfileModal2();
            })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }
    };

    onFinalEditCommunitiesProfileModal2 = async() => {
        const { eName,
            eCity,
            ePostcode,
            eState,
            eCountry,
            eDeveloper,
            eProperty_type,
            eTotal_units,
            eContact_number,
            eDescription,
          profilePicture} = this.state;
    
        const data = new FormData();
        data.append('name', eName);
        data.append('city', eCity);
        data.append('postcode', ePostcode);
        data.append('state', eState);
        data.append('country', eCountry);
        data.append('developer', eDeveloper);
        data.append('property_type', eProperty_type);
        data.append('total_units', eTotal_units);
        data.append('contact_number', eContact_number);
        data.append('description', eDescription);
        data.append('logo', profilePicture);
    
        try{
          const ret = await UpdCommunities2(data)
          if(ret.status === 200){
            message.success("Community Updated Successfully!");
            //console.log(ret);
            window.location.reload();
            this.onCloseViewModal();
          } else {
            this.setState({
              editLoading: false,
            })
            message.error(ret.data.msg);
          }
        }catch(e){
        }
    };

    onFinalEditCommunitiesProfileModal = async() => {
        const { eName,
            eCity,
            ePostcode,
            eState,
            eCountry,
            eDeveloper,
            eProperty_type,
            eTotal_units,
            eContact_number,
            eDescription} = this.state;
    
        const data = {
            property_name:eName,
            city:eCity,
            postcode:ePostcode,
            state:eState,
            country:eCountry,
            developer:eDeveloper,
            property_type:eProperty_type,
            total_units:eTotal_units,
            contact_number:eContact_number,
            description:eDescription, 
        }
    
        try{
          console.log(data)
          const ret = await UpdCommunities(data)
          if(ret.status === 200){
            message.success("Community Updated Successfully!");
            window.location.reload();
            this.onCloseViewModal();
            } 
            else {
            this.setState({
              editLoading: false,
            })
            message.error(ret.data.msg);
          }
        }catch(e){
        }
    };

    changePaymentModal=()=>{
      this.setState({
        viewModal2:true,
        editLoading2:false,
        ePlan:this.state.plan,
        eCardNumber:this.state.cardNumber,
        eCardHolder:this.state.cardHolder,
        eCvc:this.state.cvc,
        eExpiry:this.state.expiry,
      })
    };

    onCloseEditPaymentModal = () => {
      this.setState({
          editLoading2: false,
          viewModal2: false,
          ePlan:"",
          eCardNumber:"",
          eCardHolder:"",
          eCvc:"",
          eExpiry:"",
          eTestCvc:"",
          eTestExpiry:"",
          cvc:"",
          expiry:"",
      },()=>{
          this.getProfile();
        })
    };


    onChangeCardExpiry = (date, dateString) => {
      this.setState({ 
        eExpiry: dateString,      
      },()=>{
        //console.log(this.state.eExpiry);
      })
    };

    onChangeTestCardExpiry = (date, dateString) => {
      this.setState({ 
        eTestExpiry: dateString,      
      },()=>{
        //console.log(this.state.eExpiry);
      })
    };

    onEditCardPaymentModal= () => {
      const {
        eTestCvc,
        eTestExpiry,
        ePlan,
        eCardNumber,
        eCardHolder,
        eCvc,
        eExpiry} = this.state;
  
  
      if(eTestCvc ==="" || eTestExpiry ==="" || ePlan === "" || eCardNumber === "" || eCardHolder === "" || eCvc === ""
      || eExpiry === ""){
        message.warn("Please Input value");
      }
      else if (eCardNumber.length !== 16){
        //console.log(eCardNumber)
        message.warning("Make sure card number MUST be 16.");
      }
      else if (eCvc.length !== 3){
        message.warning("Make sure CVC of card number MUST be 3.");
      }
      else {
        confirm({
          title: 'Are you sure you want to edit card payment and plan?',
          content: '',
          onOk:() => {
            this.setState({
              editLoading2: true,
            }, ()=>{
              this.onFinalEditCardPayment();
          })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    };

    onFinalEditCardPayment = async() => {
      const {ePlan,
        eCardNumber,
        eCardHolder,
        eCvc,
        eExpiry} = this.state;
  
      const data = {
          plan:ePlan,
          number:eCardNumber,
          holder:eCardHolder,
          expiry:eExpiry,
          cvc:eCvc
      }
  
      try{
        const ret = await UpdCardPayment(data)
        if(ret.status === 200){
          message.success("Card Payment and Plan Details Updated Successfully!");
          this.onCloseEditPaymentModal();
          } 
          else {
          this.setState({
            editLoading2: false,
          })
          message.error(ret.data.msg);
        }
      }catch(e){
      }
    };

    render() {
        return(

        <>
        <Row align="middle">
            <Col span={10}>
            <h1>Communities Profile</h1>
            </Col>
        </Row>
        <br/>
        <Card className="center-item profile__card" bordered={false} >
        <Row align="middle">
            <Col xs={12} sm={10} md={8} lg={8} xl={6} className="center">
            <img  src={this.state.logo} alt="Avatar" className="p__community" height={180} width={180}/>
            </Col>
            <Col xs={12} sm={14} md={16} lg={16} xl={18} className="left-item">
            <h2><b> {this.state.name}</b> </h2>
             <span><b>Property Type : </b></span>
             <span>{this.state.property_type}</span>
             <br/><br/>
             <span><b>Created At : </b></span>
             <span>{this.state.created_at}</span>
            </Col>
        </Row>
        </Card>
        <br/>
        <Row align="middle">
            <Col xs={12} sm={10} md={8} lg={8} xl={6}>
            <h2><b>Description</b> </h2>
            <span>{this.state.description}</span>
            </Col>
        </Row>
        <br/> <br/>
        <h2><b>Details</b></h2>
        <Row gutter={[ 15, 15]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Card className="left-item profile__card" bordered={false}>
        <h2><b><u>Community Profile</u></b></h2>
        <br/>
            <Row align="middle">
                <Col xs={12} sm={10} md={8} lg={8} xl={6}>
                <span><b>City :</b></span>
                </Col>
                <Col xs={12} sm={14} md={16} lg={16} xl={18} className="left-item">
                <span>{this.state.city}</span>
                </Col>
            </Row>
            <br/>
            <Row align="middle">
                <Col xs={12} sm={10} md={8} lg={8} xl={6}>
                <span><b>Postcode :</b></span>
                </Col>
                <Col xs={12} sm={14} md={16} lg={16} xl={18} className="left-item">
                <span>{this.state.postcode}</span>
                </Col>
            </Row>
            <br/>
            <Row align="middle">
            <Col xs={12} sm={10} md={8} lg={8} xl={6}>
                <span><b>State :</b></span>
                </Col>
                <Col xs={12} sm={14} md={16} lg={16} xl={18} className="left-item">
                <span>{this.state.state}</span>    
            </Col>

            </Row>
            <br/>
            <Row align="middle">
            <Col xs={12} sm={10} md={8} lg={8} xl={6}>
                <span><b>Country: </b></span>
                </Col>
                <Col xs={12} sm={14} md={16} lg={16} xl={18} className="left-item">
                <span> {this.state.country}</span>
                </Col>
            </Row>
            <br/>
            <Row align="middle">
            <Col xs={12} sm={10} md={8} lg={8} xl={6}>
                <span><b>Developer: </b></span>
                </Col>
                <Col xs={12} sm={14} md={16} lg={16} xl={18} className="left-item">
                <span> {this.state.developer}</span>
                </Col>
            </Row>
            <br/>
            <Row align="middle">
            <Col xs={12} sm={10} md={8} lg={8} xl={6}>
                <span><b>Total Units: </b></span>
                </Col>
                <Col xs={12} sm={14} md={16} lg={16} xl={18} className="left-item">
                <span> {this.state.total_units}</span>
                </Col>
            </Row>
            <br/>
            <Row align="middle">
            <Col xs={12} sm={10} md={8} lg={8} xl={6}>
            <span><b>Contact Number :</b></span>
            </Col>
            <Col xs={12} sm={14} md={16} lg={16} xl={18} className="left-item">
            <span>{this.state.contact_number}</span>
            </Col>
            </Row>
            <br/>
            <br/>
            <Row align="middle">
            <Col span={24}>
                <Button onClick={this.changeCommunityProfileModal} type="primary" style={{visibility: this.state.role===0 ? "hidden" : "visible"}}>Edit Community Profile</Button>
            </Col>
            </Row>
            <br/>
        </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Card className="left-item profile__card" bordered={false}>
        <h2><b><u>Card Payment Details</u></b></h2>
        <br/>
          <Row align="middle">
          <Col xs={12} sm={10} md={8} lg={8} xl={6}>
            <span><b>Your Card: </b></span>
          </Col>
          <Col xs={12} sm={14} md={16} lg={16} xl={18}>
            <Cards
              cvc=""
              expiry=""
              focused=""
              name={this.state.cardHolder}
              number={(this.state.cardNumber).slice(0, 4)}
            />
          </Col>
          </Row>
          <br/>
          <br/>
            <Row align="middle">
            <Col xs={12} sm={10} md={8} lg={8} xl={6}>
                <span><b>Selected Plan: </b></span>
                </Col>
                <Col xs={12} sm={14} md={16} lg={16} xl={18} className="left-item">
                <span> {this.state.planDescription}</span>
                </Col>
            </Row>
            <br/>
            <br/>
            <Row align="middle">
            <Col xs={12} sm={10} md={8} lg={8} xl={6}>
                <span><b>Provided Plan: </b></span>
                </Col>
                <Col xs={12} sm={14} md={16} lg={16} xl={18} className="left-item">
                <p>---------------------------------------------------------------------------</p>
                <p>FREE trial for three months</p>
                <p>Access to ALL on-demand community services</p>
                <p>Autocharge ONLY after free trial ends</p>
                <p>-----------------------------Provided Plans-----------------------------</p>
                <p>Small Plan (max 5 admins, 500 users)</p>
                <p>Medium Plan (max 10 admins, 1000 users)</p>
                <p>Large Plan (max 20admins, 2000 users)</p>
                <p>Super Plan (unlimited)</p>
                <p>---------------------------------------------------------------------------</p>
                </Col>
            </Row>
            <br/>
            <br/>
            <Row align="middle">
            <Col span={24}>
                <Button onClick={this.changePaymentModal} type="primary" style={{visibility: this.state.role===0 ? "hidden" : "visible"}}>Edit Plan/ Card Details</Button>
            </Col>
            </Row>
            <br/>
        </Card>
        </Col>
        </Row>
        <br/>
         
        <EditCommunitiesProfile
            loadingModal={this.state.editLoading}
            visible={this.state.viewModal}
                
            eId={this.state.eId}
            eName={this.state.eName}
            eLogo={this.state.eLogo}
            eCity={this.state.eCity}
            ePostcode={this.state.ePostcode}
            eState={this.state.eState}
            eCountry={this.state.eCountry}
            eDeveloper={this.state.eDeveloper}
            eProperty_type={this.state.eProperty_type}
            eTotal_units={this.state.eTotal_units}
            eContact_number={this.state.eContact_number}
            eDescription={this.state.eDescription}
            ePlan={this.state.ePlan}
            eCardNumber={this.state.eCardNumber}
            eCardHolder={this.state.eCardHolder}
                    
            onChangePropertyTypeSelection={this.onChangePropertyTypeSelection}
            selectCountry={this.selectCountry}
            selectRegion={this.selectRegion}
            onClose={this.onCloseViewModal}
            onChangeText={this.onChangeText}
            onChangeNumber={this.onChangeNumber}
            beforeUpload={beforeUpload}
            handleChange={this.handleChange}
            proceed={this.onEditCommunitiesModal}
            width={600}
            centered
        />


        <EditPaymentModal
            loadingModal={this.state.editLoading2}
            visible={this.state.viewModal2}
                
            ePlan={this.state.ePlan}
            eCardNumber={this.state.eCardNumber}
            eCardHolder={this.state.eCardHolder}
            eCvc={this.state.eCvc}
            eExpiry={this.state.eExpiry}
            eTestCvc={this.state.eTestCvc}
            eTestExpiry={this.state.eTestExpiry}
            cvc={this.state.cvc}
            expiry={this.state.expiry}
                    
            onClose={this.onCloseEditPaymentModal}
            onChangeText={this.onChangeText}
            onChangeNumber={this.onChangeNumber}
            onChangeCardExpiry={this.onChangeCardExpiry}
            onChangeTestCardExpiry={this.onChangeTestCardExpiry}
            proceed={this.onEditCardPaymentModal}
            width={600}
            centered
        />
        
        </>

        
        
        )
    }
}

export default CommunitiesProfile;