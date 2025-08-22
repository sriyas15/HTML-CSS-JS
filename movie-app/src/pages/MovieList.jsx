import Card from "../components/Card"
import useFetch from "../hook/useFetch"
import {DarkModeContext} from "../context/DarkModeContext";
import { useContext } from "react";

const MovieList = ({apiPath}) => {


const {data:movies} = useFetch(apiPath);

const {darkMode} = useContext(DarkModeContext);

  return (
    <main className={darkMode ? 'header-dark' : 'header-light'}>
      <section className={darkMode ? 'header-dark' : 'header-light'}>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 my-5 p-3">   

            {
              movies.map(movie=>(
                <Card key={movie.id} movie={movie}/>
              ))
            }

        
        </div>
      </section>
    </main>
  )
}

export default MovieList