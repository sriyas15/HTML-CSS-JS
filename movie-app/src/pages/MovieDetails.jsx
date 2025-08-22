 import { useParams, useLocation } from 'react-router-dom';
 import BackUp from "/public/assets/roll.jpg";

const MovieDetails = () => {

  const { id } = useParams(); // comes from /movie/:id
  const location = useLocation();
  const { movie, image } = location.state

  return (
    <main>
      

    <div className="relative w-full h-screen">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${image})` }}
          ></div>

          <div className="relative z-10 p-4 text-white">
            <div className="grid md:grid-cols-2 items-center gap-8 max-w-5xl max-md:max-w-md mx-auto">
      
            <div className="md:h-[450px]">
              <img
                src={image}
                className="w-auto h-full rounded-lg shadow-xl"
                alt={movie.original_title}
              />
            </div>

            <div className="max-md:order-1 max-md:text-center">
              <h2 className="md:text-4xl text-3xl md:leading-10 font-bold text-slate-900 mb-4">
                {movie.original_title}
              </h2>
              <h4 className="mt-4 text-black font-bold text-bold-500 leading-relaxed">
                {movie.overview}
              </h4>

            <div className="mt-12 flex flex-wrap max-md:justify-center gap-4">
              <button className="px-6 py-3 text-base font-semibold text-white bg-[#101828] rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#f032e6] focus:outline-none focus:ring-opacity-50">
                Watch Movie
              </button>
              <button className="px-6 py-3 text-base font-semibold text-black border border-[#101828] rounded-full hover:text-white hover:bg-[#101828] transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-[#f032e6] focus:outline-none focus:ring-opacity-50">
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>



    </main>
  )
}


export default MovieDetails