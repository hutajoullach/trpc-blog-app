import React from "react";
import { useRouter } from "next/navigation";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import usePostFormModal from "~/store/post-form-modal-store";

import CustomButton from "../inputs/custom-button";
import FormField from "./form-field";
import ImageUpload from "../inputs/image-upload";

import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const PostForm = () => {
  const router = useRouter();
  const { user } = useUser();

  const postFormModal = usePostFormModal();

  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      toast.success("posted successfully!");
      reset();
      postFormModal.onClose();
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      toast.error("Failed to post! Please try again later.");
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      content: "",
      imageSrc: "",
    },
  });

  const title = watch("title");
  const content = watch("content");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!user) {
      toast.error("login to the app and try again!");
      return null;
    }

    console.log(data.imageSrc);

    mutate({
      title: data.title,
      content: data.content,
      imageSrc: data.imageSrc,
    });
  };

  if (!user) return null;

  return (
    <form className="mx-auto flex w-full max-w-6xl flex-col items-center justify-start gap-1 pt-4 text-lg lg:pt-4">
      <FormField
        id="title"
        title="Title"
        placeholder="Title"
        disabled={isPosting}
        register={register}
        errors={errors}
      />

      <FormField
        id="content"
        title="Body"
        placeholder="Body"
        isTextArea
        disabled={isPosting}
        register={register}
        errors={errors}
      />

      <ImageUpload
        onChange={(value) => setCustomValue("imageSrc", value)}
        value={imageSrc}
      />

      <div className="flex w-full items-center justify-start pt-6">
        <CustomButton
          type="submit"
          title="Post"
          styles="bg-[#1dc071] py-2 px-8"
          handleClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
};

export default PostForm;
