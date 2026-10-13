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
import { PageWrapper } from "../components/PageWrapper";

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
        <Route element={<PageWrapper />}>
          <Route
            path="/work"
            element={
              <Suspense fallback={<Loader />}>
                <section id="work">
                  <WorkPage />
                </section>
              </Suspense>
            }
          />
          <Route
            path="cv"
            element={
              <Suspense fallback={<Loader />}>
                <div style={{ height: "calc(100vh - 48px)", width: "100vw" }}>
                  <CvPage />
                </div>
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
        </Route>
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
