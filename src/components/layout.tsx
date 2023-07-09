import type { PropsWithChildren } from "react";

import Modal from "./modal/modal";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <Modal />
      <div className="h-full w-full px-4 md:max-w-6xl">{props.children}</div>
    </main>
  );
};
