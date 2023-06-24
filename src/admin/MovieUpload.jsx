import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadTrailer } from "../api/movie";
import { useNotification } from "../hook";
import MovieForm from "./MovieForm";

export default function MovieUpload() {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // 0 - 100
  const { updateNotification } = useNotification();
  const [videoInfo, setVideoInfo] = useState({}); // { url, public_id }
  const [movieInfo, setMovieInfo] = useState({
    title: "",
    storyLine: "",
    tags: [],
    cast: [],
    director: "",
    writers: [],
    releaseDate: "",
    poster: null,
    genres: [],
    type: "",
    language: "",
    status: "",
    trailer: {
      url: "",
      public_id: "",
    },
  });

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const getUploadedVideo = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing ...";
    }
    return `Upload ${uploadProgress}%`;
  };

  const uploadTrailerInfo = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );
    if (!error) {
      setVideoUploaded(true);
    }
    setVideoInfo({ url, public_id });
  };
  console.log(videoInfo);
  const handleChange = async (file) => {
    const formData = new FormData();
    formData.append("video", file);
    setVideoSelected(true);
    uploadTrailerInfo(formData);
  };

  return (
    <div className="fixed inset-0 dark:bg-white dark:bg-opacity-50 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[45rem] h-[40rem] overflow-auto p-2">
        <UploadProgress
          visible={!videoUploaded && videoSelected}
          width={uploadProgress}
          message={getUploadedVideo()}
        />

        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
        />
        <MovieForm />
      </div>
    </div>
  );
}

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="h-full flex items-center justify-center">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <div className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center dark:text-dark-subtle text-secondary cursor-pointer">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here!</p>
        </div>
      </FileUploader>
    </div>
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;
  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
      <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="h-full absolute left-0 dark:bg-white bg-secondary"
        />
      </div>
      <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">
        {message}
      </p>
    </div>
  );
};
