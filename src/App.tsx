import { ReactElement } from "react";
import { Link, Outlet, ReactLocation, Router } from "react-location";
import { definitionsRoute } from "./modules/Definitions";
import { homeRoute } from "./modules/Home";
import { loginRoute } from "./modules/Login";

const location = new ReactLocation();

export const App = (): ReactElement => {
  return (
    // Build our routes and render our router
    <Router
      location={location}
      routes={[homeRoute, definitionsRoute, loginRoute]}
    >
      <div>
        <Link to="/" activeOptions={{ exact: true }}>
          Home
        </Link>{" "}
        <Link to="posts">Posts</Link>
      </div>
      <hr />
      <Outlet /> {/* Start rendering router matches */}
    </Router>
  );
};
