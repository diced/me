import { useState } from "react";

export interface Project {
  name: string;
  href: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    name: "Zipline",
    href: "https://zipline.diced.sh/github",
    description: "A feature packed file uploader, url shortener, and more.",
    tags: ["ts", "react", "nextjs", "pg", "docker"],
  },
  {
    name: "Zipline Docs",
    href: "https://zipline.diced.sh",
    description: "A custom documentation site for Zipline",
    tags: ["ts", "react", "nextjs", "tailwindcss", "vercel", "mdx"],
  },
  {
    name: "me",
    description: "This website lol",
    tags: ["ts", "astro", "tailwindcss", "vercel"],
    href: "/",
  },
  {
    name: "prisma-binaries",
    description:
      "A docker image for linux/arm64 and linux/amd64 supported prisma binaries",
    tags: ["docker"],
    href: "https://github.com/diced/prisma-binaries",
  },
  {
    name: "dlauncher",
    description: "An application launcher for Linux that is based on Ulauncher",
    tags: ["rs", "gtk3", "linux"],
    href: "https://github.com/diced/dlauncher",
  },
  {
    name: "dvm",
    description:
      "A version manager for Discord. This is useful on Arch Linux as you don't have to wait for a package update.",
    tags: ["rs", "linux"],
    href: "https://github.com/diced/dvm",
  },
  {
    name: "flameshot-uploader",
    description:
      "Flameshot uploader lets you use ShareX .sxcu files with flameshot.",
    tags: ["rs", "linux", "sharex", "flameshot"],
    href: "https://github.com/diced/flameshot-uploader",
  },
  {
    name: "dotfiles",
    description: "My dotfiles for Arch Linux (bspwm)",
    tags: ["linux", "bspwm", "shell"],
    href: "https://github.com/diced/dotfiles",
  },
  {
    name: "ServerStats",
    description:
      "A overengineered Minecraft mod/plugin for Fabric/Paper/Bungee/Velocity that exposes stats to a prometheus endpoint.",
    tags: ["java", "fabric", "paper"],
    href: "https://github.com/diced/ServerStats",
  },
  {
    name: "Riptide",
    description:
      "An overengineered Discord music bot that has a Rust gateway and Javascript workers that connect to the gateway. (Archived)",
    tags: ["rs", "grpc", "js", "microservices"],
    href: "https://github.com/diced/riptide",
  },
];

const uniqueTags = Array.from(
  new Set(projects.flatMap((project) => project.tags)),
);

function ProjectCard({
  project,
  setSelectedTags,
  selectedTags,
}: {
  project: Project;
  setSelectedTags: (tags: string[]) => void;
  selectedTags: string[];
}) {
  return (
    <div className="select-none project-card my-4 border-[1px] border-gray-300 dark:border-blue-800 hover:bg-gray-100 dark:hover:bg-blue-900 transition-all duration-200 rounded-md py-1.5 px-4">
      <a
        href={project.href}
        className="text-xl font-bold text-blue-500 dark:text-blue-300 dark:hover:text-blue-400 hover:underline"
      >
        {project.name}
      </a>

      <p className="text-sm my-2">{project.description}</p>

      <div className="flex flex-wrap my-2">
        {project.tags.map((tag) => (
          <ProjectTag
            className={
              selectedTags.includes(tag)
                ? "bg-blue-100 dark:bg-blue-900"
                : "bg-gray-100 dark:bg-blue-800"
            }
            onClick={() => setSelectedTags([tag])}
          >
            {tag}
          </ProjectTag>
        ))}
      </div>
    </div>
  );
}

function ProjectTag({
  children,
  className,
  ...props
}: {
  className: string;
  children: string;
  [key: string]: any;
}) {
  return (
    <button
      className={`text-xs dark:border-blue-700 border-[1px] dark:text-white rounded-md px-2.5 py-1.5 md:px-1.5 md:py-0.5 mr-2 my-1 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Projects() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filtered = projects.filter((project) =>
    selectedTags.length === 0
      ? true
      : selectedTags.every((tag) => project.tags.includes(tag)),
  );

  return (
    <div>
      <div className="my-1">
        {uniqueTags.map((tag) => (
          <ProjectTag
            onClick={() =>
              setSelectedTags((tags) =>
                tags.includes(tag)
                  ? tags.filter((t) => t !== tag)
                  : [...tags, tag],
              )
            }
            className={
              selectedTags.includes(tag)
                ? "bg-blue-100 dark:bg-blue-900"
                : "bg-gray-100 dark:bg-blue-800"
            }
          >
            {tag}
          </ProjectTag>
        ))}
        <ProjectTag
          onClick={() => setSelectedTags([])}
          className={
            selectedTags.length === 0
              ? "bg-blue-100 dark:bg-blue-900"
              : "bg-gray-100 dark:bg-blue-800"
          }
          aria-label="Clear tags"
        >
          x
        </ProjectTag>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        click on a tag to filter projects by that tag
      </p>

      <p className="text-xs text-gray-500">
        {selectedTags.length === 0 ? (
          ""
        ) : (
          <>
            showing {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </>
        )}
      </p>

      {filtered.map((project) => (
        <ProjectCard
          project={project}
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
        />
      ))}
    </div>
  );
}
