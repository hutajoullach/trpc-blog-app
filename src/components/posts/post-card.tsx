import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";

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

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
type PostWithUser = RouterOutputs["posts"]["getAll"][number];

type PostCardProps = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
  createdAt: Date;
};

const PostCard = ({
  id,
  image,
  title,
  name,
  avatarUrl,
  userId,
  createdAt,
}: PostCardProps) => {
  const router = useRouter();
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");

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

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 10000));
    setRandomViews(
      String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + "k")
    );
  }, []);

  return (
    <div
      key={id}
      onClick={() => router.push(`/post/${id}`)}
      className="drop-shadow-card flex flex-col items-center justify-center rounded-2xl bg-white"
    >
      <Link
        href={`/post/${id}`}
        className="group relative flex h-full w-full items-center justify-center"
      >
        {defaultImg && (
          <Image
            src={image ? image : defaultImg}
            width={414}
            height={314}
            className="h-60 w-auto rounded-2xl object-cover"
            alt="post image"
          />
        )}

        <div className="absolute bottom-0 right-0 flex h-1/3 w-full items-end justify-end gap-2 rounded-b-2xl bg-gradient-to-b from-transparent to-black/50 p-4 text-lg font-semibold text-white">
          <p className="w-full truncate">{title}</p>
        </div>
      </Link>

      <div className="flex w-full flex-col items-center justify-between px-3 py-2 text-sm font-semibold">
        <Link href={`/profile/${userId}`} className="w-full">
          <div className="flex items-center justify-between gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="profile image"
            />
            <span>{`@${name}`}</span>
          </div>
        </Link>

        <div className="flex items-center justify-center gap-3 py-1">
          <span className="truncate text-xs">{dayjs(createdAt).fromNow()}</span>
          <div className="flex items-center justify-center gap-2">
            <BiSolidHeart color="red" />
            <p className="text-xs">{randomLikes}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FiEye color="gray" />
            <p className="text-xs">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
