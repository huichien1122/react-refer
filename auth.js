import { 
  // instance,
   instance2 } from "./base";

export const login = (email, password) => instance2.post("/api/v1/admin/login", 
{
  "email": email,
  "password": password
},
).then((response) => {
  return response
}).catch((error) => {
  return error
});


export const registerAdminValidateEmail = (email) => instance2.post("/api/v1/admin/register/validate/email", 
{
  "email": email
},
).then((response) => {
  return response
}).catch((error) => {
  return error
});


export const signUp = (email, password, lname, fname, contact_number, position,
  propertyType, propertyName, developer, totalUnits, country, region, city,
  postcode, plan, number, name, expiry, cvc) => instance2.post("/api/v1/admin/register", 
{
  "email":email, 
  "password":password,
  "lname":lname,
  "fname":fname,
  "contact_number":contact_number,
  "position":position,
    "property_type": propertyType,
    "property_name": propertyName,
    "developer": developer,
    "total_units": totalUnits,
    "country": country,
    "state": region,
    "postcode": postcode,
    "city": city,
    "plan": plan,
    "number":number,
    "holder": name,
    "expiry": expiry,
    "cvc": cvc
},
).then((response) => {
  return response
}).catch((error) => {
  return error
});