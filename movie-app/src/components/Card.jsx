import { Link } from "react-router-dom";
import BackUp from "/public/assets/roll.jpg";

const Card = ({movie}) => {

    const image = movie.poster_path ?`https://image.tmdb.org/t/p/w500/${movie.poster_path}` : BackUp;

  return (
    
    <Link to={`/movie/${movie.id}`} state={{ movie, image }}>
    
    <div className="mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <img src={image} alt="Bird" />  
        <div className="p-5">
            
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{`${movie.original_title}`}</h5>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-4">{`${movie.overview}`}</p>
        </div>
    </div>
    
    </Link>
  )
}

export default Card