import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const Logout = () => {
  const logout = () => {
    localStorage.setItem(LOCALSTORAGE_TOKEN, "");
    authTokenVar("");
    isLoggedInVar(false);
  };
  return (
    <div className="flex flex-col items-center">
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
