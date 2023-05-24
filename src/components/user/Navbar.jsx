import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Container } from "../Container";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../../hook";

function Navbar() {
  const { toggleTheme } = useTheme();
  const { authInfo, handleLogout } = useAuth();
  const { isLogIn } = authInfo;
  return (
    <div className="bg-primary shadow-sm shadow-slate-500">
      <Container className=" text-white p-3 ">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="./logo.png" alt="Logo" className="h-10" />
          </Link>
          <ul className="flex items-center space-x-5">
            <li>
              <button onClick={toggleTheme}>
                <BsFillSunFill
                  className="bg-dark-subtle p-1 rounded"
                  size={28}
                />
              </button>
            </li>
            <li>
              <input
                type="text"
                className="border-2 border-dask-subtle p-1 rounded bg-transparent text-xl outl
             focus:border-white-transition text-white"
                placeholder="seach...."
              />
            </li>
            <li>
              {isLogIn ? (
                <button className="text-white font-semibold text-lg" onClick={handleLogout}>
                  Log out
                </button>
              ) : (
                <Link to="/login" className="text-white font-semibold text-lg">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
