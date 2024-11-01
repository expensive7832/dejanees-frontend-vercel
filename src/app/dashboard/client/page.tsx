"use client";

import { api, apiwithtoken } from "@/api";
import Loader2 from "@/components/Loader2";
import { useToast } from "@/components/ui/use-toast";
import { Delete, Trash } from "lucide-react";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";

function Client() {
  const [status, setStatus] = useState(false);

  const [allimages, setAllImages] = useState([]);

  const { toast } = useToast();

  async function handleTrustedClient(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(true);
    let form = new FormData(e.currentTarget);

    await apiwithtoken
      .post("/addclient/", form)
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
  async function removeclient(id: any) {
   

    await apiwithtoken
      .delete(`/delclient/${id}`)
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

  useEffect(() => {
    api
      .get("/fetchclient/")
      .then((res) => setAllImages(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* image of trusted partner */}
      <form
        onSubmit={handleTrustedClient}
        className="flex flex-col gap-9 md:w-2/4"
      >
        {/* <!-- Input Fields --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Add Trusted Partner Image
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Image
              </label>
              <input
                type="file"
                name="image"
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

      <div className="grid grid-cols-1 my-10 md:grid-cols-2 lg:grid-cols-3">
        {allimages?.map((img: any) => (
          <div key={img?.id} className="relative">
            <button onClick={() => removeclient(img?.id)} className="absolute top-5 left-1/2 ">
                <Trash color="red"/>
            </button>
            <Image alt="client image" width={200} height={200} src={`${process.env.NEXT_PUBLIC_API_URL}/${img?.image}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Client;
