import Loader from '@/components/Loader'
import React from 'react'

type Props = {}

function loading({}: Props) {
  return (
    <div className="flex-1  justify-center items-center">
        <Loader/>
    </div>
  )
}

export default loading