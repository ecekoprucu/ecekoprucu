import { useTheme } from "../scripts/useTheme";
import type { Theme } from "../context/theme-context";
import type { MouseEvent } from "react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  function apply(theme: Theme) {
    const fromBoot = (
      window as unknown as { applyTheme?: (theme: Theme) => void }
    ).applyTheme;
    if (fromBoot) fromBoot(theme);
    else document.documentElement.setAttribute("data-theme", theme);
  }

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    toggleTheme();

    const next: Theme = theme === "light" ? "dark" : "light";

    const start = (
      document as Document & {
        startViewTransition?: (update: () => void) => {
          ready: Promise<void>;
          finished: Promise<void>;
        };
      }
    ).startViewTransition;

    const box = event.currentTarget.getBoundingClientRect();
    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    document.documentElement.classList.add("theme-switching");
    const transition = start.call(document, () => apply(next));
    transition.finished
      .finally(() =>
        document.documentElement.classList.remove("theme-switching"),
      )
      .catch(() => {});
    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "cubic-bezier(0.65, 0, 0.35, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  };

  return (
    <div className="flex flex-col justify-center ml-3">
      <button
        type="button"
        className={`theme-toggle`}
        role="switch"
        aria-checked={theme === null ? undefined : theme === "dark"}
        onClick={toggle}
      >
        <label className="relative cursor-pointer p-2" htmlFor="light-switch">
          <svg
            className="dark:hidden"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-gray-600"
              d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
            />
            <path
              className="fill-gray-600"
              d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
            />
          </svg>
          <svg
            className="hidden dark:block"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-slate-400"
              d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
            />
            <path
              className="fill-slate-500"
              d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
            />
          </svg>
          <span className="sr-only">Switch to light / dark version</span>
        </label>
      </button>
    </div>
  );
};
