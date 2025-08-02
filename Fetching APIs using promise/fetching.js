const http = new EasyFetch();


http.get("https://jsonplaceholder.typicode.com/users")
  .then(data=>console.log(data))
  .catch(error=>console.log(error));



const datas = {
  name : "Mohamed Riyas",
  username : "sriyas15",
  email : "sriyas1508@gmail.com"
};

http.post("https://jsonplaceholder.typicode.com/users",datas)
  .then(data=>console.log(data))
  .catch(error=>console.log(error));



http.put("https://jsonplaceholder.typicode.com/users/5",datas)
 .then(data=>console.log(data))
 .catch(error=>console.log(error));


http.delete("https://jsonplaceholder.typicode.com/users/5",datas)
 .then(data=>console.log(data))
.catch(error=>console.log(error));