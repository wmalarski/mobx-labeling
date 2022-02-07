import { ReactElement } from "react";
import { HomeHeader } from "./HomeHeader/HomeHeader";

export const Home = (): ReactElement => {
  return (
    <div>
      <HomeHeader />
      <p>Home</p>
    </div>
  );
};
