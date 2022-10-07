import { instance } from '../base';

//get workforce service list
export const getWorkforceServiceList = (data) => instance.post("/api/v1/admin/workforce/service/get", 
{
  "role_prj_code": sessionStorage.getItem("prj"),
  ...data
},
{
  headers: {
    'Authorization': sessionStorage.getItem("accessToken"),
  }
}
).then((response) => {
  return response
}).catch((error) => {
  return error
});

//inactive workforce service 
export const inactiveWorkforceService = (data) => instance.post("/api/v1/admin/workforce/service/cancel", 
{
  "role_prj_code": sessionStorage.getItem("prj"),
  ...data
},
{
  headers: {
    'Authorization': sessionStorage.getItem("accessToken"),
  }
}
).then((response) => {
  return response
}).catch((error) => {
  return error
});

//inactive workforce service request
export const inactiveWorkforceServiceRequest = (data) => instance.post("/api/v1/admin/workforce/service/request/cancel", 
{
  "role_prj_code": sessionStorage.getItem("prj"),
  ...data
},
{
  headers: {
    'Authorization': sessionStorage.getItem("accessToken"),
  }
}
).then((response) => {
  return response
}).catch((error) => {
  return error
});