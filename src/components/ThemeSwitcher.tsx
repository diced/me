import {
  IconMoonFilled,
  IconSunFilled
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="z-[9999] fixed top-0 right-0 flex items-center justify-center w-16 h-16">
      <button
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        type="button"
        className="p-2 md:p-1 dark:border-black-700 border-gray-300 border-[1px] rounded-md hover:bg-gray-300 dark:hover:bg-black-700 transition duration-200"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <IconSunFilled className="w-5 h-5" />
        ) : (
          <IconMoonFilled className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
