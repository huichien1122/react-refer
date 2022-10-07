import { instance, instance2 } from "./base";

export const login = (email, password) => instance2.post("/api/v1/admin/login", 
{
  "email": email,
  "password": password,
  // "lang_code": lang_code,
},
).then((response) => {
  return response
}).catch((error) => {
  return error
});

export const tokenCheck = () => instance2.post("/api/v1/admin/token/check", 
{},
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


export const logout = () =>
  instance
    .post(
      "/api/v1/admin/logout",
      {
        //
      },
      {
        headers: {
          Authorization: sessionStorage.getItem("accessToken"),
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  
export const getLanguage = () =>
instance2
  .post("/api/v1/admin/language/list", {}, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error;
  });

export const getServerTime = () =>
instance2
  .post("/api/v1/admin/gettime", {}, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error;
  });


export const postRefreshToken = () =>
instance2
  .post("/api/v1/admin/token/refresh", 
  {
    "refresh_token": sessionStorage.getItem("refreshToken"),
    "accessType": 1,
  }
  , {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    return response;
  })
  .catch((error) => {
    return error;
  });