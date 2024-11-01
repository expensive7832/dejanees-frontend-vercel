"use client"

import { apiwithtoken } from '@/api'
import Loader2 from '@/components/Loader2'
import { useToast } from '@/components/ui/use-toast'
import React, { FormEvent, useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'



function Update({params}:any) {

  const router = useRouter()

  const [user, setuser] = useState<any>({
    facebook: "",
    linkedin: "",
    twitter: "",
    position:"",
    first_name: "",
    last_name: "",
    email: "",
    photo: ""
    
  })

  
    

    useLayoutEffect(() =>{

      apiwithtoken.get(`/user/${params.id}`)
      .then((res) => {
        setuser({
          facebook: res?.data.facebook,
          linkedin: res?.data.linkedin,
          twitter: res?.data.twitter,
          position: res?.data.position,
          first_name: res?.data?.user?.first_name,
          last_name: res?.data?.user?.last_name,
          email: res?.data?.user?.email,
          photo: res?.data?.user?.photo,

        })
       
        
      })
      .catch((err) =>{
       router.replace("/sign-in")
        
      })

    }, [params.id, router])

    const [status, setStatus] = useState(false)

    const { toast } = useToast()

    async function handleUpdateStaff(e:FormEvent<HTMLFormElement>){
        e.preventDefault()
        setStatus(true)
        let form = new FormData(e.currentTarget)

        form.append("oldimage", user?.photo)
        await apiwithtoken.patch(`/update/${params.id}`, form)
        .then((res) => {
          toast({
            title:`success`,
            variant:"success"
          })
    
          window.location.reload()
          
        })
        .catch((err) =>{
         
          console.log(err);
          
          for(let key in err.response.data){
            toast({
              title:`${key}: ${err.response.data[key]}`,
              variant:"destructive"
            })
          }
        })
        .finally(() => setStatus(false))
      }

  return (
    <form onSubmit={handleUpdateStaff} className="flex flex-col gap-9">
    {/* <!-- Input Fields --> */}
    <div className="rounded-sm max-md:w-[90%] w-2/3 m-auto border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Update Staff
        </h3>
      </div>
      <div className="flex flex-col gap-5.5 p-6.5">
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            First Name
          </label>
          <input
         onChange={(e) => setuser({...user, first_name: e.target.value})}
            type="text"
            value={user?.first_name}
            placeholder="enter first name"
            name="first_name"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            LastName
          </label>
          <input
           onChange={(e) => setuser({...user, last_name: e.target.value})}
            type="text"
            value={user?.last_name}
            placeholder="enter last name"
            name="last_name"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Email
          </label>
          <input
           onChange={(e) => setuser({...user, email: e.target.value})}
           value={user?.email}
            type="email"
            placeholder="enter  email"
            name="email"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Facebook Link
          </label>
          <input
           onChange={(e) => setuser({...user, facebook: e.target.value})}
           value={user?.facebook}
            type="text"
            placeholder="enter  facebook link"
            name="facebook"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Twitter Link
          </label>
          <input
           onChange={(e) => setuser({...user, twitter: e.target.value})}
            value={user?.twitter}
            type="text"
            placeholder="enter  facebook link"
            name="twitter"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Linkedin Link
          </label>
          <input
           onChange={(e) => setuser({...user, linkedin: e.target.value})}
          value={user?.linkedin}
            type="text"
            placeholder="enter  facebook link"
            name="linkedin"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            position
          </label>
          <input
           onChange={(e) => setuser({...user, position: e.target.value})}
          value={user?.position}
            type="text"
            placeholder="enter positiom"
            name="position"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Photo
                </label>
                <input
                  type="file"
                  name="image"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
        
       
        
  
    <button className="bg-blue-500 flex items-center text-white p-4 rounded-md font-bold">
      {status && <Loader2/>}
       UPDATE
    </button>
      </div>
    </div>


    
  </form>
  )
}

export default Update