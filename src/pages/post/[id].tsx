import { useRouter } from "next/router";
import Link from "next/link";

import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "../../components/loading";
import SinglePostCard from "~/components/posts/single-post-card";

import { MdKeyboardArrowLeft } from "react-icons/md";

import { createServerSideHelpers } from "@trpc/react-query/server";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { prisma } from "~/server/db";
import { appRouter } from "~/server/api/root";
import superjson from "superjson";

export const getServerSideProps = async (
  context: GetServerSidePropsContext<{ id: string }>
) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });
  const id = context.params?.id as string;
  /*
   * Prefetching the `post.byId` query.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */
  await helpers.posts.getById.prefetch({ id });
  // Make sure to return { props: { trpcState: helpers.dehydrate() } }
  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

const SinglePostPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { id } = props;

  // const router = useRouter();
  // let id = router.query.id ?? "";
  // if (Array.isArray(id)) id = id.join("");

  const { data, isFetching, isError } = api.posts.getById.useQuery(
    {
      id,
    },
    { staleTime: Infinity }
  );

  if (isFetching || !data)
    return (
      <div className="flex h-full items-center justify-center bg-black text-slate-100">
        <LoadingPage />
      </div>
    );

  if (isError)
    return (
      <div className="flex h-full items-center justify-center bg-black text-slate-100">
        Page Not Found
      </div>
    );

  return (
    <PageLayout>
      <div className="flex h-full items-center justify-center">
        <div className="fixed left-5 top-5">
          <Link href={"/"}>
            <MdKeyboardArrowLeft color="white" size={30} />
          </Link>
        </div>
        <SinglePostCard postWithUser={data} />
      </div>
    </PageLayout>
  );
};

export default SinglePostPage;
