import React from 'react'
import { useParams } from 'react-router'

export default function Meal() {
  const { id } = useParams();
  return (
    <div>Meal</div>
  )
}
