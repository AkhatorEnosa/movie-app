/* eslint-disable react/prop-types */

const TrendingMovieCard = ({ movie, index}) => {
  return (
    <li className="cursor-pointer">
        <p>{index + 1}</p>
        <div className="relative">
        <div className="absolute bg-black/50 w-full h-full -ml-3.5 rounded-lg">
            <p>{movie.title}</p>
        </div>
        <img src={movie.poster_url} alt={movie.title} />
        </div>
    </li>
  )
}

export default TrendingMovieCard