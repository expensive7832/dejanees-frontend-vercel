
"use client"
import {api} from '@/api'
import Loader from '@/components/Loader'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'



function Verify({params}: any){


    const {toast} = useToast()

    const route = useRouter()

    


    const [loading, setLoading] = useState(true)

    async function verifyUser(){
        await api(`/verify/${params.slug[0]}/${params.slug[1]}`)
        .then((res) => {
            console.log(res.data);
            
            toast({title: `hooray!!! account activated`, variant:"success"})
            route.replace("/sign-in")
        })
        .catch((err) =>{
            
            Object.entries(err.response.data)?.map((each) =>{
                if(each[1] === "user active"){
                    toast({title: `${each[1]}`, variant:"destructive"})

                route.replace("/sign-in")
                }else{
                    toast({title: `${each[1]}`, variant:"destructive"})

                route.replace("/sign-up")
                }
                
            })
            
        })
    }

    useEffect(() =>{
        verifyUser()
        return() =>{
            null
        }
    }, [])

  return (
    <div className="absolute top-1/2 left-1/2 h-[100vh]">
        {
            loading && <Loader/>
        }
    </div>
  )
}

export default Verify