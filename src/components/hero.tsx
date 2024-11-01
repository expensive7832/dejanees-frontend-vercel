import Image from 'next/image'
import React from 'react'

type Props = {
    title: string
}

function hero({title}: Props) {
  return (
    <div className="bg-[url('/hero2.png')] flex bg-no-repeat bg-cover bg-center text-white h-[10rem] w-full justify-center items-center">
       <h2 className="font-bold text-[3rem] shadow">{title}</h2>
    </div>
  )
}

export default hero