"use client"
// @ts-ignore
import React, { useEffect, useState } from "react";
import Hero from "@/components/hero";
import Image from "next/image";
import Trusted from "@/components/Trust";
import Counter from "@/components/Counter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { api } from "@/api";

import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type Props = {};

function Project({}: Props) {


  const [lighboxOpen, setLighboxOpen] = useState(false);

  const [image, setImage] = useState<any>()


  
  
  const [project, setproject] = useState<any>([])
  
  function openLightBox(index: number){

    let img = project.find((pj: any) => pj?.id === index)?.image

    setImage(img)
    
 
    setLighboxOpen(true)
  }
  
  

  useEffect(() =>{


    api.get("/fetchproject/")
    .then((res) => setproject(res.data))
    .catch((err) => console.log(err))

  }, [])

  return (
    <div>
      <Header/>
      <Hero title="PROJECT" />

      <main className="" data-aos="zoom-in" data-aos-duration="3000">
        <section className="md:p-20 text-gray-600 body-font">
          <div className="container mx-auto px-5 py-24">
            <div className="mb-20 flex w-full flex-wrap">
              <div className="mb-6 w-full lg:mb-0 lg:w-1/2">
                <h1 className="title-font text-gray-900 mb-2 text-2xl font-medium sm:text-3xl">
                  Our Project
                </h1>
                <div className="h-1 w-20 rounded  bg-[#24ADE1]" />
              </div>
            </div>
            <div className="-m-4 grid grid-cols-1 md:grid-cols-3">
             {
              project?.map((pj: any) =>(
                <div key={pj?.id} className={`p-4  min-h-[50vh]`}>
                <div className="bg-gray-100 project relative rounded-lg p-6">
                 <Image
                    width={200}
                    height={400}
                    onClick={() => openLightBox(pj?.id)}
                    className="mb-6 h-full w-full rounded object-cover object-center"
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${pj?.image}`}
                    alt="content"
                  />
                 
                  <h3 className="title-font absolute top-1/2 left-1/2 text-2xl  font-medium tracking-widest text-white -translate-y-1/2 -translate-x-1/2">
                    {pj?.company}
                  </h3>
                  
                </div>
              </div>
              ))
             }

             
              {
                lighboxOpen && (
                  <Dialog open={lighboxOpen} onOpenChange={setLighboxOpen}>
                   
                  <DialogContent>
                  <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
                  alt="project"
                  height={300}
                  width={400}
                  className="h-full object-center object-contain w-full "
                  />
                  </DialogContent>
                </Dialog>
                  
                )
              }
              
            </div>
           

          </div>
        </section>

        <div className="flex min-h-60 w-full  text-white items-center justify-center p-10 md:p-30 bg-[#6dacc7]">

<Counter />

 </div>

        <Trusted />

        <Footer/>
      </main>
    </div>
  );
}

export default Project;
