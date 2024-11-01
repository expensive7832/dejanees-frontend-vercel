"use client";

import {api} from "@/api";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { isLogin } from "../../../../redux/Slices/UserSlices";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader2 from "@/components/Loader2";
import { GoLock } from "react-icons/go";
import { AiOutlineMail } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "@/components/Header";

type Props = {};

function Login({}: Props) {
  const dispatch = useDispatch();

  const router = useRouter();

  const { toast } = useToast();

  const [status, setstatus] = useState(false);
  const [status2, setstatus2] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setstatus(true);

    e.preventDefault();

    const form = new FormData(e.currentTarget);

    await api
      .post(`/login/`, form)
      .then((res) => {
        
        dispatch(isLogin(res.data));
        router.replace("/");
      })
      .catch((err) => {
        toast({ title: err.response.data, variant: "destructive" });
      })
      .finally(() =>  setstatus(false))
  };

  const handleVerifyEmail = async (e: FormEvent<HTMLFormElement>) => {
    setstatus2(true);

    e.preventDefault();

    const form = new FormData(e.currentTarget);

    await api
      .post(`/forgetpassword/`, form)
      .then((res) => {
        

        
        router.replace(`/forgetpassword?email=${res.data}`,);
      
      })
      .catch((err) => {
        console.log(err);
        
        toast({ title: err.response.data, variant: "destructive" });

        setstatus(false);
      })
      .finally(() => setstatus2(false))
  };

  return (
    <><Header/>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="px-26 py-17.5 text-center">
            <Link className="mb-5.5 inline-block" href="/">
              <Image
                
              src={"/logo.jpeg"}
              alt="Logo"
              width={200}
              height={200}
              className="h-32 w-full"
              />
            </Link>

            
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="identity"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                    <AiOutlineMail size={28} />
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-4">
                    <GoLock size={28} />
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-[#0CB6FC] bg-[#0CB6FC] p-4 text-white transition hover:bg-opacity-90"
                >
                  {status && <Loader2 />}
                  Sign In
                </button>
              </div>

            </form>

            <div className="mt-6 text-center">
                <p>
                  forget your password?{" "}
                  <Dialog>
                    <DialogTrigger className="text-primary">click here</DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enter Your Email</DialogTitle>
                        <DialogDescription>
                          <form onSubmit={handleVerifyEmail}>
                            <input
                              type="email"
                              name="email"
                              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />

                            <div className="mt-5">
                              <button
                                type="submit"
                                className="flex cursor-pointer items-center justify-center rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                              >
                                {status2 && <Loader2 />}
                                Submit
                              </button>
                            </div>
                          </form>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </p>
              </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
