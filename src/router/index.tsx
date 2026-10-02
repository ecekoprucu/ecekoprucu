import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { FrontPage } from "../pages/Front";
import Loader from "../components/Loader";
import NotFoundPage from "../pages/NotFound";
import { WorkPage } from "../pages/Work";
import ScrollToTop from "../components/ScrollToTop";
import CvPage from "../pages/CvPage";
import KonamiCode from "../components/KonamiCode";
import DinoGamePage from "../pages/DinoGame";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <FrontPage />
            </Suspense>
          }
        />
        <Route
          path="/work"
          element={
            <Suspense fallback={<Loader />}>
              <WorkPage />
            </Suspense>
          }
        />
        <Route
          path="cv"
          element={
            <Suspense fallback={<Loader />}>
              <CvPage />
            </Suspense>
          }
        />
        <Route
          path="dinogame"
          element={
            <Suspense fallback={<Loader />}>
              <DinoGamePage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
      <KonamiCode />
    </BrowserRouter>
  );
};
