import { useEffect } from "react";
import Header from "../components/Header";

export default function NotFoundPage() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const eyes = document.querySelectorAll<HTMLElement>(".eye");

      eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const rad = Math.atan2(e.clientX - cx, e.clientY - cy);
        const rot = (-rad * 180) / Math.PI + 90;

        eye.style.transform = `rotate(${rot}deg)`;
      });
    };

    document.body.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col w-screen h-[calc(100vh_-_3rem)] justify-center items-center bg-gray-200 dark:bg-gray-700">
        <div className="w-[100px] h-[100px] relative text-center">
          <div className="eye rounded-3xl mt-1 h-[50px] w-[50px] inline-block text-center relative bg-white  after:absolute after:w-3 after:h-3 after:bg-black after:rounded-4xl"></div>
          <div className="eye rounded-3xl mt-1 h-[50px] w-[50px] inline-block text-center relative bg-white after:absolute after:w-3 after:h-3 after:bg-black after:rounded-4xl"></div>
        </div>
        <h1 className="text-gray-600 dark:text-gray-200 text-center">
          Page Not Found
        </h1>
      </div>
    </>
  );
}
