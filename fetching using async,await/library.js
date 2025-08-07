//"https://jsonplaceholder.typicode.com/users"


class EasyFetch{

   async get(url){
        
        try{
            const response = await fetch(url);

            const data = await response.json();

            return data;
        }
        catch(e){
            throw(e);
        }

    }

   async post(url,data){

    try{

        const response = await fetch(url,{
            method : "POST",
            headers:{
                "Content-type" : "application/json"
            },
            body: JSON.stringify(data)

        });
        const datas = await response.json();
        
        return datas;
    }
    catch(e){
        throw(e);
    }

   }


   async put(url,data){

    try{

        const response = await fetch(url,{
            method : "PUT",
            headers:{
                "Content-type" : "application/json"
            },
            body: JSON.stringify(data)

        });
        const datas = await response.json();
        
        return datas;
    }
    catch(e){
        throw(e);
    }

   }



   async delete(url,data){

    try{

        const response = await fetch(url);
        const datas = await response.json();
        
        return "Data is Deleted"
    }
    catch(e){
        throw(e);
    }

   }

}