import React from "react";
import {ImSpinner3} from 'react-icons/im'

export const SubmitButton = ({ value,busy }) => {
  return (
    <div>
      <button
        className="w-full dark:bg-white bg-secondary rounded p-2 dark:text-secondary text-white font-semibold text-xl text-center"
        type="submit"
      >
        {busy? <ImSpinner3 className="animate-spin" />:value}
      </button>
    </div>
  );
};
