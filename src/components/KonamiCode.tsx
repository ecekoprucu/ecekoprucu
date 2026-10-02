import { useCallback, useEffect, useState } from "react";
import confetti from "canvas-confetti";

const code = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

export default function KonamiCode() {
  const [position, setPosition] = useState(0);

  const frame = useCallback((end: number) => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 100,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: colors,
      shapes: ["star"],
    });
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: colors,
      shapes: ["star"],
    });

    requestAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleKey = (e: { key: string }) => {
      if (
        e.key === code[position] ||
        (e.key === "B" && position === 8) ||
        (e.key === "A" && position == 9)
      ) {
        setPosition(position + 1);
        if (position + 1 === code.length) {
          frame(Date.now() + 1.5 * 1000);

          setPosition(0);
        }
      } else {
        setPosition(0);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [position, frame]);

  return <div />;
}
