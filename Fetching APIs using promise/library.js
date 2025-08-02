//"https://jsonplaceholder.typicode.com/users"

// i am going to send you two codes first one is library another one is fetching data using that library

// just explain me why? i dont need code answer


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













    // post(url,data){

    //     return new Promise(function(resolve,reject){

    //         fetch(url,{
    //             method: "POST",
    //             header: {
    //                 "Content-type" : "application/json"
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         .then(response=>response.json())

    //         .then(data=>resolve(data))

    //         .catch(e=>reject(e))
    //     })

    // }

 
