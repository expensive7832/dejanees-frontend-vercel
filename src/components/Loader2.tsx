import Image from 'next/image'
import React from 'react'

type Props = {}

function Loader2({}: Props) {
  return (
    <Image
    src={"/loading.gif"}
    alt="loader"
    height={20}
    width={20}
    objectFit="contain"
    />
  )
}

export default Loader2