// client_id = "Ov23liZW4Hk9llIyOs2I"
// secret_id = "2735fe5ba1ef076e92a73ccad5701ec57502076f"

class GitFinder{

    constructor(){
        this.client_id= "Ov23liZW4Hk9llIyOs2I";
        this.secret_id= "2735fe5ba1ef076e92a73ccad5701ec57502076f";
    }

    async getUser(user){

        const fetching = await fetch(`https://api.github.com/users/${user}`);

        const data = fetching.json();

        return data;
    }
}