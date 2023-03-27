import axios from "axios";



 let getAll = () => {
    console.log("getAll is executing" );
  
    const config = {
      method: "GET", 
      url: "https://my-json-server.typicode.com/selvaicodes/cars/cars",
      crossdomain: true,
      headers: { "Content-Type": "application/json" } }; 
   
   return axios(config).then((response) => {
    console.log(response);
    return (response)
   })
}
//export { getAll };
const carService = { getAll }
export default carService;
