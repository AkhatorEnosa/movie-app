import { useEffect, useState } from "react";
import { useParams } from "react-router"

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const Movie = () => {
  const { movieId } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [movie, setMovie] = useState({})

  const fetchMovie = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = `${API_BASE_URL}/movie/${movieId}`

      const res = await fetch(endpoint, API_OPTIONS)

      if(!res.ok){
        throw new Error(res.status)
      }

      const data = await res.json()

      if(data.Response === 'false') {
        setErrorMessage(data.Error || "Error fetching movies")
        return;
      }

      if(data) {
        setMovie(data)
      }
      // console.log(movie.genres)

    } catch (error) {
      console.log(error)
      setErrorMessage(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [isLoading])

  if(isLoading) {
    return (
      <div className="wrapper text-white">
        <p>Loading ...</p>
      </div>
    )
  }

  return (
    <div className="wrapper text-white">
      <div className="flex flex-col gap-4">
        <h2>Sonic</h2>
        <div className="flex gap-2 font-thin">
          <p className="year">2024</p>

          <span>•</span>
          <p className="runtime">2h 3min</p>
        </div>

        <div className="poster">
          <img className="hidden lg:flex " src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`  : '/no-movie.png'} alt="" />
          <div className="relative flex-col gap-20 w-full h-full col-span-4 lg:col-span-3 rounded-lg overflow-clip">
            <img className="w-full lg:absolute" src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`  : '/no-movie.png'} alt="" />
          </div>
        </div>

        <table className="border-separate border-spacing-4">
          <tr>
            <td className="h-full flex items-start text-lg text-gray-100">Genre</td>
            <td className="f;extext-[16px]">
              <div className="w-full flex gap-2">
                {movie.genres?.length > 0 && movie.genres.map((genre) => (
                  <p key={genre.id} className="bg-white/40 rounded-full flex gap-2 font-thin px-2 py-[1px] text-xs md:px-4 md:py-2 backdrop-blur-lg">{genre.name}</p>
                ))}
              </div>
            </td>
          </tr>
          <tr>
            <td className="h-full flex items-start text-lg text-gray-100">Overview</td>
            <td className="text-[16px]">{movie.overview}</td>
          </tr>
          <tr>
            <td className="h-full flex items-start text-lg text-gray-100">Release Date</td>
            <td className="text-[16px] font-semibold">December, 20th</td>
          </tr>
          <tr>
            <td className="h-full flex items-start text-lg text-gray-100">Countries</td>
            <td className="text-[16px] font-semibold">Map countries</td>
          </tr>
          <tr>
            <td className="h-full flex items-start text-lg text-gray-100">Language</td>
            <td className="text-[16px] font-semibold">Map languages</td>
          </tr>
          <tr>
            <td className="h-full flex items-start text-lg text-gray-100">Budget</td>
            <td className="text-[16px] font-semibold">$14million </td>
          </tr>
          <tr>
            <td className="h-full flex items-start text-lg text-gray-100">Revenue</td>
            <td className="text-[16px] font-semibold">$900 million</td>
          </tr>
          <tr>
            <td className="h-full flex items-start text-lg text-gray-100">Production Company</td>
            <td className="text-[16px] font-semibold">
              {movie.production_companies?.length > 0 && movie.production_companies.map((company, index) => (
                <>
                  <span key={company.id}>{company.name}</span>
                  {index < movie.production_companies[movie.production_companies.length - 1] && <span>   •  </span>}
                </>
              ))}
            </td>
          </tr>
          <tr>
            <td className="h-full flex items-start text-lg text-gray-100">Status</td>
            <td className="text-[16px] font-semibold">Released</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Movie
            {/* <div className="bg-white/40 hover:bg-white/60 rounded-full absolute flex gap-2 font-thin px-4 py-2 bottom-3 left-3 cursor-pointer backdrop-blur-lg transition-all duration-150">
              <img src="/play.png" alt="Play Trailer" className=""/>
              <p>Trailer</p>
            </div> */}