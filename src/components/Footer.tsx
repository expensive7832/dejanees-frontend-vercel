import { api } from '@/api'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import Loader2 from './Loader2'
import { useToast } from './ui/use-toast'

function Footer() {

  const { toast } = useToast()

  const [status, setstatus] = useState(false)


  async function createtestimony(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    setstatus(true)
    let data = new FormData(e.currentTarget)
    await api.post("/addtestimonial/", data)
    .then((res) => {
      toast({
        title: "thanks for the testimony",
        variant: "success"
      })
      location.reload()
    })
    .catch((err) => {
      toast({
        title: err?.response?.data,
        variant: "destructive"
      })
    })
    .finally(() => setstatus(false))
    

  }

  return (
     
       
     <footer className="text-white font-satoshi bg-[#FF807F] ">
  <div className="container grid grid-cols-1 md:grid-cols-3 py-15 max-md:gap-10 px-10">
  
    
      <div className="px-4">
        <h2 className="title-font font-medium text-gray-900  tracking-widest text-xl mb-3">Social links</h2>
        <nav className="list-none flex flex-wrap gap-3 mt-10">
          <li>
            <a className="text-gray-600 hover:text-gray-800">
              <Facebook color='#fff' size={32}/>
            </a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">
              <Linkedin color='#fff' size={32}/>
            </a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">
              <Instagram color='#fff' size={32}/>
            </a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-800">
              <Twitter color='#fff' size={32}/>
            </a>
          </li>
        </nav>
      </div>

      <div className="px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Opening Hour</h2>
        <nav className="list-none font-bold flex flex-col gap-6 mt-10">
          <li>
            Mon 9AM - 6PM
          </li>
          <li>
            Tues 9AM - 6PM
          </li>
          <li>
            Wed 9AM - 6PM
          </li>
          <li>
            Thurs 9AM - 6PM
          </li>
          <li>
            Fri 9AM - 6PM
          </li>
        </nav>
      </div>

      <div className="px-4">
        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">ADD REVIEW</h2>
       <form onSubmit={createtestimony} className='mt-10'>
        <div className="flex flex-col items-start gap-y-3">
          <div className="flex flex-col md:flex-row items-start gap-3">
            <input
             
              type="text"
              name="name"
              className="w-full p-4 placeholder:text-white bg-transparent border border-gray-200 rounded-lg outline-none"
              placeholder="Enter your name"
            />
            <input
              
              type="text"
              name="position"
              className="w-full  placeholder:text-white p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
              placeholder="Enter your position i.e general manager"
            />
          </div>
          <textarea
          name='text'
            id="name"
           
            className="w-full  placeholder:text-white p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
            placeholder="Enter comment"
          />
        </div>

        <button className="p-4 rounded bg-[#1c4c5f] mt-2">
          {status && <Loader2/>}
          ADD REVIEW
          
        </button>
       </form>
      </div>
     
   
  </div>
 
</footer>

      
     
  )
}

export default Footer