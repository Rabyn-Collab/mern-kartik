import React from 'react'
import { useSearchParams } from 'react-router'

export default function SearchMeal() {
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get('s'));
  return (
    <div>SearchMeal</div>
  )
}
