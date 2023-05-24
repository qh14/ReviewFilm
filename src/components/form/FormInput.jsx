import React from "react";

export const FormInput = ({name,label, placeholder,...rest}) => {
  return (
    <div className="flex flex-col-reverse">
      <input
        className="bg-transparent rounded border-2 dark:border-dark-subtle border-light w-full dark:text-white text-black outline-none  dark:focus:border-white border-dark-subtle  p-2 peer transition"
        id={name}
        placeholder={placeholder}
        {...rest}
      />
      <label
        htmlFor={name}
        className="font-semibold dark:text-dark-subtle text-secondary dark:peer-focus:text-white  text-dark-subtle transition"
      >
        {label}
      </label>
    </div>
  );
};
