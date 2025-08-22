import { Route,Routes } from 'react-router-dom'
import {MovieDetails,MovieList,PageNotFound,SearchMovie} from '../pages'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<MovieList apiPath={'movie/now_playing'}/>}/>

        <Route path="movie/:id" element={<MovieDetails />} />

        <Route path='movie/popular' element={<MovieList apiPath={'movie/popular'}/>}/>

        <Route path='movie/top_rated' element={<MovieList apiPath={'movie/top_rated'}/>}/>

        <Route path='movie/upcoming' element={<MovieList apiPath={'movie/upcoming'}/>}/>

        <Route path='search' element={<SearchMovie apiPath={''}/>}/>

        <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  )
}

export default AllRoutes