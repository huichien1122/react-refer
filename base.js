import dotenv from 'dotenv';
import axios from 'axios';
import history from '../App/history';
import Auth from '../App/Auth';
import { setUserToken } from '../../redux/actions/scopeAction';
import store from '../App/store';

dotenv.config();

const setTheUserToken = (token) => {
  const { dispatch } = store;
  dispatch(setUserToken(token))
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 59000,
  headers: {'Accept-Language': "en"}
});

//WITHOUT REFRESH TOKEN FUNCTION
const instance2 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 59000,
  headers: {'Accept-Language': "en"}
  // headers: {'Authorization': sessionStorage.getItem("accessToken")}
});

// export const refreshtoken = () => instance.post("/api/v1/token/refresh", {
//   "refresh_token": sessionStorage.getItem("refreshToken"),
// }).then((response) => {
//   return response.data
// }).catch((error) => {
//   return error.response
// });

instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

instance2.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


instance.interceptors.response.use((response) => {
  return response
}, 
function (error) {
  // console.log(error);
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;
      return instance.post('/api/v1/admin/token/refresh',
          {
            "refresh_token": sessionStorage.getItem("refreshToken"),
          })
          .then(res => {
            // console.log(res)
              if (res.status === 200) {
                let newRequest = originalRequest;
                // console.log(res.data.data.access_token)
                  // 1) put token to LocalStorage
                  sessionStorage.setItem("accessToken", res.data.data.access_token);
                  sessionStorage.setItem("refreshToken", res.data.data.refresh_token);

                  setTheUserToken(res.data.data.access_token)
                  // localStorageService.setToken(res.data);
                  // console.log(originalRequest, res.data.data.access_token)
                  // 2) Change Authorization header
                  // instance.defaults.headers['Authorization'] = res.data.data.access_token;
                  // original
                  newRequest.headers.Authorization = res.data.data.access_token;
                  // 3) return originalRequest object with Axios.
                  return instance(newRequest);
              } else {
                setTheUserToken("")
                Auth.signOut();
                history.push("/")
                return res
              }
          })
  } else {
    return error.response
  }
})
instance2.interceptors.response.use((response) => {
  return response
}, 
function (error) {
  return error.response
})

export {
  instance,
  instance2,
}