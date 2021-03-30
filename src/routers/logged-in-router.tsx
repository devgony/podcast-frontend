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
      <Router>
        <NavBar />
        <div className="bg-gray-200 min-h-screen">
          <div className="bg-white max-w-screen-lg mx-auto min-h-screen">
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
          </div>
        </div>
      </Router>
    </div>
  );
};
