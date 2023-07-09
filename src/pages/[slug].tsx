import Head from "next/head";
import Image from "next/image";

import { api } from "~/utils/api";

import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";

import { GiBoxTrap } from "react-icons/gi";

const PageNotFound = () => {
  return (
    <div>
      <PageLayout>
        <div className="flex h-full items-center justify-center gap-2 text-slate-100">
          <GiBoxTrap size={20} color="gray" />
          <span>404 Page Not Found</span>
        </div>
      </PageLayout>
    </div>
  );
};

export default PageNotFound;
