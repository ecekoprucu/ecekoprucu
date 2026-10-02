import { useCallback, useEffect, useRef } from "react";
import Header from "../components/Header";

export default function DinoGamePage() {
  const dinoRef = useRef<HTMLDivElement>(null);
  const obstacleRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);

  const gameOverRef = useRef(false);
  const positionRef = useRef(0);
  const heightRef = useRef(0);
  const pointsRef = useRef(0);

  const isJumpingRef = useRef(false);
  const jumpIntervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const jump = useCallback(() => {
    const dino = dinoRef.current;
    if (!dino || gameOverRef.current || isJumpingRef.current) return;

    isJumpingRef.current = true;

    const fall = () => {
      const dinoDown = setInterval(() => {
        heightRef.current -= 20;
        if (heightRef.current < 1) {
          clearInterval(dinoDown);
          isJumpingRef.current = false;
        }
        dino.style.bottom = heightRef.current + "px";
      }, 50);

      jumpIntervalRef.current = dinoDown;
    };

    const dinoUp = setInterval(() => {
      heightRef.current += 20;
      if (heightRef.current > 100) {
        clearInterval(dinoUp);
        fall();
      }
      dino.style.bottom = heightRef.current + "px";
    }, 50);

    jumpIntervalRef.current = dinoUp;
  }, []);

  useEffect(() => {
    return () => clearInterval(jumpIntervalRef.current);
  }, []);

  useEffect(() => {
    const obstacle = obstacleRef.current;
    const point = scoreRef.current;

    if (!obstacle || !point) return;
    const obstacleMove = setInterval(() => {
      if (positionRef.current === 600) {
        positionRef.current = 0;
        obstacle.style.right = positionRef.current + "px";
      }

      if (heightRef.current < 75 && positionRef.current > 525) {
        alert("Game Over");
        gameOverRef.current = true;
        clearInterval(obstacleMove);
        return;
      }

      positionRef.current += 10;
      obstacle.style.right = positionRef.current + "px";
    }, 20);

    const raisePoints = setInterval(() => {
      if (gameOverRef.current) {
        clearInterval(raisePoints);
        return;
      }
      pointsRef.current += 20;
      point.innerHTML = pointsRef.current.toString();
    }, 100);

    return () => {
      clearInterval(obstacleMove);
      clearInterval(raisePoints);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) jump();
    };
    const onTouchStart = () => jump();

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("touchstart", onTouchStart);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("touchstart", onTouchStart);
    };
  }, [jump]);

  return (
    <>
      <Header />
      <div className="font-poppins w-screen h-[calc(100vh_-_3rem)] bg-gray-200 dark:bg-gray-700 px-3 py-6 flex flex-col items-center justify-center gap-10">
        <div className="block md:hidden">
          <p className="text-center text-3xl font-poppins mt-5">
            It's not mobile ready yet
          </p>
        </div>
        <div className="hidden md:block">
          <div className="w-[600px] h-[300px] border border-black dark:border-white relative m-auto overflow-hidden">
            <div
              className="h-[75px] w-[75px] bg-[url('assets/dinosaur.png')] bg-cover absolute z-2 bottom-0"
              ref={dinoRef}
            ></div>
            <div
              className="h-[50px] w-[25px] bg-violet-500 absolute z-1 bottom-0 right-0"
              ref={obstacleRef}
            ></div>
          </div>
          <div
            ref={scoreRef}
            className="text-center text-3xl font-poppins mt-5 text-black dark:text-white"
          >
            0
          </div>
        </div>
      </div>
    </>
  );
}
