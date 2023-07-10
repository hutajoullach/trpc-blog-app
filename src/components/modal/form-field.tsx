import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type FormFieldProps = {
  type?: string;
  id: string;
  title: string;
  placeholder: string;
  isTextArea?: boolean;
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
};

const FormField = ({
  type,
  id,
  title,
  placeholder,
  isTextArea,
  required,
  disabled,
  register,
  errors,
}: FormFieldProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-4">
      <label className="w-full text-gray-600">{title}</label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          disabled={disabled}
          className="bg-light-white-100 w-full rounded-md bg-slate-200 p-4 outline-0"
          rows={5}
          {...register(id, { required })}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          disabled={disabled}
          required
          className="bg-light-white-100 w-full rounded-md bg-slate-200 p-4 outline-0"
          {...register(id, { required })}
        />
      )}
    </div>
  );
};

export default FormField;
