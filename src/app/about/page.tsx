"use client"

import React, { useEffect, useState } from "react";
import Hero from "@/components/hero";
import Image from "next/image";
import Counter from "@/components/Counter";
import Trustedpartner from "@/components/Trust";
import Footer from "@/components/Footer";
import Slider from "react-slick";
import Header from "@/components/Header";
import { api } from "@/api";
import { Facebook, Linkedin } from "lucide-react";
import { FaTwitter } from "react-icons/fa6";



function About() {

  const [staffs, setstaffs] = useState([])


  useEffect(() =>{


    api.get("/allstaffs/")
    .then((res) => setstaffs(res.data))
    .catch((err) => console.log(err))

  }, [])

  return (
    <div>
      <Header/>
      <Hero title="ABOUT US" />
      <div
        data-aos="zoom-in"
        data-aos-duration={3000}
        className="container flex flex-col items-center gap-12 p-24 text-center md:flex-row md:gap-20"
      >
        <Image
          src={"/logo.jpeg"}
          alt="logo"
          width={100}
          height={100}
          className="h-25 w-64 object-contain"
        />

        <article>
          <h5 className="mb-2 text-3xl font-bold">OUR VISION</h5>
          <p className="text-lg font-[400] italic">
            To bridge the gap devoid in our indigenous Construction Industry and
            to maintain a good understanding with our clients which is our most
            valuable assets.
          </p>
        </article>
        <article>
          <h5 className="mb-2 text-3xl font-bold">OUR MISSION</h5>
          <p className="text-lg font-[400] italic">
            For quality work there must have to be quality tools/equipment and
            at DJCL we don’t compromise standard. Also, the safety of our staff
            is paramount in our schedule, thus, we adhere greatly to safety
            rules. We have good and workable tools/equipment in carrying out our
            works to the satisfaction of our clients
          </p>
        </article>
      </div>

      <div className="my-10" data-aos="fade-up-right" data-aos-duration={3000}>
        <h3 className="mb-6 text-center text-[4rem] font-bold">OUR TEAM</h3>

        <section className="container mx-auto px-5 py-24">
          <div className="-m-4 flex flex-wrap items-center justify-center">
           {
            staffs?.map((staff: any) =>(
              <div key={staff?.id} className="p-4 md:w-1/2">
              <div className="flex h-full flex-col items-center text-center">
                <Image
                  alt="team"
                  width={200}
                  height={200}
                  className="mb-4 h-64 w-full flex-shrink-0 rounded-lg object-contain object-center"
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${staff?.user?.photo}`}
                />
                <div className="w-full">
                  <h2 className="title-font capitalize text-gray-900 text-lg font-medium">
                    {staff?.user?.first_name} {staff?.user?.last_name} 
                  </h2>
                  <h3 className="text-gray-500 mb-3">{staff?.position}</h3>
                  <span className="inline-flex">
                    <a href={staff?.facebook} className="text-gray-500">
                     <Facebook/>
                    </a>
                    <a href={staff?.twitter} className="text-gray-500 ml-2">
                     <FaTwitter size={28}/>
                    </a>
                    <a href={staff?.linkedin} className="text-gray-500 ml-2">
                    <Linkedin/>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            ))
           }
            
          </div>
        </section>

      </div>

        <div className="flex min-h-60 w-full  text-white items-center justify-center p-10 md:p-30 bg-[#6dacc7]">

       <Counter />

        </div>

        <Trustedpartner/>

      <Footer/>
    </div>
  );
}

export default About;
