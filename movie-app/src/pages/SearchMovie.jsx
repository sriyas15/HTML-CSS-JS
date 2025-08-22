import { useContext } from "react"
import { DarkModeContext } from "../context/DarkModeContext"
import Card from "../components/Card"
import useFetch from "../hook/useFetch"
import { useSearchParams } from "react-router-dom"


const SearchMovie = ({apiPath}) => {

  const {darkMode} = useContext(DarkModeContext);
  console.log(apiPath);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('q');

  const {data:movies} = useFetch(apiPath,query);

  return (
    <main>

      <section >

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

export default SearchMovie