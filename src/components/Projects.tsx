import { useState } from 'preact/hooks';

export interface Project {
  name: string;
  href: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    name: 'Zipline',
    href: 'https://zipline.diced.sh/github',
    description: 'A feature packed file uploader, url shortener, and more.',
    tags: ['ts', 'react', 'nextjs', 'pg', 'docker'],
  },
  {
    name: 'Zipline Docs',
    href: 'https://zipline.diced.sh',
    description: 'A custom documentation site for Zipline',
    tags: ['ts', 'react', 'nextjs', 'tailwindcss', 'vercel', 'mdx'],
  },
  {
    name: 'me',
    description: 'This website..',
    tags: ['ts', 'astro', 'tailwindcss', 'vercel'],
    href: '/',
  },
  {
    name: 'dotfiles',
    description: 'My Nix configuration files. Used on macos and nixos.',
    tags: [
      'macos',
      'neovim',
      'nix',
      'linux',
      'nixos',
      'shell',
      'hyprland',
      'wayland',
      'gnome',
    ],
    href: 'https://github.com/diced/dotfiles',
  },
  {
    name: 'prisma-binaries',
    description:
      'A docker image for linux/arm64 and linux/amd64 supported prisma binaries. this is kinda obsolete now....',
    tags: ['docker'],
    href: 'https://github.com/diced/prisma-binaries',
  },
  {
    name: 'dlauncher',
    description:
      'An application launcher for Linux that is based on Ulauncher.',
    tags: ['rs', 'gtk3', 'linux'],
    href: 'https://github.com/diced/dlauncher',
  },
  {
    name: 'dvm',
    description:
      "A version manager for Discord. This is useful on Arch Linux as you don't have to wait for a package update.",
    tags: ['rs', 'linux'],
    href: 'https://github.com/diced/dvm',
  },
  {
    name: 'flameshot-uploader',
    description:
      'Flameshot uploader lets you use ShareX .sxcu files with Flameshot.',
    tags: ['rs', 'linux', 'sharex', 'flameshot'],
    href: 'https://github.com/diced/flameshot-uploader',
  },
  {
    name: 'ServerStats',
    description:
      'An over-engineered Minecraft mod/plugin for Fabric/Paper/Bungee/Velocity that exposes stats to a prometheus endpoint.',
    tags: ['java', 'fabric', 'paper'],
    href: 'https://github.com/diced/ServerStats',
  },
  {
    name: 'Riptide',
    description:
      'An over-engineered Discord music bot that has a Rust gateway and Javascript workers that connect to the gateway. (Archived)',
    tags: ['rs', 'grpc', 'js', 'microservices'],
    href: 'https://github.com/diced/riptide',
  },
];

const uniqueTags = Array.from(
  new Set(projects.flatMap((project) => project.tags)),
).sort();

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
    <div className='select-none project-card my-4 border-[1px] border-gray-300 dark:border-blue-800 hover:bg-gray-100 dark:hover:bg-blue-900 transition-all duration-200 rounded-md py-1.5 px-4'>
      <a
        href={project.href}
        className='text-xl font-bold text-blue-500 dark:text-blue-300 dark:hover:text-blue-400 hover:underline'
        target='_blank'
        rel='noreferrer'
      >
        {project.name}
      </a>

      <p className='text-sm my-2'>{project.description}</p>

      <div className='flex flex-wrap my-2'>
        {project.tags.sort().map((tag, i) => (
          <ProjectTag
            key={i}
            selected={selectedTags.includes(tag)}
            onClick={() => setSelectedTags([tag])}
            title={`Filter by "${tag}"`}
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
  selected,
  ...props
}: {
  selected: boolean;
  children: string;
  [key: string]: unknown;
}) {
  return (
    <button
      className={`text-xs cursor-pointer transition-colors border-gray-300 dark:border-blue-700 border-[1px] dark:text-white hover:bg-blue-100 hover:dark:bg-blue-700 rounded-md px-2.5 py-1.5 md:px-1.5 md:py-0.5 mr-2 my-1 ${
        selected
          ? 'bg-blue-100 dark:bg-blue-900'
          : 'bg-gray-100 dark:bg-blue-800'
      }`}
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
      <div className='my-1'>
        {uniqueTags.map((tag, i) => (
          <ProjectTag
            key={i}
            onClick={() =>
              setSelectedTags((tags) =>
                tags.includes(tag)
                  ? tags.filter((t) => t !== tag)
                  : [...tags, tag],
              )
            }
            selected={selectedTags.includes(tag)}
            title={`Filter by "${tag}"`}
          >
            {tag}
          </ProjectTag>
        ))}
        <ProjectTag
          onClick={() => setSelectedTags([])}
          selected={selectedTags.length === 0}
          aria-label='Clear tags'
          title='Clear tags'
        >
          x
        </ProjectTag>
      </div>

      <p className='mt-2 text-xs text-gray-500'>
        click on a tag to filter projects by that tag
      </p>

      <p className='text-xs text-gray-500'>
        {selectedTags.length === 0 ? (
          ''
        ) : (
          <>
            showing {filtered.length} result{filtered.length === 1 ? '' : 's'}
          </>
        )}
      </p>

      {filtered.map((project, i) => (
        <ProjectCard
          key={i}
          project={project}
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
        />
      ))}
    </div>
  );
}
