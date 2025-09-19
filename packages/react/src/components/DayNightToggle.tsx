import { useEffect, useRef } from "react";

export function DayNightToggle() {
  const darkIconRef = useRef<SVGSVGElement | null>(null);
  const lightIconRef = useRef<SVGSVGElement | null>(null);

  const systemIsDark =
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    if (systemIsDark) {
      document.documentElement.classList.add("dark");
      lightIconRef.current?.classList.remove("hidden");
    } else {
      darkIconRef.current?.classList.remove("hidden");
    }
  }, [systemIsDark]);

  function handleClick() {
    // toggle icons inside button
    darkIconRef.current?.classList.toggle("hidden");
    lightIconRef.current?.classList.toggle("hidden");

    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      addLight();
    } else {
      addDark();
    }
  }

  return (
    <button
      onClick={handleClick}
      id="theme-toggle"
      type="button"
      className="text-gray-500 dark:text-gray-400 bg-gray-200 hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-900 focus:outline-none rounded-lg text-sm p-2.5 transition ease-in-out duration-200"
    >
      <svg
        ref={darkIconRef}
        className="w-5 h-5 hidden"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      <svg
        ref={lightIconRef}
        className="w-5 h-5 hidden"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}

function addDark() {
  document.documentElement.classList.add("dark");
  localStorage.setItem("color-theme", "dark");
}

function addLight() {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("color-theme", "light");
}
