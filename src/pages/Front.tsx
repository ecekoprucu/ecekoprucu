import { useEffect } from "react";
import { useTheme } from "../scripts/useTheme";
import initStarfield from "../scripts/createConnectingDots";
import { Typewriter } from "../components/Typewriter";
import Header from "../components/Header";
import { AboutPage } from "./About";

export const FrontPage = () => {
  const { theme } = useTheme();

  const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);

  useEffect(() => {
    initStarfield("canvas", isMobileDevice ? 50 : 250, theme === "dark");
  }, [theme, isMobileDevice]);

  return (
    <div className="w-screen h-screen">
      <div className="relative justify-center items-center flex">
        <canvas
          id="canvas"
          className="bg-gray-300 dark:bg-gray-600 h-screen w-screen"
        />
        <h1 className="absolute text-center font-kranky text-gray-600 dark:text-neutral-100 text-shadow-lg text-shadow-neutral-800 dark:text-shadow-neutral-100">
          <Typewriter
            text="Ece Köprücü - React Front End Developer"
            delay={75}
          />
        </h1>
      </div>
      <Header />
      <AboutPage />
    </div>
  );
};
