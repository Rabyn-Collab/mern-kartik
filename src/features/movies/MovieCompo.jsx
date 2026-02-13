import React from 'react'
import { useNavigate } from 'react-router'

export default function MovieCompo({ movie }) {
  const nav = useNavigate();
  return (
    <div
      onClick={() => nav(`/movie/${movie.id}`)}
      className="space-y-2 cursor-pointer">
      <p>{movie.title}</p>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
    </div>
  )
}
