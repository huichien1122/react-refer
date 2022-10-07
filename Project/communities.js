import { instance } from "../base";

//get company
export const getCommunities = (data) => instance.post("/api/v1/admin/communities/get", 
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

export const UpdCommunities = (data) => instance.post("/api/v1/admin/communities/upd", 
data,
{
  headers: {
    'Authorization': sessionStorage.getItem("accessToken"),
    'ContentType': 'multipart/form-data'
  }
}
).then((response) => {
  return response
}).catch((error) => {
  return error
});

export const UpdCommunities2 = (data) =>
  instance
    .post("/api/v1/admin/communities/upd/2", data, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
});


export const UpdCardPayment = (data) => instance.post("/api/v1/admin//communities/upd/cardpayment", 
data,
{
  headers: {
    'Authorization': sessionStorage.getItem("accessToken"),
    'ContentType': 'multipart/form-data'
  }
}
).then((response) => {
  return response
}).catch((error) => {
  return error
});