import { instance } from '../base';

//get meeting reservation list
export const getMeetingReservationList = (data) => instance.post("/api/v1/emp/meeting/reservation/get/all", 
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

//Add meeting reservation 
export const addMeetingReservation = (data) => instance.post("/api/v1/emp/meeting/reservation/add", 
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

export const withdrawMeetingReservation = (data) => instance.post("/api/v1/emp/meeting/reservation/withdraw", 
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
