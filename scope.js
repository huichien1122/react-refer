import { instance } from "./base";

export const checkScope = (scopes) => instance.post("/api/v1/emp/role/scope/check", 
{
  "project_code": sessionStorage.getItem("prj"),
  "scopes": scopes,
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
