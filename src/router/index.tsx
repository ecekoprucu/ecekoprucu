import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { FrontPage } from "../pages/Front";
import { PageLoader } from "../components/Loader";
import NotFoundPage from "../pages/NotFound";
import { WorkPage } from "../pages/Work";
import ScrollToTop from "../components/ScrollToTop";
import KonamiCode from "../components/KonamiCode";
import DinoGamePage from "../pages/DinoGame";
import { PageWrapper } from "../components/PageWrapper";

const CvPage = lazy(() => import("../pages/CvPage"));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <FrontPage />
            </Suspense>
          }
        />
        <Route element={<PageWrapper />}>
          <Route
            path="/work"
            element={
              <Suspense fallback={<PageLoader />}>
                <section id="work">
                  <WorkPage />
                </section>
              </Suspense>
            }
          />
          <Route
            path="cv"
            element={
              <Suspense fallback={<PageLoader />}>
                <CvPage />
              </Suspense>
            }
          />
          <Route
            path="dinogame"
            element={
              <Suspense fallback={<PageLoader />}>
                <DinoGamePage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
      <KonamiCode />
    </BrowserRouter>
  );
};
