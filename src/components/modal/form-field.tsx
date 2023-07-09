import React from "react";

type FormFieldProps = {
  type?: string;
  title: string;
  state?: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextArea,
  setState,
}: FormFieldProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-4">
      <label className="w-full text-gray-600">{title}</label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          className="bg-light-white-100 w-full rounded-md bg-slate-200 p-4 outline-0"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          required
          value={state}
          className="bg-light-white-100 w-full rounded-md bg-slate-200 p-4 outline-0"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
