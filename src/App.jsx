import { useEffect, useState } from "react"
import Search from "./components/Search"
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [movies, setMovies] = useState([])
  const [trending, setTrending] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  // This hook debounces the searchTerm from making a request to the api on every change. Debouncing stalls the request until searchTerm does not change for a number of time 
  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm)
  }, 500, [searchTerm]
  )

  const fetchMovies = async (query = "") => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const res = await fetch(endpoint, API_OPTIONS)

      if(!res.ok){
        throw new Error(res.status)
      }

      const data = await res.json()

      if(data.Response === 'false') {
        setErrorMessage(data.Error || "Error fetching movies")
        setMovies([])
        return;
      }

      setMovies(data.results || [])

       if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0])
       }

    } catch (error) {
      console.log(error)
      setErrorMessage(error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()

      setTrending(movies)
    } catch (error) {
      console.log(`Error fetching trending movies: ${error}`)
    }
  }

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        {trending.length > 0 && (
          <section className="trending">
            <h2>What people are watching</h2>

            <ul>
              {trending.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {
            isLoading ? (
              <Spinner />
            ) : errorMessage ? 
            (
              <p className="text-red-500">{errorMessage}</p>
            ) : movies.length < 1 ?
            (
              <h3 className="text-white">No Result for <b className="text-light-200">{debouncedSearchTerm}</b></h3>
            ) :
            (
              <ul>
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie}/>
                ))}
              </ul>
            )
          }
        </section>
      </div>
    </main>
  )
}

export default App 