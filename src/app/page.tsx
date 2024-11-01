"use client";
import { api, apiwithtoken } from "@/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userInfo } from "../../redux/Slices/UserSlices";
import Image from "next/image";
import { Network, User, UsersRound } from "lucide-react";
import Link from "next/link";

import Footer from "@/components/Footer";
import Counter from "@/components/Counter";
import Trustedpartner from "@/components/Trust";
import Header from "@/components/Header";
import Slider from "react-slick";

type Props = {};

function Homepage({}: Props) {
  const services = [
    {
      id: 1,
      title: "Rural Electrification Projects",
    },
    {
      id: 2,
      title: "Commercial Residential Development",
    },
    {
      id: 3,
      title: "Renovations and Conversion",
    },
    {
      id: 4,
      title: "Project Management & Procurement",
    },
    {
      id: 5,
      title: "Industrial and domestic electrical installation",
    },
    {
      id: 6,
      title: "Installations and expedition of Base stations",
    },
  ];

  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state?.user?.token?.access);

  useEffect(() => {
    if (token !== undefined && token !== "") {
      apiwithtoken
        .get("/user/")

        .then((res) => {
          dispatch(userInfo(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [token, dispatch]);

  // testimnoial

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    loop: true,
    easing: "ease-in-out",
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [tts, settts] = useState<any>();


  useEffect(() => {
    api
      .get("/fetchtestimonial/")
      .then((res) => settts(res.data))
      .catch((err) => console.log(err));
  }, []);


  
  

  return (
    <div className="bg-[#f1f1f1] font-satoshi">
      <Header />
      {/* banner */}
      <div className="banner flex h-[100vh] items-center bg-[url('/hero.png')] bg-cover bg-center bg-no-repeat px-10">
        {/* <Image src={"hero.png"} alt='hero' width={100} height={100} className='object-cover'/> */}
        <div className="flex flex-col items-start gap-3">
          <p className="text-5xl font-bold text-white">SAFE AND SECURE</p>
          <small className="text-[1.3rem] capitalize text-white my-4">
            we are service you can trust
          </small>
          <Link href={"/contact"} className="rounded-md border border-[#FF807F] px-8 py-3 font-bold text-[#fff] hover:border-[#d36b6b]">
            Contact Us Now
          </Link>
        </div>
      </div>

      <main>
        {/* first section */}

        <section data-aos="fade-right" data-aos-duration="5000">
          <div className="container m-auto grid flex-1 grid-cols-1 items-center justify-around gap-4 bg-white py-8 md:grid-cols-2 md:p-20">
            <div>
              <h4 className="text-3xl font-bold uppercase">We Are Dejanees</h4>
              <p className="my-4 break-words leading-7 md:w-2/3">
                For quality work there must have to be quality tools/equipment
                and at DJCL we don’t compromise standard. Also, the safety of
                our staff is paramount in our schedule, thus, we adhere greatly
                to safety rules. We have good and workable tools/equipment in
                carrying out our works to the satisfaction of our clients
              </p>
              <Link href={"/about"} className="rounded bg-[#10AAEA] p-3">Read More...</Link>
            </div>

            <Image
              src={"/Rectangle4.png"}
              alt="site image"
              width={100}
              height={100}
              className="ms-auto block w-full rounded object-contain md:w-2/3"
            />
          </div>
        </section>

        {/* second section */}

        <section
          data-aos="fade-down"
          className="container bg-[#edebeb] p-10 text-center "
        >
          <h4 className="my-7 text-3xl font-bold uppercase  ">Our Services</h4>

          <div className="m-auto mt-20  flex w-full flex-wrap justify-between gap-20 md:w-[80vw] md:gap-10">
            {services?.map((service) => (
              <div
                key={service?.id}
                className="relative rounded-md bg-white p-6 max-md:min-w-[70vw] max-md:m-auto  md:w-[20vw]"
              >
                <div className="absolute left-1/2 top-[-2rem] -translate-x-1/2 rounded-lg bg-black p-2">
                  <Network color="#fff" size={30} />
                </div>
                <div>
                  <h4 className="my-3 font-bold leading-8">{service?.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* third section */}
        <section
          data-aos="fade-up"
          className="container bg-gradient-to-tr  from-[#c1c1c1] to-[#95c1d4] p-15 max-md:pt-5 md:p-20"
        >
          <p className="mb-8 text-sm font-bold uppercase text-white">
            why choose us
          </p>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2  md:gap-0">
            <div className="flex-1">
              <h4 className="text-3xl font-bold capitalize leading-10 text-white">
                Trusted Service With <br /> Affordable Price
              </h4>

              <Image
                src={"/sn.png"}
                alt="trust us"
                width={100}
                height={100}
                className="block h-full w-[20rem] object-contain max-md:m-auto"
              />
            </div>

            <div className="flex-1 text-white">
              <Counter />

              <div className="n my-10 flex flex-wrap justify-between gap-7 md:gap-5">
                <div className="w-full sm:w-[40%]">
                  <UsersRound color="#fff" />
                  <h3 className="my-3  text-xl font-bold">Experienced</h3>
                  <p>
                    we have accumulated wealth of experience working on variety of projects, ranging
                    from residential to commercial and industrial electrical installation
                  </p>
                </div>
                <div className="w-full sm:w-[40%]">
                  <UsersRound color="#fff" />
                  <h3 className="my-3  text-xl font-bold">Expertise</h3>
                  <p>
                   we are composed of highly skilled engineers and electricians with in-depth knowledge
                   of electrical systems, solar energy and energy management
                  </p>
                </div>
                <div className="w-full sm:w-[40%]">
                  <UsersRound color="#fff" />
                  <h3 className="my-3  text-xl font-bold">Project Management</h3>
                  <p>
                    through years of experience we have honed their project management skills ensuring
                    time delivery, quality control and cost management.
                    we have successfully managed projects from design to implementatio, ensuring client
                    satisfaction and minimal downtime
                  </p>
                </div>
                <div className="w-full sm:w-[40%]">
                  <UsersRound color="#fff" />
                  <h3 className="my-3  text-xl font-bold">Innovation and Adaptation</h3>
                  <p>
                   As the standard evolves, De-janees concepts continue to expand its knowledge base and
                   adapt to new technologies. experience with both traditional electrical systems and cutting edge
                   solar and hybrid systems shows a commitment to innovation and continuous learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* fourth section */}

        {/* fifth section */}

        <Trustedpartner />

        {/* fifth section */}

        <section className="bg-white max-md:py-12 md:p-24 ">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 flex flex-col items-center justify-center max-sm:gap-8 sm:flex-row ">
              <h2 className="text-gray-900 text-center text-4xl font-bold lg:text-left">
                Testimonials{" "}
              </h2>

            
            </div>
            <div className="">
              
                <section className="text-gray-600 body-font">
                <Slider
                {...settings}
                >
                 {tts?.map((info: any, i: number) =>(
                  
                   <div key={i} className="container text-center">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-gray-400 mb-8 inline-block h-8 w-8" viewBox="0 0 975.036 975.036">
                       <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
                     </svg>
                     <p className="text-lg leading-relaxed">
                       {info?.text}
                     </p>
                     <span className="mb-6 mt-8 inline-block h-1 w-10 rounded bg-indigo-500" />
                     <h2 className="text-gray-900 uppercase title-font text-sm font-medium tracking-wider">
                     {info?.name}
                     </h2>
                     <p className="text-gray-500 uppercase tracking-wider font-bold">{info?.position}</p>
                   </div>
                 
                 ))}
                </Slider>
                </section>

             
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Homepage;
