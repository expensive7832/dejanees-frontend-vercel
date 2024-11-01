'use client'

import { apiwithtoken } from '@/api'
import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from '@/components/ui/use-toast'

function Testimonial() {

    const { toast } = useToast()

    const [read, setread] = useState(false)
    const [content,setContent] = useState("")

    const [tts, settts] = useState([])

    useEffect(() =>{

        apiwithtoken.get("/fetchtestimonialadmin/")
        .then((res) => settts(res.data))
        .catch(err => console.log(err))
    }, [])

    async function updateTestimonial(id: number, active: Boolean){
        await apiwithtoken.patch(`/updtestimonial/${id}`, {active: active} )
        .then((res) => location.reload())
        .catch((err) =>{
            toast({title: err.response.data, variant: "destructive"})
        })
    }

    async function handleDelete(id: number){
        await apiwithtoken.delete(`/deltestimonial/${id}`)
        .then((res) => location.reload())
        .catch((err) =>{
            toast({title: err.response.data, variant: "destructive"})
        })
    }

  return (
    <div>

  <div className="container  flex w-full justify-center mx-auto">
  <div className="flex flex-col">
    <div className="w-full">
      <div className="border-b border-gray-200 shadow">
        <table className="divide-y divide-gray-300 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-2 text-xs text-gray-500">
                ID
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                Name
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                Position
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                Description
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
              Edit
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                view
              </th>
              <th className="px-6 py-2 text-xs text-gray-500">
                Delete
              </th>
             
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
           {
            tts?.map((tt: any) =>(
                <tr key={tt?.id} className="whitespace-nowrap">
                <td className="px-6 py-4 text-sm text-gray-500">
                  {tt?.id}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                  {tt?.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">{tt?.position}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                {tt?.text?.length > 15 ? tt?.text?.slice(0,15) + "..." : tt?.text}
                </td>
                <td className="px-6 py-4">

                 <select onChange={(e) => updateTestimonial(tt?.id, Boolean(e.target.value))} >
                  <option selected={tt?.active == true ? true : false} value="true">True</option>    
                  <option selected={tt?.active == false ? true : false} value="false">False</option>    
                  </select>
               
                </td>
                <td className="px-6 py-4">
                  <p onClick={() => {
                    setread((prev) => !prev)
                    setContent(tt?.text)
                  }} className="px-4 cursor-pointer py-1 text-sm text-red-400 bg-red-200 rounded-full">read more</p>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() =>handleDelete(tt?.id)} className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Delete</button>
                </td>
              </tr>
             
            ))
           }

           <Dialog
           open={read}
           onOpenChange={setread}
           >
            
             <DialogContent>
               {content}
             </DialogContent>
           </Dialog>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


    </div>
  )
}

export default Testimonial