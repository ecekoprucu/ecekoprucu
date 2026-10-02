import { useEffect, useState } from "react";
import { useTheme } from "../scripts/useTheme";
import initStarfield from "../scripts/createConnectingDots";
import { Typewriter } from "../components/Typewriter";
import Header from "../components/Header";
import { AboutPage } from "./About";
import Loader from "../components/Loader";

export const FrontPage = () => {
  const { theme } = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      initStarfield("canvas", isMobileDevice ? 50 : 250, theme === "dark");
    }
  }, [theme, isMobileDevice, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center bg-gray-300 dark:bg-gray-600 items-center w-screen h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
      <div className="relative justify-center items-center flex">
        <canvas
          id="canvas"
          className="bg-gray-300 dark:bg-gray-600 h-screen w-screen"
        />
        <h1 className="absolute font-kranky text-gray-600 dark:text-neutral-100 text-shadow-lg text-shadow-neutral-100 dark:text-shadow-neutral-800">
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
