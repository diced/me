import Center from "@/components/Center";
import Link from "next/link";

function ProjectCard({
  project,
}: {
  project: {
    name: string;
    href?: string;
    description: string;
    langs: string[];
  };
}) {
  const Component = project.href ? Link : "div";
  return (
    <Component
      href={project.href ? project.href : ""}
      target="_blank"
      className="flex flex-col my-4 items-start justify-start dark:bg-black-950 dark:hover:bg-black-700 hover:bg-gray-200 transition-all duration-200 py-1 px-4 rounded-md dark:border-black-700 border-gray-300 border-[1px]"
    >
      <div className="flex items-center justify-between w-full">
        <h2
          className={`text-2xl font-bold ${
            project.href ? "hover:underline decoration-gray-400" : ""
          }`}
        >
          {project.name}
        </h2>

        <div className="hidden md:block">
          {project.langs.map((lang, i) => (
            <span
              className="text-xs font-bold text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md mr-2 border-[1px] border-gray-300 dark:border-black-700"
              key={i}
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      <p>{project.description}</p>
      <div className="flex flex-row items-center justify-start"></div>

      <div className="md:hidden flex flex-wrap">
        {project.langs.map((lang, i) => (
          <span
            className="text-xs my-1 font-bold text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md mr-2 border-[1px] border-gray-300 dark:border-black-700"
            key={i}
          >
            {lang}
          </span>
        ))}
      </div>
    </Component>
  );
}

const projects = [
  {
    name: "Zipline",
    href: "https://zipline.diced.sh",
    description: "A feature packed file uploader, url shortener, and more.",
    langs: ["ts", "js", "react", "nextjs", "pg", "docker"],
  },
  {
    name: "Zipline Docs",
    href: "https://zipline.diced.sh",
    description: "A custom documentation site for Zipline",
    langs: ["ts", "react", "nextjs", "tailwindcss", "vercel", "mdx"],
  },
  {
    name: "prisma-binaries",
    description:
      "A docker image for linux/arm64 and linux/amd64 supported prisma binaries",
    langs: ["docker"],
    href: "https://github.com/diced/prisma-binaries",
  },
  {
    name: "me",
    description: "This website lol",
    langs: ["ts", "react", "nextjs", "tailwindcss", "vercel"],
    href: "/",
  },
  {
    name: "dlauncher",
    description: "An application launcher for Linux that is based on Ulauncher",
    langs: ["rs", "gtk3", "linux"],
    href: "https://github.com/diced/dlauncher",
  },
  {
    name: "dvm",
    description:
      "A version manager for Discord. This is useful on Arch Linux as you don't have to wait for a package update.",
    langs: ["rs", "linux"],
    href: "https://github.com/diced/dvm",
  },
  {
    name: "flameshot-uploader",
    description:
      "Flameshot uploader lets you use ShareX .sxcu files with flameshot.",
    langs: ["rs", "linux", "sharex", "flameshot"],
    href: "https://github.com/diced/flameshot-uploader",
  },
  {
    name: "dotfiles",
    description: "My dotfiles for Arch Linux (bspwm)",
    langs: ["linux", "bspwm", "sxhkd", "polybar", "picom", "alacritty"],
    href: "https://github.com/diced/dotfiles",
  },
  {
    name: "ServerStats",
    description:
      "A overengineered Minecraft mod/plugin for Fabric/Paper/Bungee/Velocity that exposes stats to a prometheus endpoint.",
    langs: ["java", "fabric", "paper"],
    href: "https://github.com/diced/ServerStats",
  },
  {
    name: "Riptide",
    description:
      "An overengineered Discord music bot that has a Rust gateway and Javascript workers that connect to the gateway. (Archived)",
    langs: ["rust", "grpc", "js", "microservices"],
    href: "https://github.com/diced/riptide",
  },
];

export default function Projects() {
  return (
    <Center className="flex-col md:px-60 lg:px-96 px-5">
      <h1 className="text-5xl font-extrabold text-center mt-32">Projects</h1>
      <div className="my-6">
        {projects.map((project, i) => (
          <ProjectCard project={project} key={i} />
        ))}
      </div>
    </Center>
  );
}
