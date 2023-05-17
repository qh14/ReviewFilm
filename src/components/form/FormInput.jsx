import React from "react";

export const FormInput = ({name,label, placeholder,...rest}) => {
  return (
    <div className="flex flex-col-reverse">
      <input
        className="bg-transparent rounded border-2 border-dark-subtle w-full text-white outline-none  focus:border-white p-2 peer transition"
        id={name}
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={name}
        className="font-semibold text-dark-subtle peer-focus:text-white transition"
      >
        {label}
      </label>
    </div>
  );
};
