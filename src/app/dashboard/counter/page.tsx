"use client"
import { apiwithtoken } from '@/api';
import { useToast } from '@/components/ui/use-toast';
import React, { FormEvent, useState, useEffect } from 'react'

function Counter() {

    const { toast } = useToast()

    const [status, setStatus] = useState(false)
    const [counter, setcounter] = useState([])

    useEffect(() =>{

        apiwithtoken.get("/fetchcounter/")
        .then((res) => setcounter(res.data))
        .catch((err)=> console.log(err))

    }, [])



    async function handleCounter(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus(true);
        let form = new FormData(e.currentTarget);
    
        await apiwithtoken
          .post("/counter/", form)
          .then((res) => {
            toast({
              title: `success`,
              variant: "success",
            });
    
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
    
            for (let key in err.response.data) {
              toast({
                title: `${key}: ${err.response.data[key]}`,
                variant: "destructive",
              });
            }
          })
          .finally(() => setStatus(false));
      }

      async function handleDelete(id: number){
       
        await apiwithtoken.delete(`/delcounter/${id}`)
        .then((res) => window.location.reload())
        .catch((err) => console.log(err))
        
      }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
         {/* counter */}
         <form onSubmit={handleCounter} className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Counter
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  title
                </label>
                <input
                  type="text"
                  placeholder="enter title"
                  name="title"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  number
                </label>
                <input
                  type="number"
                  placeholder=""
                  name="number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button className="flex items-center rounded-md bg-blue-500 p-4 font-bold text-white">
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
                Counter
              </h3>

              <div className="">

                {
                    counter?.map((c: any) =>(
                        <div key={c?.id} className="flex justify-between gap-4 p-2 items-center">
                            
                        <div className="flex gap-3">
                        <h3>{c?.title}</h3>
                        <p>{c?.number}</p>
                        </div>
                     
                      <button onClick={() => handleDelete(c?.id)} className="p-2 text-white font-bold bg-danger" >DELETE</button>
                  
                  </div>
                    ))
                }
               

              </div>

            </div>
           
          </div>

        </div>

    </div>
  )
}

export default Counter