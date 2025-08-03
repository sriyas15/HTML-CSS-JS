

class Ui{
    constructor(){
        this.profile=document.querySelector("#div-tag");
        this.div=document.querySelector("#alert-div");
    }

    alertDiv(msg,alert){
        
            let newDiv = document.createElement("div");
            newDiv.className=`alert alert-${alert}`;
            newDiv.innerHTML=`${msg}`;
            this.div.appendChild(newDiv);
        
        setTimeout(()=>{
            newDiv.remove();
        },3000)
    }

    getProfile(user){

        if(user.status==="404"){
            this.alertDiv("There is no user in that name","danger");
        }
        else{

            this.profile.innerHTML=`
                    
                    <div class="row mt-5 mb-5">

                        <div class="col-md-3 mt-3 text-center">
                        <img width="100%" src=${user.avatar_url} alt="">
                        <a class="btn btn-outline-success mt-2" href=${user.html_url} target="_blank">Go to Profile</a>
                    
                    </div>
                    <div class="col-md-9">
                        <span class="badge bg-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge bg-warning">Followers: ${user.followers}</span>
                        <span class="badge bg-success">Following: ${user.following}</span>
                        <hr>
                        <hr>
                        <ul class="list-group">

                            <li class="list-group-item">Name: ${user.login}</li>
                            <li class="list-group-item">Bio: ${user.bio}</li>
                            <li class="list-group-item">E-mail: ${user.email}</li>
                            <li class="list-group-item">Location: ${user.location}</li>
                            <li class="list-group-item">Blog: ${user.blog}</li>
                            

                        </ul>
                    </div>

                    </div>

        `

        }
        
    }
}