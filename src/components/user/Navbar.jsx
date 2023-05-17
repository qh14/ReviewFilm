import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Container } from "../Container";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-primary shadow-sm shadow-slate-500">
      <Container className=" text-white p-3 ">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="./logo.png" alt="Logo" className="h-10" />
          </Link>
          <ul className="flex items-center space-x-5">
            <li>
              <BsFillSunFill className="bg-dark-subtle p-1 rounded" size={28} />
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dask-subtle p-1 rounded bg-transparent text-xl outl
             focus:border-white-transition text-white"
                placeholder="seach...."
              />
            </li>

            <li className="text-white font-semibold text-lg">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
