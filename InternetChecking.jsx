import React, { Component } from 'react';
import {
  notification
} from 'antd';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import setUserInternetSpeed from '../../redux/actions/internetSpeedAction';

class InternetChecking extends Component{
  constructor(){
    super();
    this.state = {
      startTime: (new Date()).getTime(),

      isSupportBrowser: false,
    }
  }
  componentDidMount(){
    this.checkInternet();

    window.addEventListener('online', () => {
      console.log('came online');
      notification.destroy();
    });
    window.addEventListener('offline', () => {
      const args = {
        message: `Failed to connect`,
        description:
          `You are offline! Please check your internet connection.`,
        duration: 0,
      };
      setTimeout(()=>{
        notification.warning(args);
      },800)
      console.log('came offline');
    });
  }

  componentWillUnmount(){
    // clearInterval(this.checkIntInterval)
  }
  checkInternet = () => {
    if(typeof navigator.connection === "undefined"){
      //no 
      this.setState({
        isSupportBrowser: false,
      }, () => {
        this.checkLoadImg();
      })
    } else {

      this.setState({
        isSupportBrowser: true,
      }, () => {
        this.checkLoadImg();
      })
      // console.log(`${navigator.connection.downlink} Mbps`);
      // console.log(`${navigator.connection.effectiveType} Network`);
      // console.log(`${navigator.connection.rtt} ms`);
  
      navigator.connection.addEventListener('change', this.logNetworkInfo);
    }
  }

  setUserInternetSpeed = (speed) => {
    const { dispatch } = this.props;
    dispatch(setUserInternetSpeed(speed))
  }

checkLoadImg = () => {
  var img = "https://media.bayment.org/medias/WCT/KYC/225a4e54fe8ee2518a51b679181e0dc4.jpg";
  var cacheBuster = "?nnn=" + this.state.startTime;

  var endTime;
  var download = new Image();
  download.src = img + cacheBuster;

  download.onload = () => {
    endTime = (new Date()).getTime();
    this.showResult(endTime);
  }
}

showResult = (endTime) => {
  let startTime = this.state.startTime;
  var downloadSize = 4900000

  var duration = (endTime - startTime) / 1000;
  var bitsLoaded = downloadSize * 8;
  var speedBps = (bitsLoaded / duration).toFixed(2);
  var speedKbps = (speedBps / 1024).toFixed(2);
  var speedMbps = (speedKbps / 1024).toFixed(2);

  this.setUserInternetSpeed(speedMbps)

  if(speedMbps < 3 && !this.state.isSupportBrowser){
    const args = {
      message: <b>{this.props.t('internet.be_patience')}</b>,
      description:
        <span>{this.props.t('internet.low_internet_desc')} 3G {this.props.t('internet.low_internet_desc2')} <br />
        {this.props.t('internet.low_internet_desc3')}</span>
        ,
      duration: 10,
    };
    setTimeout(()=>{
      notification.warning(args);
    },2000)
  }

  // console.log(speedMbps);
  
  // console.log(duration, "ssssssssssssssss")
}

  logNetworkInfo = () => {
    let x = navigator.connection.effectiveType.replace('g','');
    // Effective bandwidth estimate
    // console.log(navigator.connection.downlink, navigator.connection.rtt, navigator.connection.effectiveType)

    if(navigator.connection.downlink < 3 && parseInt(x) < 4){
      const args = {
        message: <b>{this.props.t('internet.be_patience')}</b>,
        description:
          <span>{this.props.t('internet.low_internet_desc')} {navigator.connection.effectiveType.toUpperCase()} {this.props.t('internet.low_internet_desc2')} <br />
          {this.props.t('internet.low_internet_desc3')}</span>
          ,
        duration: 10,
      };
      setTimeout(()=>{
        notification.warning(args);
      },2000)
    }
  }

  render() {
    return (
      <>
      </>
    )
  }
}

function mapStateToProps(state){
  return {
    speed: state.speed
  }
}

export default connect(mapStateToProps)(withTranslation('common')(InternetChecking));