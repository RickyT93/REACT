import axios from "axios";


var endpoint = "https://api.remotebootcamp.dev/api/users/"


//***********************
//****** GET PING *******
//***********************
let getPing = () => {
  const config = {
    method: "GET",
    url: "https://api.remotebootcamp.dev/api/ping",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { getPing };



//***********************
//****** LOGIN USER *****
//***********************
    
let logIn = (payload) => {

  const config = {
    method: "POST",
    url: `${endpoint}login`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config).then((id) => {
    
      return  (id)
     })
};
export { logIn };


//***********************
//***** REGISTER USER ***
//***********************

let register = (payload) => {

  const config = {
    method: "POST",
    url: `${endpoint}register`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config).then((response) => {
        console.log(response);
        return ({id:response.data.item,...payload})
       })
};

export { register };


 
  // ************************************
  //********* GET CURRENT USER **************
 let getCurrentUser = () => {
    
  const config = {
    method: "GET",
    url: `${endpoint}current`,   
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then((response) => {
    console.log(response);
    return (response)
   })
}

export { getCurrentUser };

 // ************************************
  //*******  GET CURRENT USER BY ID ******
let currentUserById = (id) => 
 {
   console.log("getById is executing");

   const config = {
     method: "GET", 
     url: `${endpoint}${id}`,   
     crossdomain: true,
     headers: { "Content-Type": "application/json" } };
   
      return axios(config).then((response) => {
      console.log(response);
      return (response.data.item)
     })
}
 export { currentUserById };



// ************************************
//********* USER LOGOUT **************

   let userLogOut = () => {
    
    const config = {
      method: "GET",
      url: `${endpoint}logout`,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
  
    return axios(config).then((response) => {
      console.log(response);
      return (response)
     })
}
  export { userLogOut };
