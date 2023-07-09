import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import usePostFormModal from "~/store/post-form-modal-store";
import PostForm from "./post-form";

import { MdClose } from "react-icons/md";

const Modal = () => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const postFormModal = usePostFormModal();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current) {
        postFormModal.onClose();
      }
    },
    [overlay]
  );

  if (!postFormModal.isOpen) return null;

  return (
    <div
      ref={overlay}
      onClick={(e) => handleClick(e)}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none"
    >
      <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto">
        <div
          className={`translate h-full duration-300
          ${postFormModal.isOpen ? "translate-y-0" : "translate-y-full"}
          ${postFormModal.isOpen ? "opacity-100" : "opacity-0"}`}
        >
          <div className="translate z-53 relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
            <div className="relative flex items-center justify-center rounded-t p-6">
              <button
                type="button"
                onClick={() => {
                  postFormModal.onClose();
                }}
                className="absolute right-8 top-4"
              >
                <MdClose
                  size={30}
                  color="black"
                  onClick={() => {
                    postFormModal.onClose();
                  }}
                />
              </button>

              <div
                ref={wrapper}
                className="flex h-[95%] w-full flex-col items-center justify-start overflow-auto rounded-t-3xl bg-white px-20 py-6"
              >
                <h3 className="modal-head-text">Create a New Post</h3>
                <PostForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
