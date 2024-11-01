"use client";

import "./css/style.css";
import React, { useEffect, useState, createContext } from "react";
import Loader from "@/components/Loader";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";


import { api, apiwithtoken } from "@/api";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode | any;
}>) {
  

const router = useRouter();


  return (
    
    <div>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <DefaultLayout>{children}</DefaultLayout>
        </div>
      </div>
  
  );
}
