import { instance } from '../base';

//Get Profile Details
export const GetProfile = (data) => instance.post("/api/v1/admin/profile/get", 
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

export const changepassword = (data) =>
  instance
    .post("/api/v1/admin/change-password", data, {
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


export const UpdProfile = (data) => instance.post("/api/v1/admin/profile/upd/2", 
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

export const UpdProfile2 = (data) =>
  instance
    .post("/api/v1/admin/profile/upd", data, {
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