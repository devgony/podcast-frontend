import {
  BrowserRouter as Router,
  useHistory,
  Route,
  Switch,
} from "react-router-dom";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const LoggedInRouter = () => {
  return (
    <Router>
      <h1>Logged In</h1>
      <Logout />
    </Router>
  );
};

const Logout = () => {
  const history = useHistory();
  const logout = () => {
    localStorage.setItem(LOCALSTORAGE_TOKEN, "");
    window.location.reload();
    // history.push("/");
  };
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
