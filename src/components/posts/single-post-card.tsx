import { useEffect, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";

import { toast } from "react-hot-toast";
import { BiSolidHeart } from "react-icons/bi";
import { FiEye } from "react-icons/fi";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import {
  accessoriesBag,
  dessert,
  fishVegetables,
  threeDogs,
} from "../../assets";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
const SinglePostCard = ({ postWithUser }: { postWithUser: PostWithUser }) => {
  const { post, author } = postWithUser;

  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
    );
  }, []);

  const images = [accessoriesBag, dessert, fishVegetables, threeDogs];
  const [defaultImg, setDefaultImg] = useState<StaticImageData | undefined>(
    undefined
  );

  useEffect(() => {
    const random = Math.floor(Math.random() * images.length);
    if (random !== null || random !== undefined) {
      setDefaultImg(images[random]);
    }
  }, [images]);

  return (
    <div className="flex h-full w-full items-center rounded-lg bg-slate-200 px-1 py-3 md:max-w-2xl">
      <div className="flex h-full w-full flex-col gap-4 px-6 py-6">
        <div className="flex w-full flex-col items-center gap-5">
          {post.imageSrc && (
            <div className="h-[180px] overflow-hidden rounded-2xl">
              <Image
                src={post.imageSrc}
                width={650}
                height={20}
                className="object-cover"
                alt="bgImg"
              />
            </div>
          )}
          {!post.imageSrc && defaultImg && (
            <div className="h-[180px] overflow-hidden rounded-2xl">
              <Image src={defaultImg} width={650} height={20} alt="bgImg" />
            </div>
          )}
          <div className="-mt-20 flex w-full rounded-xl px-2">
            <Image
              onClick={() => {
                toast.error("Profile page not available yet!");
              }}
              src={author.profileImageUrl}
              width={45}
              height={45}
              className="cursor-pointer rounded-full border-2 object-cover hover:opacity-80"
              alt=""
            />
            <div className="flex w-full justify-end px-3 py-3 text-sm font-semibold text-neutral-200">
              <div
                onClick={() => {
                  toast.error("Profile page not available yet!");
                }}
                className="cursor-pointer hover:opacity-80"
              >
                @{author.username}
              </div>
            </div>
          </div>

          <div className="text-md flex justify-center font-semibold text-neutral-600"></div>
          <div className="w-full rounded-lg bg-white px-3 py-4 text-sm">
            <p>{post.title}</p>
          </div>
        </div>
        <div
          className={`flex h-full w-full flex-1 rounded-lg bg-white px-3 py-4 text-sm`}
        >
          <p>{post.content}</p>
        </div>

        <div className="flex items-center justify-between gap-3 px-2 py-1">
          <span className="truncate text-xs">
            {dayjs(post.createdAt).fromNow()}
          </span>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-2">
              <BiSolidHeart
                color="red"
                className="cursor-pointer hover:opacity-80"
                onClick={() => {
                  toast.error("Voting article not available yet!");
                }}
              />
              <p className="text-xs">{randomLikes}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiEye color="gray" />
              <p className="text-xs">{randomViews}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostCard;
