import { instance } from "../base";

//get resident list
export const getResidentList = (data) => instance.post("/api/v1/admin/residents/list/get", 
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


//upd Resident status
export const updResidentStatus = (data) => instance.post("/api/v1/admin/residents/status/upd", 
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


//get home owner and detailed address selection list
export const getHomeOwnerList = (data) => instance.post("/api/v1/admin/residents/homeowner/list/get", 
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

//Get Resident Profile
export const GetResidentProfile = (data) => instance.post("/api/v1/admin/residents/profile/get", 
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