import { useRouter } from "next/router";

import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import SinglePostCard from "~/components/posts/single-post-card";
import { LoadingPage } from "../../components/loading";

const SinglePostPage = () => {
  const router = useRouter();
  let id = router.query.id ?? "";
  if (Array.isArray(id)) id = id.join("");

  const { data, isFetching, isError } = api.posts.getById.useQuery(
    {
      id,
    },
    { staleTime: Infinity }
  );

  if (isFetching || !data)
    return (
      <div className="flex h-screen items-center justify-center bg-black text-slate-100">
        <LoadingPage />
      </div>
    );

  if (isError)
    return (
      <div className="flex h-screen items-center justify-center bg-black text-slate-100">
        Page Not Found
      </div>
    );

  return (
    <PageLayout>
      <div className="flex h-full items-center justify-center">
        <SinglePostCard postWithUser={data} />
      </div>
    </PageLayout>
  );
};

export default SinglePostPage;
