import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const LoggedInRouter = () => {
  return (
    <div>
      <h1 className="text-center">Logged In</h1>
      <Logout />
    </div>
  );
};

const Logout = () => {
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
