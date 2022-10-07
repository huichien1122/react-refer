import { instance } from '../base';

//get Announcement(admin)
export const getAnnouncementList = (data) => instance.post("/api/v1/admin/announcement/get", 
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


//add Announcement(admin)
export const addAnnouncement = (data) => instance.post("/api/v1/admin/announcement/add", 
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

//Update Announcement
export const editAnnouncement = (data) => instance.post("/api/v1/admin/announcement/upd", 
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