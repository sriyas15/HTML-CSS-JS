import { useEffect, useState } from "react"

const useFetch = (apiPath,query = '') => {

    const [data,setData] = useState([]);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzQwNGVhYjI3ODExNGMwN2NmNTVhODFkZDE0NWUwYyIsIm5iZiI6MTc1NTY3MjA4OC4wOTMsInN1YiI6IjY4YTU2ZTE4OTc0NDA1MDE1OWQ1NGE2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Nmjh8iG_xFFdWvgLi-QhDkwgQfvG1pg9BN8lZoRt68'
  }
};

useEffect(()=>{

    async function getMovies(){

      const request = await fetch(`https://api.themoviedb.org/3/${apiPath}?query=${query}&include_adult=false&language=en-US&page=1`,options);
      console.log(apiPath);
      const data = await request.json();

      setData(data.results);
      
    }
    getMovies();
  },[apiPath])

  return {
    data
  }
}

export default useFetch