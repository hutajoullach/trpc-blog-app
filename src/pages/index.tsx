import Head from "next/head";
import Link from "next/link";
import { RouterOutputs, api } from "~/utils/api";

import Navbar from "~/components/navbar";
import PostCard from "~/components/post-card";
import { PageLayout } from "~/components/layout";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { data, isLoading } = api.posts.getAll.useQuery();

  const { user, isSignedIn, isLoaded } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <PageLayout>
        <Navbar />

        <section className="paddings mb-16 flex flex-col items-center justify-start">
          <section className="mt-10 grid w-full grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {data.map(({ post, author }) => (
              <PostCard
                key={`${post?.id}`}
                id={post?.id}
                image={post?.image ? post.image : ""}
                title={post?.title}
                name={author.username}
                avatarUrl={author.profileImageUrl}
                userId={author.id}
                createdAt={post.createdAt}
              />
            ))}
          </section>

          {/* <LoadMore 
        startCursor={data?.projectSearch?.pageInfo?.startCursor} 
        endCursor={data?.projectSearch?.pageInfo?.endCursor} 
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage} 
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      /> */}
        </section>
      </PageLayout>
    </>
  );
}
