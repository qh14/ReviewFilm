/* eslint-disable react/style-prop-object */
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
const HeaderAdmin = ({ onAddMovieClick, onAddActorClick }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const options = [
    { title: "Add movie", onClick: onAddMovieClick },
    { title: "Add actor", onClick: onAddActorClick },
  ];
  return (
    <div>
      <div className="flex items-center justify-between relative">
        <input
          type="text"
          className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white transition bg-transparent rounded text-lg p-1 outline-none"
          placeholder="Search Movies..."
        />
        <button
          onClick={() => setIsShowOption(true)}
          className="flex items-center space-x-2 border-secondary hover:border-primary text-secondary hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>
        <CreateOptions
          visible={isShowOption}
          onClose={() => setIsShowOption(false)}
          options={options}
        />
      </div>
    </div>
  );
};
const CreateOptions = ({ options, visible, onClose }) => {
  const container = useRef();
  const containerID = "create-options";
  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;
      if (parentElement.id === containerID || id === containerID) return;

      if (container.current) {
        if (!container.current.classList.contains("animate-scale"))
          container.current.classList.add("animate-scale-reverse");
      }
    };

    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);
  if (!visible) {
    return null;
  }
  const handleAnimationEnd = (e) => {
    if (e.target.classList.contains("animate-scale-reverse")) {
      onClose();
    }
    e.target.classList.remove("animate-scale");
  };
  return (
    <div
      id={containerID}
      ref={container}
      className="absolute right-0 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={handleAnimationEnd}
    >
      {options.map(({ title, onClick }) => (
        <Option onClick={onClick}>{title}</Option>
      ))}
    </div>
  );
};
const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};

export default HeaderAdmin;
