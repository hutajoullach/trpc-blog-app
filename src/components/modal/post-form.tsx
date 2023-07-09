import React from "react";
import { useRouter } from "next/navigation";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

import CustomButton from "../custom-button";
import FormField from "./form-field";

const PostForm = () => {
  const router = useRouter();

  const { user } = useUser();

  if (!user) return null;

  return (
    <form
      // onSubmit={handleFormSubmit}
      className="mx-auto flex w-full max-w-6xl flex-col items-center justify-start gap-1 pt-4 text-lg lg:pt-4"
    >
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
        title="Title"
        // state={form.title}
        placeholder="Title"
        setState={(value) => handleStateChange("title", value)}
      />

      <FormField
        title="Body"
        // state={form.description}
        placeholder="Body"
        isTextArea
        setState={(value) => handleStateChange("description", value)}
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
          handleClick={() => {
            // post blog
          }}
        />
      </div>
    </form>
  );
};

export default PostForm;
