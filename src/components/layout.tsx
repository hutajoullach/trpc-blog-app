import type { PropsWithChildren } from "react";

import Navbar from "~/components/navbar";
import Modal from "./modal/modal";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full px-8 py-5">
        <Navbar />
        <Modal />
        <div className="h-full w-full px-4">{props.children}</div>
      </div>
    </main>
  );
};
