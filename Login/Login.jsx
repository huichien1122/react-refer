import React, { Component } from 'react';
import { Col, Row, Input, Button, Spin, message } from 'antd';
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import Auth from '../App/Auth';
import { login } from '../Controller/auth';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { withRouter } from 'react-router-dom';
import { setUserToken } from '../../redux/actions/scopeAction';
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";


class Login extends Component{
  constructor(){
    super();
    this.state = {
      loading: false,
      username:"",
      password:"",
      errtext: "",
      err: false,
      remember: false,
    }
  }

  componentDidMount(){
    // console.log("HEHE REMOVED")
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    // this.getLang();

    let a = localStorage.getItem("usn") === null ? "" : localStorage.getItem("usn")
    if(a !== ""){
      this.setState({
        username: a,
        remember: true,
      })
    }
  }

  componentWillUnmount(){
    clearInterval(this.resetCDInterval)
    clearInterval(this.resendCDInterval)
  }


  setUserToken = (token) => {
    const { dispatch } = this.props;
    dispatch(setUserToken(token))
  }

  onKeyPressCheck = (e) => {
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(e.key === 'Enter'){
      this.onCheckValue()
    }
  } 

  onCheckValue = () => {
    this.setState({
      err: false
    })
    if(this.state.username === "" || this.state.password === ""){
      this.setState({
        err: true,
        errtext: 'all.please_fill_in'
      },()=>{
        message.info('Please Fill in Email Address or Password!');
      })
      return false
    } else {
      //console.log('hehe');
      this.proceedLogin();
      return true
    } 
  }

  onUsernameChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  onPasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  updateRememberMe = () => {
    if(this.state.remember){
      localStorage.setItem("usn", this.state.username)
    } else {
      localStorage.removeItem("usn");
    }
  }

  proceedLogin = async() => {
    this.setState({
      loading: true,
    })
    setTimeout(()=>{
      this.setState({
        loading: false,
      },async()=>{
        this.updateRememberMe();
        try{
          const ret = await login(this.state.username, this.state.password)
          if(ret.status === 200){
            //process login
            sessionStorage.setItem("accessToken", ret.data.data.access_token);
            sessionStorage.setItem("refreshToken", ret.data.data.refresh_token);
            Auth.authentiate()
            const result = await signInWithEmailAndPassword(auth, this.state.username, this.state.password);
            try{
            await updateDoc(doc(db, "users", result.user.uid), {
              isOnline: true,
            });
            }catch(e){
            }
            this.props.history.push({
              pathname: "/m/dashboard",
                state: {curTab: 'statistic'} // your data array of objects
            })
          } else {
            this.setState({
              loading: false,
              errtext: ret.data.msg,
              err: true,
            })
            switch(ret.data.statusCode){
              case 30006:
                message.info('invalid_member_email_or_password');
              break;
              case 30005:
                message.info('active_account_by_verify_email_in_mail_box');
              break;
              default:
                message.error(ret.data.msg);
              break;
            }
            console.log(ret.data.statusCode);
          }
        } catch(e){
          message.error("invalid_member_email_or_password_at_firebase");
          this.setState({
            loading: false,
          })
        }
      })
    }, 1200)
  }

  goToPage = (r) => {
    this.props.history.push(r);
  }

  render() {
    const {
      loading,
      username,
      password, errtext, err
    } = this.state;
    const { t } = this.props;

    return (
      <>
        <Row className="login__bg">
          <Col span={24}>
            <Row>
              <Col
                xs={ { span: 20, offset: 2}}
                sm={ { span: 20, offset: 2}}
                md={ { span: 16, offset: 4}}
                lg={ { span: 10, offset: 7}}
                xl={ { span: 10, offset: 7}}
              >
                <Row className="login__box center-item">
                  <Col span={24}>
                  <h2>Dream Community Administration APP</h2>
                      <img  src={"https://firebasestorage.googleapis.com/v0/b/dreamcommunity.appspot.com/o/adm123_profile_avatar?alt=media"} 
                      alt="App Logo" className="p__community" height={180} width={180}/>
                  </Col>
                </Row>
                <br/>
                <Spin spinning={loading}>
                <Row>
                  <Col span={24} className="center-item">
                    <Input placeholder="username" 
                      type="text" className="login__input" 
                      addonBefore={<UserOutlined />}
                      onKeyPress={this.onKeyPressCheck}
                      onChange={this.onUsernameChange}
                      value={username}
                     />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span={24} className="center-item">
                    <Input.Password 
                      placeholder="password" 
                      type="text"
                      className="login__input pw__input" 
                      addonBefore={<LockOutlined />}
                      onKeyPress={this.onKeyPressCheck}
                      onChange={this.onPasswordChange}
                      value={password} />
                  </Col>
                </Row>
                <br />
                <Row align="middle">
                  <Col span={24} className="right-item signup__guide">
                    <p className="signup_text" onClick={()=>this.goToPage('/signup')}><u>
                      {t('header.sign_up')}
                    </u>
                    </p>
                  </Col>
                </Row>
                <br />
                <small className={`msg ${err ? '' : 'none'}`}>{errtext}</small>
                <br/>
                <Row>
                  <Col span={24} className="center-item">
                    <Button onClick={this.onCheckValue} className="login__btn">LOGIN</Button>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col span={12} className="center-item">
                    <label className="rem_me"><Checkbox/>&nbsp;&nbsp;Remember Me</label>
                  </Col>
                  <Col span={12} className="center-item">
                    <i className="forgot__pw">Forgot Password?</i>
                  </Col>
                </Row>
                </Spin>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    header: state.header,
  };
}
export default withRouter(connect(mapStateToProps)(withTranslation('common')(Login)));