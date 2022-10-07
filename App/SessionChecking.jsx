import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwt_decode from "jwt-decode";
import moment from 'moment';
import Countdown from 'react-countdown';
import { message } from 'antd';
import SessionModal from './SessionModal';
import { postRefreshToken, getServerTime } from '../Controller/login';
import { setUserToken } from '../../redux/actions/scopeAction';

class SessionChecking extends Component{
  constructor(){
    super();
    this.state = {
      timer: 240000,
      isValid: false,

      sessionModal: false,

      nowTime: moment(Date.now()),
      nowTimeInt: 1814671657721,
    }
  }


  componentDidMount(){
    this.getServerTime();
    // this.getDecodeToken();
  }

  getServerTime = async() => {
    try{ 
      const ret = await getServerTime()
      this.setState({
        nowTime: moment(ret.data.data),
        nowTimeInt: parseInt(moment(ret.data.data).format("x"))
      }, () => {
        var test = this.getDecodeToken();
        if(!test.valid){
          this.setState({
            timer: 0
          })
        }
      })
      // console.log(ret);
    }catch(e){
      //
    }
  }
  
  
  UNSAFE_componentWillReceiveProps(nextP){
    if(nextP.scope !== this.props.scope){
      this.getServerTime();
    }
  }

  getDecodeToken = () => {
    try{
      var token = sessionStorage.getItem("accessToken");
      var decoded = jwt_decode(token);
      var accessExp = decoded.exp;
      // var nowTime = moment().format('X')
      // console.log(accessExp)
      // console.log(this.state.nowTimeInt)
      var diff = (accessExp  * 1000) - this.state.nowTimeInt

      this.setState({
        timer: diff,
        isValid: true,
      })

      return {valid: true, tokenDiff: diff, decoded: decoded};
    }catch(e){
      return {valid: false, tokenDiff: 0, decoded: ""};
    }
  }

  onChange = (e) => {
    let afkTimer  = 125 //second
    // console.log(e);
    if (this.state.sessionModal !== true && (e.days * 86400 + e.hours * 3600 + e.minutes * 60 + e.seconds) < afkTimer ){
    // if (this.state.visible !== true && (e.minutes * 60 + e.seconds) < 130 ){

        this.setState({
            sessionModal: true,
        });
    }

    if (e.days * 86400 + e.hours * 3600 + e.minutes * 60 + e.seconds <= 1){
    // if (e.minutes * 60 + e.seconds <= 10){
        this.onSessionEnd();
    }
  }

  onSessionEnd = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    message.warn("Session Exipred!", 2);
    setTimeout(function(){
      window.location.href = "/";
  }, 1000);
  }

  refreshToken = async() => {
    //refresh token
    try{
      const ret = await postRefreshToken();
      if (ret.status === 200) {
          sessionStorage.setItem("accessToken", ret.data.data.access_token);
          sessionStorage.setItem("refreshToken", ret.data.data.refresh_token);

          this.setTheUserToken(ret.data.data.access_token)
          //set State Again Mou
          this.setState({
            sessionModal: false,
          })
      } else {
        this.onSessionEnd();
      }
    }catch(e){
      //Failed
      message.warn("Sorry...");
      this.onSessionEnd();
    }
  }


setTheUserToken = (token) => {
  const { dispatch } = this.props;
  dispatch(setUserToken(token))
}


  onFinish = () => {
    console.log("FINISH EXP")
  }
  render() {
    const { timer, isValid, nowTimeInt } = this.state;
    // console.log(nowTimeInt)
    const renderer = ({ hours, minutes, seconds, completed }) => {
      return (
          <span>{hours} Hours| {minutes} Min | {seconds} Sec</span>
      );
  };
    return (
      <>
      <div className="session__timer">
        <h4>Countdown Timer {timer}</h4>
        {isValid ? 
          <Countdown 
          autoStart={true}
          date={nowTimeInt + timer}
          renderer={renderer}
          onTick={this.onChange}
          onFinish={this.onFinish}
          /> : ""}
      </div>
      <SessionModal
        visible={this.state.sessionModal}
        timer={timer}
        leave={this.onSessionEnd}
        continue={this.refreshToken}
        nowTimeInt={nowTimeInt}
      />
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    scope: state.scope
  }
}

export default connect(mapStateToProps)(SessionChecking);