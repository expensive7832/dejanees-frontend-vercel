"use client"
import { api } from '@/api';
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup';
type Props = {}

function Counter({}: Props) {

  const [counters, setCounters] = useState<any>([])

  useEffect(() =>{

    api.get("/fetchcounter/")
    .then((res) => setCounters(res.data))
    .catch((err) => console.log(err))

  }, [])

  return (
    <div className="flex w-full justify-between max-md:gap-10 flex-col md:flex-row  md:items-center">
    
    {
      counters.map((counter: any, index: any) => (
        <div key={index}>
        <p className="text-[3rem]  font-bold">
        <CountUp start={0} end={counter?.number} duration={10} separator=',' />
           +</p>
        <p className='leading-5 mt-2'>{counter?.title}</p>
      </div>
      ))
    }
    
    </div>
  )
}

export default Counter