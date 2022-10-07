/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideMenuBar from './SideMenuBar'
import {
  LogoutOutlined,
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import { Affix, Col, Layout, Row, 
  Menu, 
  Dropdown, message
 } from 'antd';
import Auth from '../App/Auth';
import ReactCountryFlag from "react-country-flag";
import moment from 'moment';
import MenuDrawer from './MenuDrawer';
import { withTranslation } from "react-i18next";
// import { getLanguage, getServerTime } from '../Controller/login';
import { setUserToken } from '../../redux/actions/scopeAction';
import setRoute from '../../redux/actions/routeAction';
import { GetProfile } from "../Controller/Project/memprofile";
import { getCommunities } from "../Controller/Project/communities";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
const { Header, Content, Sider,Footer } = Layout;

// const rootSubmenuKeys = ["license", "asset", "report"];
// const singleMenuKeys = ["/admin/dashboard"];

let pTitle = [];

class LoggedInLayout extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
      openKeys: [],
      title: "",
      curSelectKey: "",

      drawer: false,

      curLang: props.i18n.language,
      lang: [],

      nowTime: moment(),

      nowTimeStr: "",
      time24Format: true,

      rootSubmenuKeys: ["sub_7", "sub_10"],
      singleMenuKeys: ["/admin/dashobard", "/admin/single"],

      email:"",
      fname:"",
      lname:"",
      role:"",
      owner:0,
      communitiesId:0,
      avatar:"",
      imageUrl:"",
      community:""

    }
  }
  componentDidMount() {
    // this.getLang();
    this.setState({
      lang:[
        {locale: "en", name: "English"},
        {locale: "zh-CN", name: "简体中文"},
      ]
    })

    let pathName = window.location.pathname;
    this.setState({
      title: pTitle[pathName],
      curSelectKey: pathName,
    })

    this.getProfile();
    this.getCommunities();

  }

  getCommunities = async() => {
    const data = {
      id: this.state.communitiesId,
    }
    try{
      const ret = await getCommunities(data);
      //console.log(ret)
      if(ret.data.statusCode === 200){
        this.setState({
          imageUrl: ret.data.data.logo,
        })
    }            
    else{
      message.error(ret.data.msg);
    }       
    console.log(ret)
    console.log(this.state.imageUrl)
  }catch(e){
    message.error("Change Communities error");
    console.log(e);
  }
  };

  getProfile = async() => {
    try{
      const ret = await GetProfile();
      //console.log(ret.data)
      if(ret.data.statusCode === 200){
        this.setState({
          email: ret.data.data.email,
          fname: ret.data.data.fname,
          lname:ret.data.data.lname,
          role:ret.data.data.role,
          owner:ret.data.data.owner,
          communitiesId: ret.data.data.communities_id,
          community: ret.data.data.communities_name,
          avatar: ret.data.data.avatar,

        },()=>{
          //console.log(this.state.companyId, this.state.company, this.state.name)
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

  setUserToken = (token) => {
    const { dispatch } = this.props;
    dispatch(setUserToken(token))
  }

  changeFormat = () => {
    // this.setState({
    //   time24Format: !this.state.time24Format,
    // })
  }

  // getLang = async() => {
  //   try{
  //     const ret = await getLanguage();
  //     if(ret.status === 200){
  //       this.setState({
  //         lang: ret.data.data,
  //       })
  //     }
  //   }catch(e){
  //     console.log(e)
  //   }
  // }

  startTime = () => {
    this.timeInterval = setInterval(()=>{
      this.setState({
        nowTime: this.state.nowTime.add(1, 'second')
      }, ()=>{
        this.setState({
          nowTimeStr: this.state.nowTime.format("DD MMMM YYYY HH:mm")
        })
        // console.log(this.state.nowTime.format("YYYY/MM/DD HH:mm:ss"))
      })
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.timeInterval)
  }


  componentDidUpdate(a, b){
    let pathName = a.history.location.pathname;
    this.setState({
      title: pTitle[pathName],
      curSelectKey: pathName,
    })
    // console.log(a.history.location.pathname)
    // console.log(a.history.action);
  }
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  onOpenChange = keys => {
    const latestOpenKey = keys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.props.menu.submenu_key.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys: keys,
      })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  };

  goToPage = (r) => {
    //set title here
    // console.log(r, rName);
    if(this.props.menu.menu_key.includes(r)){
     this.setState({
       openKeys: [],
     }) 
    }
    this.setState({
      drawer: false,
      title: pTitle[r],
      curSelectKey: r,
    })
    
    this.props.history.push({
      pathname: r,
        state: {curTab: 'statistic'} // your data array of objects
    })
  }

  goToProfilePage = (r) => {
    //set title here
    // console.log(r, rName);
    if(this.props.menu.menu_key.includes(r)){
     this.setState({
       openKeys: [],
     }) 
    }
    this.setState({
      drawer: false,
      title: pTitle[r],
      curSelectKey: r,
    })
    
    this.props.history.push({
      pathname: r,
        state: {curTab: 'profile'} // your data array of objects
    })
  }

  logout = async() => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    this.setUserToken("");
    Auth.signOut();
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    this.props.history.push("/")
  }

  openDrawer = () => {
    // console.log('s')
    this.setState({
      drawer: true,
      collapsed: false,
    })
  }

  closeDrawer = () => {
    this.setState({
      drawer: false,
    })
  }

  onChangeLanguage = (l) => {
    this.setState({
      curLang: l,
    })
    const { i18n } = this.props;
    i18n.changeLanguage(l);
    localStorage.setItem("lang", l)
    // console.log(this.props.i18n.language, this.state.curLang);
    // console.log(l)
  }


  setRoute = (list) => {
    const { dispatch } = this.props;
    dispatch(setRoute(list))
  }

  render() {
    const { children, t } = this.props;
    const { lang, curLang,
      // nowTime, time24Format
    } = this.state;

    let curLangField;
    let langoption = [];
    lang.forEach((e,i)=>{
      let cCode = "";
      switch(e.locale){
        case "en":
          cCode = "US"
          break;
        case "zh-CN":
          cCode = "CN"
          break;
        default:
          cCode = "US"
          break;
      }

      if(e.locale === curLang){
        curLangField = <><ReactCountryFlag countryCode={cCode} svg/>&nbsp;{e.name}&nbsp;<DownOutlined /></>
      } else {
        langoption.push(
          <Menu.Item key={`lll${i}`} onClick={()=>this.onChangeLanguage(e.locale)}>
            <ReactCountryFlag countryCode={cCode} svg/> {e.name}
          </Menu.Item>
        )
      }
      
    })

    const dropdownmenu = (
      <Menu>
        {langoption}
      </Menu>
    )

    const { imageUrl,community } = this.state;

    return (
      <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider 
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          className="side__menu-root"
          >
          {/* <SideMenuBar openkeys={this.state.openKeys} onOpenChange={(e) => this.onOpenChange(e)} /> */}
          <SideMenuBar
            goToPage={this.goToPage}
            logout={this.logout}
            onCollapse={this.onCollapse}
            collapsed={this.state.collapsed}
            openKeys={this.state.openKeys}
            onOpenChange={(e) => this.onOpenChange(e)}
            curSelectKey={this.state.curSelectKey}
            menus={this.props.menu}
            imageUrl={imageUrl}
            community={community}
          />
        </Sider>
        <Layout>
        <Affix style={{ zIndex: 11 }}>
          <Header className="header__root" style={{ padding: 0 }}>
          <Row align="middle">
              <Col xs={3} sm={3} md={3} lg={2} xl={2} className="left-item">
                &nbsp;&nbsp;&nbsp;
                <span className="fold__icon" onClick={()=>this.setState({
                  collapsed: !this.state.collapsed
                })}>{!this.state.collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}</span>
                <span className="burger__icon">
                  <BarsOutlined style={{ cursor: 'pointer'}} onClick={()=>this.openDrawer()} />
                </span>
              </Col>

              <Col xs={0} sm={0} md={0} lg={9} xl={12} className="left-item">
                <span className="header__breadcum">
                  <b onClick={()=>this.goToProfilePage('/m/dashboard')}>{t('header.welcome')} </b>
             </span>
              </Col>
              <Col xs={0} sm={0} md={0} lg={3} xl={3} className="right-item">
                <Dropdown overlay={dropdownmenu} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      {curLangField}
                    </a>
                </Dropdown>&nbsp;&nbsp;&nbsp;&nbsp;
                
                </Col>
                <Col xs={20} sm={20} md={20} lg={10} xl={7} className="right-item">
                  <img className="avatar" src={this.state.avatar} alt="Avatar" onClick={()=>this.goToProfilePage('/m/dashboard')}/>
                  <span className="h__username" onClick={()=>this.goToProfilePage('/m/dashboard')}>{this.state.email}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <LogoutOutlined onClick={this.logout}/>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </Col>
            </Row>
          </Header>
        </Affix>
          <Content className={`${this.props.theme.className} ly_content__root`}>
              {children}
          </Content>
          <Footer className ="footer" >
                  <span>&copy; 2022 Dream Community Administration APP. <small>All rights reserved</small></span>
          </Footer>
        </Layout>
      </Layout>
      <MenuDrawer
        visible={this.state.drawer}
        onClose={this.closeDrawer}

        goToPage={this.goToPage}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        curSelectKey={this.state.curSelectKey}
        menus={this.props.menu}
        imageUrl={imageUrl}
        community={community}
        logout={this.logout}
      />
      </>
   );
  }
}
function mapStateToProps(state) {
  return {
    theme: state.theme,
    header: state.header,
    menu: state.menu,
  };
}

export default withRouter(connect(mapStateToProps)(withTranslation('common')(LoggedInLayout)));
