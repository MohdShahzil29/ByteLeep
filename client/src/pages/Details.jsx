import React from 'react'
import Filter from '../components/Details/Filter'
import ProblemList from '../components/Details/ProblemList'

const Details = () => {
  return (
    <div className='flex justify-between'>
        <Filter />
        <ProblemList />
    </div>
  )
}

export default Details