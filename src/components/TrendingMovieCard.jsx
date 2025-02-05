/* eslint-disable react/prop-types */

import { Link } from "react-router"

const TrendingMovieCard = ({ movie: { movie_id, title, poster_url}}) => {
  return (
    <li className="group cursor-pointer">
      <Link to={`/${movie_id}`} className="link">
        <img src={poster_url} alt="Movie Poster" />
        <p className="group-hover:line-clamp-none">{title}</p>
      </Link>
    </li>
  )
}

export default TrendingMovieCard