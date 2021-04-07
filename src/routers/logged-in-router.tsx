import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { NavBar } from "../components/nav-bar";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { NotFound } from "../pages/404";
import { Podcasts } from "../pages/podcasts";
import { Episodes } from "../pages/episodes";
import { Categories } from "../pages/categories";
import { Category } from "../pages/category";
import { Upload } from "../pages/upload";

export const LoggedInRouter = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <div className="bg-gray-200 min-h-screen">
          <div className="bg-white max-w-screen-lg mx-auto min-h-screen">
            <Switch>
              <Route path="/" exact>
                <Podcasts />
              </Route>
              <Route path="/podcast/:id" exact>
                <Episodes />
              </Route>
              <Route path="/categories" exact>
                <Categories />
              </Route>
              <Route path="/category/:slug" exact>
                <Category />
              </Route>
              <Route path="/upload" exact>
                <Upload />
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
