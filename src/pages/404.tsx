import Center from "@/components/Center";
import {
  Icon as TablerIcon,
  IconBrandGithubFilled,
  IconBrandSpotify,
  IconFolders,
  IconInfoCircleFilled,
  IconHome,
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

export default function FourOFour() {
  return (
    <Center className="items-center h-screen">
      <div>
        <h1 className="text-5xl font-extrabold text-center mb-2">404</h1>

        <HomeLink href="/" Icon={IconHome}>
          go back
        </HomeLink>
      </div>
    </Center>
  );
}
