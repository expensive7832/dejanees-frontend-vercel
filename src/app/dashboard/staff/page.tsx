"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { api, apiwithtoken } from "@/api";
import { useToast } from "@/components/ui/use-toast";
import Loader2 from "@/components/Loader2";

import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Loader from "@/components/Loader";
import Image from "next/image";

const Staff = () => {

  const router = useRouter()

  const [status, setStatus] = useState(false)
  const [status2, setStatus2] = useState(false)

  const [staff, setStaff] = useState<any>(null)

  const [toggleupdate, settoggleupdate] = useState(false)
  const [toggledelete, settoggledelete] = useState(false)

  const { toast } = useToast()

  async function handleCreateStaff(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    setStatus(true)
    let form = new FormData(e.currentTarget)

    await apiwithtoken.post("/createstaff/", form)
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


 
  async function fetchStaff(){
    await apiwithtoken.get("/staffs/")
    .then((res) => setStaff(res.data))
    .catch((err) =>{
      console.log(err);
      
    })
  }

  
  useEffect(() =>{


    fetchStaff()

    return() => {}

  }, [])

  async function handleDelete(id: number){
    setStatus2(true)
    await apiwithtoken.delete(`/deleteuser/${id}`)
    .then((res) => window.location.reload())
    .catch((err) => console.log(err))
    .finally(() => setStatus2(false))
  }

  
  

  return (
    <>
      

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <form onSubmit={handleCreateStaff} className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add New Staff
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
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
                  type="text"
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
                  name="photo"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
             

         
          

        
          <button className="bg-blue-500 flex items-center text-white p-4 rounded-md font-bold">
            {status && <Loader2/>}
             CREATE
          </button>
            </div>
          </div>


          
        </form>

        <div className="flex flex-col gap-9">
          {/* <!-- Textarea Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Staff
              </h3>

              <div className="flex flex-col space-y-3">

                {staff === null ?
                  
                  <Loader2/>
                  :
                  <>
                  {
                    
                 staff.length == 0 ?
                 <p className="text-yellow-400">No Staff</p>
                 :

                
                 staff?.map((user:{id: number, user:{first_name: string, photo: string}, created_by:{first_name: string} }) =>(
                  <div key={user?.id} className="flex gap-4 p-2 items-center">
                   
                      <Image className="w-15 h-15 rounded-full object-cover" src={`${process.env.NEXT_PUBLIC_API_URL}${user?.user?.photo}`} alt="user" />
                      <h4 className="my-2 after:block after:border-b after:w-10">{user?.user?.first_name}</h4>
                      <h4 className="my-2 after:block after:border-b after:w-10">{user?.created_by?.first_name}</h4>
                      <Link href={`/dashboard/staff/update/${user?.id}`} className="p-2 text-white font-bold bg-primary">UPDATE</Link>
                      <button onClick={() => settoggledelete((prev) => !prev)} className="p-2 text-white font-bold bg-danger" >DELETE</button>
                    {/* update */}
                      <Dialog
                      open={toggledelete}
                      onOpenChange={settoggledelete}
                      >
                       
                        <DialogContent>
                          <DialogHeader >
                            <h3 className="font-bold text-center text-3xl">are you sure ?</h3>
                           {
                            status2 ?
                            <Loader/>:
                            <button onClick={() => handleDelete(user?.id)} className="p-2 text-white font-bold w-20 m-auto rounded mt-2 bg-danger" >DELETE</button>
                    
                           }
                            <DialogDescription>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                  </div>
                ))
                  }
                  </>
              
              } 

              </div>

            </div>
           
          </div>

        </div>
      </div>
    </>
  );
};

export default Staff;
