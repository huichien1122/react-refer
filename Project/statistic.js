import { instance } from '../base';

//GetStatisticList
export const GetStatisticList = (data) => instance.post("/api/v1/admin/statistic/get", 
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