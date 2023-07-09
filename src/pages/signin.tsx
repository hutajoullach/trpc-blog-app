import { type NextPage } from "next";
import { SignIn } from "@clerk/nextjs";

import { PageLayout } from "~/components/layout";

const Signin: NextPage = () => (
  <PageLayout>
    <div className="flex h-full w-full items-center justify-center">
      <SignIn
        path="/signin"
        routing="path"
        signUpUrl="/signup"
        redirectUrl="/"
      />
    </div>
  </PageLayout>
);

export default Signin;
