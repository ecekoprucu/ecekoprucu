import { Outlet } from "react-router";
import Header from "./Header";

// Layout route: Header stays mounted while the child page in <Outlet /> changes,
// so its underline can animate between items.
export const PageWrapper = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
