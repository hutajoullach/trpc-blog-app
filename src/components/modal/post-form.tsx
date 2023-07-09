import React from "react";
import { useRouter } from "next/navigation";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import usePostFormModal from "~/store/post-form-modal-store";

import CustomButton from "../custom-button";
import FormField from "./form-field";

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
      // setStep(STEPS.GEOLOCATION);
      // setSelectedIconType("emoji");
      // setPickedColor("#000000");

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
      image: "",
    },
  });

  const title = watch("title");
  const content = watch("content");
  const image = watch("image");

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

    mutate({
      title: data.title,
      content: data.content,
      image: "",
    });
  };

  if (!user) return null;

  return (
    <form className="mx-auto flex w-full max-w-6xl flex-col items-center justify-start gap-1 pt-4 text-lg lg:pt-4">
      {/* <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="z-20 object-contain sm:p-10"
            alt="image"
            fill
          />
        )}
      </div> */}

      <FormField
        id="title"
        title="Title"
        // state={form.title}
        placeholder="Title"
        // onClick={(title) => setCustomValue("title", title)}
        // setState={(value) => handleStateChange("title", value)}
        disabled={isPosting}
        register={register}
        errors={errors}
      />

      <FormField
        id="content"
        title="Body"
        // state={form.description}
        placeholder="Body"
        isTextArea
        // setState={(value) => handleStateChange("description", value)}
        disabled={isPosting}
        register={register}
        errors={errors}
      />

      {/* <FormField
        type="url"
        title=""
        state={form.liveSiteUrl}
        placeholder=""
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      /> */}

      {/* <FormField
        type="url"
        title=""
        state={form.githubUrl}
        placeholder=""
        setState={(value) => handleStateChange("githubUrl", value)}
      /> */}

      {/* <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      /> */}

      <div className="flex w-full items-center justify-start pt-6">
        <CustomButton
          type="submit"
          title="Post"
          styles="bg-[#1dc071] py-2"
          handleClick={handleSubmit(onSubmit)}
        />
      </div>
    </form>
  );
};

export default PostForm;
