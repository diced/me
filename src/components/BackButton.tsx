import {
  IconArrowBackUp,
  IconMoonFilled,
  IconPaintFilled,
  IconSunFilled,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BackButton() {
  return (
    <div className="z-[9999] fixed top-0 left-0 flex items-center justify-center w-16 h-16">
      <Link
        href="/"
        aria-label={`Go back`}
        type="button"
        className="p-2 md:p-1 dark:border-black-700 border-gray-300 border-[1px] rounded-md hover:bg-gray-300 dark:hover:bg-black-700 transition duration-200"
      >
        <IconArrowBackUp className="w-5 h-5" />
      </Link>
    </div>
  );
}
