import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { NavBar } from "../components/nav-bar";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { NotFound } from "../pages/404";
import { Home } from "../pages/home";
import { Podcast } from "../pages/podcast";

export const LoggedInRouter = () => {
  return (
    <div>
      <NavBar />
      <div className="bg-gray-200 min-h-screen">
        <div className="bg-white max-w-screen-lg m-auto min-h-screen">
          <Router>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/podcast/:id" exact>
                <Podcast />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
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
