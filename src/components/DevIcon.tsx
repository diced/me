import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export const DEVICONS_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

export const DEVICONS_SVGS = {
  react: `${DEVICONS_BASE}/react/react-original.svg`,
  nextjs: `tsvg:nextjs`,
  tailwindcss: `${DEVICONS_BASE}/tailwindcss/tailwindcss-plain.svg`,
  nodejs: `${DEVICONS_BASE}/nodejs/nodejs-original.svg`,
  js: `${DEVICONS_BASE}/javascript/javascript-original.svg`,
  ts: `${DEVICONS_BASE}/typescript/typescript-original.svg`,
  linux: `${DEVICONS_BASE}/linux/linux-original.svg`,
  docker: `${DEVICONS_BASE}/docker/docker-original.svg`,
  pg: `${DEVICONS_BASE}/postgresql/postgresql-original.svg`,
  java: `${DEVICONS_BASE}/java/java-original.svg`,
  git: `${DEVICONS_BASE}/git/git-original.svg`,
};

export const DEVICONS_SVG_SRC = {
  nextjs: ({ theme, ...other }: { theme: string; [key: string]: any }) => (
    <svg
      viewBox="0 0 128 128"
      className={`${
        theme === "dark" ? "fill-white" : "fill-black"
      } mx-2 rounded-md`}
      {...other}
    >
      <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"></path>
    </svg>
  ),
};

export default function DevIcon({
  icon,
  className,
  width,
  height,
  ...other
}: {
  icon: keyof typeof DEVICONS_SVGS;
  width: number;
  height: number;
  className?: string;
  [key: string]: any;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const svgurl = DEVICONS_SVGS[icon];
  if (svgurl.startsWith("tsvg:")) {
    const [, name] = svgurl.split(":");
    const Component = DEVICONS_SVG_SRC[name as keyof typeof DEVICONS_SVG_SRC];
    return (
      <Component
        theme={theme ?? "dark"}
        width={width}
        height={height}
        {...other}
      />
    );
  }

  return (
    <Image
      src={svgurl}
      alt={icon}
      className={className}
      width={width}
      height={height}
      {...other}
    />
  );
}
