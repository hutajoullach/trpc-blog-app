import React from "react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

import usePostFormModal from "~/store/post-form-modal-store";
import CustomButton from "./custom-button";

import { toast } from "react-hot-toast";
import { AiOutlineSearch } from "react-icons/ai";
import { GoSignIn } from "react-icons/go";
import { FaBloggerB } from "react-icons/fa6";
import { BiSolidUserAccount } from "react-icons/bi";

const Navbar = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();

  const postFormModal = usePostFormModal();

  return (
    <div className="mb-[25px] flex h-[55px] flex-col-reverse items-center justify-between gap-6 py-2 md:flex-row">
      <div className="flex h-[35px] max-w-[458px] flex-row rounded-[100px] bg-[#1c1c24] py-1 pl-4 pr-2 lg:flex-1">
        <input
          type="text"
          placeholder="Search for posts"
          className="font-epilogue flex w-full bg-transparent text-[14px] font-normal text-white outline-none placeholder:text-[#4b5264]"
        />

        <div className="flex h-full w-[30px] cursor-pointer items-center justify-center rounded-[20px] bg-[#4acd8d]">
          <AiOutlineSearch color="white" size={20} />
        </div>
      </div>

      <div className="hidden flex-row justify-end gap-4 sm:flex">
        <CustomButton
          type="button"
          title="Create Post"
          styles="bg-[#1dc071]"
          handleClick={() => {
            if (!isSignedIn) {
              toast.error("Please login to post an article.");
              return;
            }
            postFormModal.onOpen();
          }}
        />

        {!isSignedIn && (
          <div className="cursor-pointer">
            <div className=" flex h-10 w-10 items-center justify-center rounded-xl bg-slate-300 hover:bg-slate-400">
              <Link href={"/signin/"}>
                <div className="mt-1">
                  <BiSolidUserAccount size={30} color="black" />
                </div>
              </Link>
            </div>
          </div>
        )}

        {!!isSignedIn && (
          <div className="flex cursor-pointer items-center gap-1 text-xs">
            <UserButton />
          </div>
        )}
      </div>

      {/* small screen nav */}
      <div className="relative flex items-center justify-between px-3 sm:hidden">
        <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-[10px] bg-[#2c2f32]">
          <FaBloggerB />
        </div>

        <div className="mx-4 flex">
          <CustomButton
            type="button"
            title="Create Post"
            styles="bg-[#1dc071]"
            handleClick={() => {
              if (!isSignedIn) {
                toast.error("Please login to post an article.");
                return;
              }
              postFormModal.onOpen();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
