"use client"

import "./globals.css";
import "@/components/satoshi.css"
import Provider from "./../../redux/Provider";
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from "react";

import "aos/dist/aos.css"



import aos from "aos"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {

    aos.init({
      duration: 3000,
      easing: "ease-in-out"
    })


    return() =>{
      aos.refresh()
    }

  }, [])

  return (
    <html lang="en">
      
      <body suppressHydrationWarning={true}>
        <Provider>
        
          {children}
          <Toaster/>
        </Provider>
       
      </body>
    </html>
  );
}
