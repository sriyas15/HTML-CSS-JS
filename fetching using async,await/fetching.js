
const http = new EasyFetch();

async function getting(){

  try{

    const response = await http.get("https://jsonplaceholder.typicode.com/users");

    const data = console.log(response);
  }

  catch(e){
    console.log(e);
  }



}

getting();



const datas = {
  name : "Mohamed Riyas",
  username : "sriyas15",
  email : "sriyas1508@gmail.com"
};


async function posting(){

  try{
    const response = await http.post("https://jsonplaceholder.typicode.com/users",datas);

    console.log(response);
  }
  catch(e){
    throw(e);
  }

}

posting();



async function putting(){

  try{
    const response = await http.put("https://jsonplaceholder.typicode.com/users/5",datas);

    console.log(response);
  }
  catch(e){
    throw(e);
  }

}

putting();




async function deleting(){

  try{
    const response = await http.delete("https://jsonplaceholder.typicode.com/users/5",datas);

    console.log(response);
  }
  catch(e){
    throw(e);
  }

}

deleting();