//"https://jsonplaceholder.typicode.com/users"

class EasyFetch{

    get(url){

        return new Promise(function(resolve,reject){

        fetch(url)
        .then(response=> response.json())
        .then(data=>resolve(data))
        .catch(error=>reject(error));

        })

    }

    post(url,data){

        return new Promise(function(resolve,reject){

            fetch(url,{
                method: "POST",
                headers:{
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(data)
            })

            .then(response=>response.json())
            .then(data=>resolve(data))
            .catch(error=>reject(error));
        })
    }

    put(url,data){

        return new Promise(function(resolve,reject){

            fetch(url,{
                method : "PUT",
                headers:{
                    "Content-type":"application/json",
                },
                body : JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(data=>resolve(data))
            .catch(error=>reject(error));
        })
    }


    delete(url,data){

        return new Promise(function(resolve,reject){

            fetch(url)
            .then(response=>response.json())
            .then(data=>resolve("Data is Deleted"))
            .catch(error=>reject(error));
        })
    }

}
