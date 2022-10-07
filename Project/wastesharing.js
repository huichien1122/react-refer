import { instance } from '../base';

//get Waste Sharing list
export const getWasteSharingList = (data) => instance.post("/api/v1/admin/waste/sharing/get", 
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

//inactive Waste Sharing 
export const inactiveWasteSharing = (data) => instance.post("/api/v1/admin/waste/sharing/cancel", 
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