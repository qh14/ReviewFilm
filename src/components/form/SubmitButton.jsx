import React from "react";

export const SubmitButton = ({ value }) => {
  return (
    <div>
      <input
        className="w-full dark:bg-white bg-secondary rounded p-2 dark:text-secondary text-white font-semibold text-xl text-center"
        value={value}
        type="submit"
      />
    </div>
  );
};
