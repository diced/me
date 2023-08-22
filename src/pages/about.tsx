import Center from "@/components/Center";
import DevIcon, { DEVICONS_SVGS } from "@/components/DevIcon";

function DevIconCard({
  icon,
  name,
}: {
  icon: keyof typeof DEVICONS_SVGS;
  name: string;
}) {
  return (
    <div className="border-[1px] border-gray-300 dark:border-black-700 rounded-md py-2 px-1 flex items-center flex-wrap">
      <DevIcon
        className="mx-2 rounded-md"
        icon={icon}
        width={48}
        height={48}
      />
      <span className="mx-6 text-lg font-bold text-gray-600 dark:text-gray-400 mt-2">
        {name}
      </span>
    </div>
  );
}

export default function Projects() {
  return (
    <Center className="flex-col md:px-60 lg:px-96 px-5">
      <h1 className="text-5xl font-extrabold text-center mt-32">About</h1>
      <div className="my-6 text-center">
        Hey! I&apos;m dicedtomato, I usually create random stuff that I feel
        like making. I spend most of my time gaming, wasting time or coding.
        <h2 className="text-2xl font-bold mt-6">Stuff I Use</h2>
        {/* 3x3 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <DevIconCard icon="react" name="React" />
          <DevIconCard icon="nextjs" name="Next.js" />
          <DevIconCard icon="tailwindcss" name="TailwindCSS" />
          <DevIconCard icon="nodejs" name="Node.js" />
          <DevIconCard icon="js" name="JavaScript" />
          <DevIconCard icon="ts" name="TypeScript" />
          <DevIconCard icon="linux" name="Linux" />
          <DevIconCard icon="docker" name="Docker" />
          <DevIconCard icon="pg" name="PostgreSQL" />
          <DevIconCard icon="java" name="Java" />
          <DevIconCard icon="git" name="Git" />
        </div>
      </div>
    </Center>
  );
}
