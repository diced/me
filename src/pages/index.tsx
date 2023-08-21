import Center from "@/components/Center";
import {
  Icon as TablerIcon,
  IconBrandGithubFilled,
  IconBrandSpotify,
  IconFolders,
  IconInfoCircleFilled,
} from "@tabler/icons-react";
import Link from "next/link";

function HomeLink({
  href,
  children,
  Icon,
}: {
  href: string;
  children: any;
  Icon: TablerIcon;
}) {
  return (
    <Link
      href={href}
      className="flex items-center dark:bg-black-950 dark:hover:bg-black-700 hover:bg-gray-200 transition-all duration-200 py-1 px-4 rounded-md dark:border-black-700 border-gray-300 border-[1px]"
    >
      <Icon className="w-5 h-5 mr-2" />

      {children}
    </Link>
  );
}

export default function Home() {
  return (
    <Center className="items-center h-screen">
      <div>
        <h1 className="text-5xl font-extrabold">dicedtomato</h1>
        <h2 className="text-lg">I create random stuff...</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 my-2">
          <HomeLink href="/about" Icon={IconInfoCircleFilled}>
            About
          </HomeLink>
          <HomeLink href="/projects" Icon={IconFolders}>
            Projects
          </HomeLink>
          <HomeLink href="/github" Icon={IconBrandGithubFilled}>
            GitHub
          </HomeLink>
          <HomeLink href="/spotify" Icon={IconBrandSpotify}>
            Spotify
          </HomeLink>
        </div>
      </div>
    </Center>
  );
}
