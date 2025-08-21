import { useEffect, useState } from "react"
import Card from "../components/Card"
import useFetch from "../hook/useFetch"

const MovieList = ({apiPath}) => {


const {data:movies} = useFetch(apiPath);

  return (
    <main>
      <section>

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