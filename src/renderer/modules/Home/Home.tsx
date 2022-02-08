import { Button } from "@nextui-org/react";
import { ReactElement } from "react";
import { Link } from "react-location";
import { routePaths } from "../../utils/routes";

export const Home = (): ReactElement => {
  return (
    <div>
      <h1>electron-react-boilerplate</h1>
      <Button>Click me</Button>
      <div>
        <Link to={routePaths.home} activeOptions={{ exact: true }}>
          Home
        </Link>{" "}
        <Link to={routePaths.newProject}>New Project</Link>
        <Link to={routePaths.definitions}>Definitions</Link>
      </div>
      <hr />

      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};
