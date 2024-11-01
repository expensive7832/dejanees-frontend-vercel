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
} from "@/components/ui/dialog";
import Loader from "@/components/Loader";

const Contact = () => {
  const router = useRouter();

  const [status, setStatus] = useState(false);
  const [status2, setStatus2] = useState(false);

  const [staff, setStaff] = useState<any>(null);

  const [toggleupdate, settoggleupdate] = useState(false);
  const [toggledelete, settoggledelete] = useState(false);

  const { toast } = useToast();

  async function handlePhone(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(true);
    let form = new FormData(e.currentTarget);

    await apiwithtoken
      .post("/phone/", form)
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
  async function handleAddress(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(true);
    let form = new FormData(e.currentTarget);

    await apiwithtoken
      .post("/address/", form)
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
  


 

  async function handleDelete(id: number) {
    setStatus2(true);
    await apiwithtoken
      .delete(`/deleteuser/${id}`)
      .then((res) => window.location.reload())
      .catch((err) => console.log(err))
      .finally(() => setStatus2(false));
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* handle phone */}
        <form onSubmit={handlePhone} className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Phone Number
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="enter phone number"
                  name="phone"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button className="flex items-center rounded-md bg-blue-500 p-4 font-bold text-white">
                {status && <Loader2 />}
                ADD PHONE
              </button>
            </div>
          </div>
        </form>

        {/* address */}

        <form onSubmit={handleAddress} className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Address
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  street
                </label>
                <input
                  type="text"
                  placeholder="enter street"
                  name="street"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  city
                </label>
                <input
                  type="text"
                  placeholder="enter city i.e lagos, Nigeria"
                  name="city"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button className="flex items-center rounded-md bg-blue-500 p-4 font-bold text-white">
                {status && <Loader2 />}
                CREATE
              </button>
            </div>
          </div>
        </form>

       

      </div>
    </>
  );
};

export default Contact;
