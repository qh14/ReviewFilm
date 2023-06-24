import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../admin/Dashboard";
import NotFound from "../components/pages/NotFound";
import Movies from "../admin/Movies";
import Actors from "../admin/Actors";
import NavbarAdmin from "../admin/Navbar";
import HeaderAdmin from "../admin/HeaderAdmin";

const AdminNavigator = () => {
  return (
    <div className="flex">
      <NavbarAdmin />
      <div className="flex-1 p-2 max-w-screen-lg">
        <HeaderAdmin onAddMovieClick={() => console.log("add movie")} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminNavigator;
