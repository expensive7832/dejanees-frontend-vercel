import { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "./../../components/ClickOutside";
import { useContext } from "react";
import { FaCar } from "react-icons/fa6";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader2 from "@/components/Loader2";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { isLogout } from "../../../../../redux/Slices/UserSlices";

import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";


const DropdownUser = () => {
  const { toast } = useToast();

  const user = useAppSelector((state) => state.user.userData)

  const router = useRouter()

  const dispatch = useDispatch()

  const handleLogout = () =>{
    dispatch(isLogout())

    router.replace("/sign-in")

  }

  const [status, setStatus] = useState(false);


  const [dropdownOpen, setDropdownOpen] = useState(false);

  

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.first_name}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full">
          {/* <Image
            width={55}
            height={55}
            src={stor}
            className="h-12 w-12 rounded-full"
            alt="User"
          /> */}
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </div>

      
    </ClickOutside>
  );
};

export default DropdownUser;
