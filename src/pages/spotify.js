import React from 'react';
import CenterFull from '../components/CenterFull';
import Spring, { SpringChildren } from '../components/Spring';
import Link from 'next/link';

export default function Spotify() {
  const [spotify, setSpotify] = React.useState(null);

  React.useEffect(() => {
    const run = async () => {
      const res = await fetch('https://edge.diced.tech/spotify/user/pranaco_og');
      if (!res.ok) return setSpotify(null);
      const data = await res.json();
      setSpotify(data);
    };
    const interval = setInterval(run, 5000);

    run();
    return () => clearInterval(interval);
  }, []);

  return (
    <CenterFull>
      <Spring>
        <SpringChildren><h1 className="text-6xl font-bold text-center">spotify</h1></SpringChildren>
        {spotify ? (
          <Spring className='mt-8'>
            <img src={spotify.item.album.images[1].url} height={spotify.item.album.images[1].height} width={spotify.item.album.images[1].width} alt={spotify.item.name} />
            <Link href={spotify.item.external_urls.spotify}><a className='text-4xl mt-4 font-semibold link link-primary'>{spotify.item.name}</a></Link>
            <h4 className='text-xl mt-1'>{spotify.item.artists.map(x => x.name).join(', ')}</h4>
          </Spring>
        ) : <Spring><h4 variant='lg'>not listening to anything</h4></Spring>}
      </Spring>
    </CenterFull>
  );
}

Spotify.title = 'diced - spotify';
Spotify.description = 'What I\'m listening to on Spotify.';