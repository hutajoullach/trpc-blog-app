import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { RouterOutputs, api } from "~/utils/api";

import Navbar from "~/components/navbar";
import PostCard from "~/components/posts/post-card";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "../components/loading";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

type PostWithUser = RouterOutputs["posts"]["getAll"];

type CardSectionProps = {
  filteredData: PostWithUser | undefined;
  input: string | undefined;
};

const CardSection = ({ filteredData, input }: CardSectionProps) => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <LoadingPage />;

  if (!data)
    return (
      <div className="flex h-full justify-center text-slate-100">
        Something went wrong
      </div>
    );

  if (filteredData !== undefined && filteredData?.length !== 0) {
    return (
      <>
        {filteredData.map(({ post, author }) => (
          <PostCard
            key={`${post?.id}`}
            id={post?.id}
            image={post?.imageSrc ? post.imageSrc : ""}
            title={post?.title}
            name={author.username}
            avatarUrl={author.profileImageUrl}
            userId={author.id}
            createdAt={post.createdAt}
          />
        ))}
      </>
    );
  }

  if (input !== "") {
    return null;

    return (
      <div className="z-1 fixed left-0 top-0 h-full w-full text-slate-100">
        <div className="flex h-full w-full items-center justify-center">
          No match found
        </div>
      </div>
    );
  }

  return (
    <>
      {data?.map(({ post, author }) => (
        <PostCard
          key={`${post?.id}`}
          id={post?.id}
          image={post?.imageSrc ? post.imageSrc : ""}
          title={post?.title}
          name={author.username}
          avatarUrl={author.profileImageUrl}
          userId={author.id}
          createdAt={post.createdAt}
        />
      ))}
    </>
  );
};

export default function Home() {
  const { data, isLoading } = api.posts.getAll.useQuery();
  const { user, isSignedIn, isLoaded } = useUser();

  const [input, setInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState<PostWithUser | undefined>(
    data
  );

  const handleChange = useCallback(
    (value: string) => {
      setInput(value);
    },
    [setInput]
  );

  useEffect(() => {
    if (data && input) {
      const filtered = data.filter((d) => {
        return (
          d.post.title &&
          d.post.title.toLocaleLowerCase().includes(input.toLocaleLowerCase())
        );
      });
      setFilteredData(filtered);
      console.log(filtered);
    }
  }, [data, input]);

  return (
    <>
      <PageLayout>
        <Navbar handleChange={handleChange} />

        <section className="paddings mb-16 flex flex-col items-center justify-start">
          <section className="mt-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <CardSection filteredData={filteredData} input={input} />
          </section>
        </section>
      </PageLayout>
    </>
  );
}
