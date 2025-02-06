import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router"
import Navbar from "../components/Navbar";
import BackBtn from "../components/BackBtn";
import Spinner from "../components/Spinner";

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
  const [movie, setMovie] = useState({})

  // fetch movie 
  const fetchMovie = async () => {
    setIsLoading(true)
    try {
      const endpoint = `${API_BASE_URL}/movie/${movieId}`

      const res = await fetch(endpoint, API_OPTIONS)

      if(!res.ok){
        throw new Error(res.status)
      }

      const data = await res.json()

      if(data.Response === 'false') {
        return data.Error || "Error fetching movies";
      }

      if(data) {
        setMovie(data)
      }

      return data

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovie()
  }, [fetchMovie.title])

  // calculate figures 
  const calculateFig = (fig) => {
    const figLen = fig?.toString().length

    if(figLen < 7){
      return fig.toString()
    }

    if(figLen == 7 ){
      return fig.toString().slice(0,1) + " million"
    }

    if(figLen == 8 ){
      return fig.toString().slice(0,2) + " million"
    }

    if(figLen == 9 ){
      return fig.toString().slice(0,3) + " million"
    }

    if(figLen == 10 ){
      return fig.toString().slice(0,1) + " billion"
    }

    if(figLen == 11 ){
      return fig.toString().slice(0,2) + " billion"
    }
  }

  // manipulate date 
  const maniputeDate = (date) => {
    const newDate = new Date(date)

    return moment(newDate).format("MMMM Do, YYYY")
  }

  //Display runtime
  const displayRuntime = (runtime) => {

    const convertToTime = (runtime/60).toFixed(2);
    const splitResult = convertToTime.split('.')
    const getHour = splitResult[0];
    const getMin = Number("0." + splitResult[1] * 60).toFixed(2).slice(2);
    
    // const result = getHour == 0 ? runtime + " min" : convertToTime.split('.').map((x, index) => index == 0 ? x + "hr" : x + "min").join(" ");
    const result = getHour == 0 ? runtime + " min" : `${getHour}hr ${getMin}min`;

    
    return result
  }

  return (
    <div className="wrapper text-white flex flex-col gap-4">
      <Navbar />

      <div className="flex flex-col">
        {isLoading ? 
          <Spinner /> : 
          <>
            <BackBtn />
            <div className="flex flex-col md:flex-row w-full gap-2 md:justify-between md:items-center mb-5 backdrop-blur-sm sticky top-0 z-50 bg-black/50 py-5">
              <div className="flex flex-col gap-2 lg:gap-4">
                <h2>{movie.original_title}</h2>
                <div className="flex gap-2 font-thin">
                  <p className="year">{movie.release_date?.split("-")[0]}</p>

                  <span>•</span>
                  <p className="runtime">{displayRuntime(movie.runtime)}</p>
                </div>
              </div>

              <div className="flex gap-2 text-sm lg:text-base">
                <div className="flex gap-2 rounded-full px-4 py-1 bg-[#3e0000] h-fit">
                  <img src="/star.svg" alt="" />
                  <p><b>{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</b>/10</p>
                </div>

                {movie.homepage !== "" ? <a href={movie.homepage} target="_blank" className="rounded-lg px-4 py-1 bg-[#910000] hover:bg-[#ff0404] h-fit transition-all duration-150">Visit Official Website &rarr;</a> : <span className="rounded-lg px-4 py-1 bg-[#910000] hover:bg-[#ff0404] h-fit transition-all duration-150 cursor-not-allowed">No Official Website </span>}
              </div>
            </div>

            <div className="poster">
              <img className="hidden lg:flex " src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`  : '/no-movie.png'} alt="" />
              <div className="relative flex-col gap-20 w-full h-full col-span-4 lg:col-span-3 rounded-lg overflow-clip">
                <img className="w-full lg:absolute" src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`  : '/no-movie.png'} alt="" />
              </div>
            </div>

            <table className="auto border-separate border-spacing-4">
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
                <td className="text-[16px] font-semibold">{maniputeDate(movie.release_date)}</td>
              </tr>
              <tr>
                <td className="h-full flex items-start text-lg text-gray-100">Countries</td>
                <td className="text-[16px] font-semibold">
                  {movie.production_countries?.length > 0 && movie.production_countries.map((country, index) => (
                    <React.Fragment key={index}>
                      <span>{country.name}</span>
                      {index < movie.production_countries?.length - 1 && <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>}
                    </React.Fragment>
                  ))}
                </td>
              </tr>
              <tr>
                <td className="h-full flex items-start text-lg text-gray-100">Language</td>
                <td className="text-[16px] font-semibold">
                  {movie.spoken_languages?.length > 0 && movie.spoken_languages.map((language, index) => (
                    <React.Fragment key={index}>
                      <span>{language.english_name}</span>
                      {index < movie.spoken_languages?.length - 1 && <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>}
                    </React.Fragment>
                  ))}
                </td>
              </tr>
              <tr>
                <td className="h-full flex items-start text-lg text-gray-100">Budget</td>
                <td className="text-[16px] font-semibold">{movie.budget !== 0 ? "$" + calculateFig(movie.budget) : "N/A"} </td>
              </tr>
              <tr>
                <td className="h-full flex items-start text-lg text-gray-100">Revenue</td>
                <td className="text-[16px] font-semibold">{movie.revenue !== 0 ? "$" + calculateFig(movie.revenue) : "N/A"}</td>
              </tr>
              <tr>
                <td className="h-full flex items-start text-lg text-gray-100">Production Company</td>
                <td className="text-[16px] font-semibold">
                  {movie.production_companies?.length > 0 && movie.production_companies.map((company, index) => (
                    <React.Fragment key={index}>
                      <span>{company.name}</span>
                      {index < movie.production_companies?.length - 1 && <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>}
                    </React.Fragment>
                  ))}
                </td>
              </tr>
              <tr>
                <td className="h-full flex items-start text-lg text-gray-100">Status</td>
                <td className="text-[16px] font-semibold">{movie.status}</td>
              </tr>
            </table>
          </>
        }
      </div>
    </div>
  )
}

export default Movie