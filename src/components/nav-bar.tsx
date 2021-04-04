import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import Logo from "../images/logo-white.png";

interface IFormProps {
  searchTerm: string;
}

export const NavBar = () => {
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const history = useHistory();
  const logout = () => {
    setIsMenuOpened(false);
    localStorage.setItem(LOCALSTORAGE_TOKEN, "");
    authTokenVar("");
    isLoggedInVar(false);
    history.push("/");
  };
  return (
    <div className="bg-gray-700 ">
      <div className="max-w-screen-lg m-auto h-11 flex text-gray-200">
        <Link
          to="/"
          className="w-20 flex justify-center bg-gradient-to-b from-podGradStart to-podGradEnd"
        >
          <img src={Logo} className="transform scale-75" alt="Podcast" />
        </Link>
        <Link
          to="/"
          className="hover:text-white flex justify-center items-center w-24"
        >
          Home
        </Link>
        <Link
          to="/categories"
          className="hover:text-white flex justify-center items-center w-24 border-l border-r border-black"
        >
          Category
        </Link>
        <Link
          to="/library"
          className="hover:text-white flex justify-center items-center w-24 border-r border-black"
        >
          Library
        </Link>
        <div className="flex justify-center items-center flex-1">
          <input
            ref={register({ required: true })}
            name="searchTerm"
            type="Search"
            className="input rounded-md border-0 h-3/4 w-11/12"
            placeholder="Saerch Podcasts..."
          />
        </div>
        <Link
          to="/upload"
          className="hover:text-white flex justify-center items-center w-24"
        >
          Upload
        </Link>
        <div className="flex justify-center items-center w-24 relative">
          <div className="flex justify-center items-center w-12 ">🔔</div>
          <div className="flex justify-center items-center w-12 ">
            <svg
              role="menu"
              onClick={() => {
                setIsMenuOpened((prev) => !prev);
              }}
              className="w-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <div
            className={`${
              isMenuOpened ? "block" : "hidden"
            } absolute top-11 bg-gray-700 w-full text-center h-20 flex flex-col justify-around`}
          >
            <Link
              role="edit-profile"
              to="edit-profile"
              onClick={() => {
                setIsMenuOpened((prev) => !prev);
              }}
              className="hover:text-white"
            >
              Edit Profile
            </Link>
            <div
              role="logout"
              onClick={logout}
              className="hover:text-white cursor-pointer"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
