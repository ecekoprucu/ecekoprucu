import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeToggle } from "./ThemeToggle";

import { useCallback, useMemo, useState, type MouseEvent } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router";

export default function Header() {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const [activeId, setActiveId] = useState<string>(
    pathname === "/" ? "about" : pathname.substring(1)
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sections = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "work", label: "Work" },
      { id: "cv", label: "CV" },
    ],
    []
  );

  const onClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) {
        if (id === "about") {
          navigate("/");
        } else {
          navigate(`/${id}`);
        }
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [navigate]
  );

  return (
    <header className="sticky flex justify-start w-screen items-center h-12 bg-gray-100 dark:bg-gray-900">
      <ThemeToggle />
      <nav className="ml-auto max-w-3xl px-2 relative">
        <ul className="hidden h-14 items-center gap-6 md:flex">
          {sections.map(({ id, label }) => {
            const isActive = activeId === id;
            return (
              <li key={id}>
                <button
                  onClick={(e) => {
                    setActiveId(id);
                    onClick(e, id);
                  }}
                  className={
                    "relative inline-block rounded-xl px-1.5 py-1 text-sm font-medium outline-none cursor-pointer"
                  }
                >
                  <span className="relative text-gray-600 dark:text-gray-200">
                    {label}
                    <span
                      className={
                        "pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-gray-600 dark:bg-gray-200 transition-transform duration-300 " +
                        (isActive ? "scale-x-100" : "")
                      }
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <button
          className="text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center md:hidden"
          type="button"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <FontAwesomeIcon
            icon={faBars}
            className="text-gray-600 dark:text-slate-400"
          />
        </button>
        {dropdownOpen && (
          <div className="absolute z-10 bg-gray-200 divide-y right-0 divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {sections.map(({ id, label }) => {
                const isActive = activeId === id;
                return (
                  <li key={id}>
                    <button
                      onClick={(e) => {
                        setActiveId(id);
                        onClick(e, id);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <span className="relative text-gray-600 dark:text-gray-200">
                        {label}
                        <span
                          className={
                            "pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-gray-600 dark:bg-gray-200 transition-transform duration-300 " +
                            (isActive ? "scale-x-100" : "")
                          }
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
