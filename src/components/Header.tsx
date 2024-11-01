"use client";

import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useLayoutEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {api, apiwithtoken} from "@/api";
import { useToast } from "./ui/use-toast";
import { isLogout } from "../../redux/Slices/UserSlices";
import { useRouter } from "next/navigation";
import { AlignRight, MapPin, X } from "lucide-react";


function Header() {

  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState<{city: string, street: string}>({
    city: "",
    street: ""
  })

  const { toast } = useToast()

  const [toggleBar, setToggleBar] = useState(false)

  
  const login = useAppSelector((state) => state.user.login);
  const admin = useAppSelector((state) => state.user.userData.is_superuser);

  
 
  const dispatch = useAppDispatch()

  const router = useRouter()

  const handleLogout = () =>{
    dispatch(isLogout())

    router.replace("/sign-in")

  }

  useLayoutEffect(() =>{

    api.get('/fetchphone/')
    .then((res) => setPhone(res.data))
    .catch((err) => console.log(err))

    api.get('/fetchaddress/')
    .then((res) => setAddress(res.data))
    .catch((err) => console.log(err))



  }, [])


  return (
    <header className="text-gray-600 bg-white body-font">
    {/* big screen display */}
    <div className="hidden md:block">
    <div className="container  md:w-[80%] min-h-[15vh] flex flex-wrap  flex-col md:flex-row items-center">
      <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <Image
        src={"/logo.jpeg"}
        alt="logo"
        objectFit="cover"
        width={100}
        height={100}
        className="w-full object-cover contrast-100 "
        />
      </Link>
      <nav className="md:ml-auto flex gap-5 flex-wrap items-center text-base justify-center">
       <div className="flex ">
       <Image
        src={"/loc.png"}
        alt="icon"
        objectFit="contain"
        width={10}
        height={10}
        className="w-7 h-7 object-contain contrast-100 "
        />
        <div>
          <p className="text-[12px] leading-[6px] capitalize">{address.street}</p>
          <small className="text-[1rem] font-bold capitalize text-[#10AAEA]">{address.city}</small>
        </div>
       </div>
       <div className="flex ">
       <Image
        src={"/mobile.png"}
        alt="icon"
        objectFit="contain"
        width={10}
        height={10}
        className="w-7 h-7 object-contain contrast-100 "
        />
        <div>
          <p className="text-[12px] leading-[6px] ">Call Us Anytime</p>
          <Link href={`tel:${phone}`} className="text-[1rem] font-bold text-[#10AAEA]">{phone}</Link>
        </div>
       </div>
      
      <Link href={"/contact"} className="bg-gradient-to-tr text-white font-bold from-[#233b46] to-[#c08987]  p-3 rounded">
        REQUEST A SERVICE
      </Link>

      </nav>
     
    </div>

    <nav className="flex gap-5 d-none bg-[#FF807F] hover:bg-[#d69b9b] text-white font-bold justify-center  p-4 container ">
      <Link className="text-[1.2rem] font-satoshi " href={"/"}>Home</Link> 
      <Link className="text-[1.2rem] font-satoshi " href={"/about"}>About Us</Link> 
     
      <Link className="text-[1.2rem] font-satoshi " href={"/project"}>Project</Link> 
     
      <Link className="text-[1.2rem] font-satoshi " href={"/contact"}>Contact</Link>

      {
        login && admin ? 
        <Link className="text-[1.2rem] font-satoshi " href={"/dashboard"}>Dashboard</Link> 
        :
        <Link className="text-[1.2rem] font-satoshi " href={"/login"}>Login</Link> 
      }

    </nav>
    </div>

    {/* small screen display */}

    <div className="flex justify-between container items-center md:hidden ">
    <Link href={"/"} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <Image
        src={"/logo.jpeg"}
        alt="logo"
        objectFit="cover"
        width={100}
        height={100}
        className="w-full object-cover contrast-100 "
        />
      </Link>

      <button className="" onClick={() => setToggleBar((prev) => !prev)}>
       {toggleBar ?  <X/> : <AlignRight/>}
      </button>

      <div className={` ${toggleBar ? "block animate-menu-in" : "hidden animate-menu-out"} fixed  flex bg-white shadow w-[80%] text-justify text-slate-500 font-medium p-5 min-h-[100vh]  flex-col gap-6 top-0 right-0`}>
      <button className="" onClick={() => setToggleBar((prev) => !prev)}>
       {toggleBar ?  <X/> : <AlignRight/>}
      </button>

      <Link className="text-[1.3rem] after:block after:w-3 after:h-1 after:bg-black " href={"/"}>Home</Link> 
      <Link className="text-[1.3rem] after:block after:w-3 after:h-1 after:bg-black " href={"/about"}>About Us</Link> 
      <Link className="text-[1.3rem] after:block after:w-3 after:h-1 after:bg-black " href={"/"}>Service</Link> 
      <Link className="text-[1.3rem] after:block after:w-3 after:h-1 after:bg-black " href={"/"}>Project</Link> 
      <Link className="text-[1.3rem] after:block after:w-3 after:h-1 after:bg-black " href={"/"}>Our Client</Link> 
      <Link className="text-[1.3rem] after:block after:w-3 after:h-1 after:bg-black " href={"/"}>Contact</Link> 
      </div>
    </div>

  </header>
  );
}

export default Header;



