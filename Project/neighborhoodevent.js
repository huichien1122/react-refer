import { instance } from '../base';

//get Neighborhood Event list
export const getNeighborhoodEventList = (data) => instance.post("/api/v1/admin/neighborhood/event/get", 
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

 
export const inactiveNeighborhoodEvent = (data) => instance.post("/api/v1/admin/neighborhood/event/cancel", 
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


export const inactiveNeighborhoodEventRequest = (data) => instance.post("/api/v1/admin/neighborhood/event/request/cancel", 
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


//Admin get Neighborhood Event list
export const adminGetNeighborhoodEventList = (data) => instance.post("/api/v1/admin/neighborhood/event/provider/get", 
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


//Admin get Neighborhood Event History list
export const adminGetNeighborhoodEventHistoryList = (data) => instance.post("/api/v1/admin/neighborhood/event/provider/get/history", 
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

export const adminAddProviderNeighborhoodEvent = (data) => instance.post("/api/v1/admin/neighborhood/event/provider/add",
data, 
{
  headers: {
    'Authorization': sessionStorage.getItem("accessToken"),
    'ContentType': 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
  }
}
).then((response) => {
  return response
}).catch((error) => {
  return error
});

export const adminUpdProviderNeighborhoodEvent = (data) => instance.post("/api/v1/admin/neighborhood/event/provider/upd",
data, 
{
  headers: {
    'Authorization': sessionStorage.getItem("accessToken"),
    'ContentType': 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
  }
}
).then((response) => {
  return response
}).catch((error) => {
  return error
});


export const adminUpdateProviderNeighborhoodEventStatus = (data) => instance.post("/api/v1/admin/neighborhood/event/provider/upd/status", 
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

export const adminUpdateProviderNeighborhoodEventRequestStatus = (data) => instance.post("/api/v1/admin/neighborhood/event/provider/upd/request/status", 
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

