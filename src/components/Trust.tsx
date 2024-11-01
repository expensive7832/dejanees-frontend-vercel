"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { api } from "@/api";

function Trusted() {

  const [allimages, setallimages] = useState([])

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    easing: "ease-in-out",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() =>{

    api.get("/fetchclient/")
    .then((res) => setallimages(res.data))
    .catch((err) => console.log(err))

  }, [])

  return (
    <div className="m-auto w-full p-10 md:w-2/3">
      <p className="my-4 text-center text-lg italic h-14">our trusted partner</p>

      <Slider className="flex items-center" {...settings}>
       {
        allimages?.map((img: any) =>(
          <Image
          key={img?.id}
          src={`https://backend.dejaneesconcepts.com.ng/${img?.image}`}
          alt="our partner"
          height={100}
          width={100}
          className="object-ccontain h-[10rem] w-[10rem] md:pr-4 "
        />
        ))
       }
        
      </Slider>
    </div>
  );
}

export default Trusted;
