"use client"

import {api} from '@/api'
import { useToast } from '@/components/ui/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Loader2 from '@/components/Loader2'

type Props = {}

function Forgetpassword({}: Props) {

    const router = useRouter()

    const { toast } = useToast()

    const [status, setstatus] = useState(false)
    const [status2, setstatus2] = useState(false)
    const [open, setopen] = useState(false)

    const email = useSearchParams().get("email")

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        setstatus(true)
        e.preventDefault()
        let data = new FormData(e.currentTarget)

        let otp = `${data.get("first")}${data.get('second')}${data.get('third')}${data.get('fourth')}${data.get('fifth')}${data.get('sixth')}`

       await api.post("/verify-otp/", {email, otp})
       .then(() => setopen(true))
       .catch((err) => {
        toast({
            title: err.response.data,
            variant:"destructive"
        })
       })
       .finally(() => setstatus(false))
        
    }

    const changepassword = async(e: FormEvent<HTMLFormElement>) =>{
        setstatus2(true)
        e.preventDefault()
        let data = new FormData(e.currentTarget)


       await api.post("/password/", {email: email, password: data.get("password")})
       .then(() => {
        toast({
            title: "password change succesfully",
            variant:"success"
        })

        router.replace("/login")
        
       })
       .catch((err) => {
        toast({
            title: err.response.data,
            variant:"destructive"
        })
       })
       .finally(() => setstatus2(false))
        
    }
    

  return (
   
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>enter the code sent to {email}</p>
            </div>
          </div>
    
          <div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-12 h-12 ">
                    <input name="first" className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text"  id=""/>
                  </div>
                  <div className="w-12 h-12 ">
                    <input name="second" className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text"  id=""/>
                  </div>
                  <div className="w-12 h-12 ">
                    <input name="third" className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text"  id=""/>
                  </div>
                  <div className="w-12 h-12 ">
                    <input name="fourth" className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text"  id=""/>
                  </div>
                  <div className="w-12 h-12 ">
                    <input name="fifth" className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text"  id=""/>
                  </div>
                  <div className="w-12 h-12 ">
                    <input name="sixth" className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text"  id=""/>
                  </div>
                </div>
    
                <div className="flex flex-col space-y-5">
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                      Verify Account
                    </button>
                  </div>
    
                </div>
              </div>
            </form>

                <Dialog
                open={open}
                modal={open}
                >
                  
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Enter new password</DialogTitle>
                      <DialogDescription>
                     
                      <form onSubmit={changepassword} >
                            <input
                              type="password"
                              name="password"
                              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />

                            <div className="mt-5">
                              <button
                                type="submit"
                                className="flex cursor-pointer items-center justify-center rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                              >
                                {status2 && <Loader2 />}
                                UPDATE
                              </button>
                            </div>
                          </form>

                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgetpassword