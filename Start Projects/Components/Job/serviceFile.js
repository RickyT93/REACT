import axios from "axios";



// var endpoint = "https://api.remotebootcamp.dev/api/jobs/"

  var endpoint = "https://localhost:50001/api/jobs/"


//***********************************************
//************   ADD JOB    *********************
//***********************************************

let addJob = (payload) => {
    console.log("addJob is executing", payload);
  
    const config = {
      method: "POST", 
      url: endpoint,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" } }; 
   
      return axios(config).then((response) => {
        console.log(response.data.item, payload);
        return ({id:response.data.item,...payload})
       })
}
export { addJob };

//***********************************************
//************ UPDATE BY ID *********************
//***********************************************
let update = (id, payload) => 
{
  console.log("get update is executing");

  const config = {
    method: "PUT", 
    url:`${endpoint}${id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" } };
    return axios(config).then((response) => {
     console.log(response);
     return ({id:response.data.item,...payload})
    })
}
export { update };

//***********************************************
//************ GET ALL JOBS *********************
//***********************************************

let getAll = (pageIndex, pageSize) =>
{
  console.log("getAll is executing");
  const config = {
    method: "GET",
    url: `${endpoint}paginate/?pageIndex=${pageIndex}&&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  
  return axios(config).then((response) => {
    console.log( response );
     return (response);
   })
} 
export { getAll };
    
    
//***********************************************
//************ GET JOB WITH SEARCH QUERY ********
//***********************************************

let getJobByQuery = (pageIndex, pageSize, query) =>
{   
  console.log("getJobByQuery is executing");
  const config = {
    method: "GET",
    url: `${endpoint}search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  
  return axios(config).then((response) => {
    console.log(response.data.item.pagedItems);
    return (response.data.item.pagedItems)
   })
}

export { getJobByQuery };

//***********************************************
//************ DELETE BY ID *********************
//***********************************************

let deleteById  = (id) => 
 {
   console.log("delete is executing", id)
  
   const config = {
     method: "DELETE",
     url:`${endpoint}${id}`,
     crossdomain: true,
     headers: { "Content-Type": "application/json" } 
   }
 
   return axios(config).then((id) => {
    return id 
   })
}
export { deleteById };



//**********************************************
//************  GET JOB ID *********************
//**********************************************

let getById  = (id) => 
{
  console.log("getById is executing");

  const config = {
    method: "GET", 
    url: `${endpoint}${id}`,   
    crossdomain: true,
    headers: { "Content-Type": "application/json" } };
  
     return axios(config).then((response) => {
     console.log(response.data.item);
     return (response.data.item)
    })
}
export { getById };
