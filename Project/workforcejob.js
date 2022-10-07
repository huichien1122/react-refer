import { instance } from '../base';

//get workforce job list
export const getWorkforceJobList = (data) => instance.post("/api/v1/admin/workforce/job/get", 
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

//inactive workforce job 
export const inactiveWorkforceJob = (data) => instance.post("/api/v1/admin/workforce/job/cancel", 
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