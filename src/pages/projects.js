import Center from '../components/Center';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Spring, { SpringChildren } from '../components/Spring';

const items = [
  {
    name: 'Dotfiles',
    link: 'https://github.com/diced/dotfiles',
    content: (
      <>My dotfiles for Arch installs.</>
    )
  },
  {
    name: 'Riptide',
    link: 'https://github.com/diced/riptide',
    content: <>A fully microserviced music bot written with Rust and JS.</>
  },
  {
    name: 'Zipline',
    link: 'https://github.com/diced/zipline',
    content: (
      <>
        The best ShareX / File uploader you could ever want, with logging, URL
        shortening, and even more.
      </>
    )
  },
  {
    name: 'Light',
    link: 'https://github.com/diced/light',
    content: (
      <>A lighter more faster version of Zipline made in Rust with Actix Web</>
    )
  },
  {
    name: 'Edge API',
    link: 'https://edge.diced.tech',
    content: (
      <>A collection of API&apos;s </>
    )
  },
  {
    name: 'ServerStats',
    link: 'https://serverstats.vercel.app',
    content: (
      <>Visualize your Minecraft server statistics in realtime, a Minecraft server plugin/mod to monitor your server.</>
    )
  },
];

export default function Projects() {
  return (
    <Center>
      <h1 className="text-6xl font-bold text-center">projects</h1>
      <Spring className="grid grid-cols-1 md:grid-cols-2 mt-8">
        {items.map(item => (
          <Link href={item.link}>
            <SpringChildren
              className="card w-96 bg-base-200 shadow-xl mb-3 mx-3"
              href={item.link}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="card-body">
                <a className="link link-primary card-title" href={item.link}>{item.name}</a>
                <p>{item.content}</p>
              </div>
            </SpringChildren>
          </Link>
        ))}
      </Spring>
    </Center>
  );
}

Projects.title = 'diced - projects'
Projects.description = 'Projects I\'ve worked on.';