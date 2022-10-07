import React, { Component, Fragment} from 'react';
// import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import Router from './Router';
import LoadingPage from './LoadingPage';
import dotenv from 'dotenv';

import { Provider } from 'react-redux'
import store from './store'
import { config as i18nextConfig } from '../../translations';

import { BackTop, message, 
  // message
 } from 'antd';
import 'antd/dist/antd.css';
import '../../scss/app.scss';
import "react-sortable-tree/style.css";

import Auth from './Auth';

// import InternetChecking from './InternetChecking';
import SessionChecking from './SessionChecking';
import { tokenCheck } from '../Controller/login';
import { setUserToken } from '../../redux/actions/scopeAction'

message.config({
  maxCount: 2,
});

dotenv.config();

let i_lang = localStorage.getItem("lang");
if(i_lang !== null){
  //set default lang
  let newConfig = i18nextConfig;
  newConfig.lng = i_lang;
  i18next.init(newConfig);
} else {
  i18next.init(i18nextConfig);
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      isDoneCheck: false,
    }
  }

  async UNSAFE_componentWillMount(){
    // console.log("DO REFRESH");
    let a = sessionStorage.getItem("accessToken")
    let r = sessionStorage.getItem("refreshToken")
    // console.log(a,r, "HEHEEHE");
    if(a === null || r === null){
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      this.setState({
        isDoneCheck: true,
      })
    } else {
     await this.checkAdmin();
    }
    // console.log("DO HEHE");
    // Auth.authentiate();
  }
  checkAdmin = async() => {
    // console.log('here?')
    try{
      const ret = await tokenCheck();
      // console.log(ret);
      if(ret.status === 200){
        Auth.authentiate();
        this.setUserToken(sessionStorage.getItem("accessToken"))
        this.setState({
          isDoneCheck: true,
        })
      } else {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        // this.props.history.push("/login");
        message.warn("Session Expired");
        this.setState({
          isDoneCheck: true,
        })
      }
    } catch(e){
      console.log(e, "MIDDLEWARE ERROR");
      alert("System Error")
    }
    // sessionStorage.removeItem("accessToken");
    // sessionStorage.removeItem("refreshToken");
    // this.props.history.push("/login");
    // message.warn("Please Login First");
  }

  setUserToken = (token) => {
    const { dispatch } = store;
    dispatch(setUserToken(token))
  }
  
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <Fragment>
            <BackTop />
            {/* <InternetChecking /> */}
            <SessionChecking />
            {this.state.isDoneCheck ?  <Router /> : <LoadingPage />}
          </Fragment>
          </I18nextProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

// export default hot(module)(App);
export default App;
