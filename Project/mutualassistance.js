import { instance } from '../base';

//get MutualAssistance list
export const getMutualAssistanceList = (data) => instance.post("/api/v1/admin/mutual/assistance/get", 
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

//inactive MutualAssistance
export const inactiveMutualAssistance = (data) => instance.post("/api/v1/admin/mutual/assistance/cancel", 
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