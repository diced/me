import useSWR from "swr";
import type { UserResponse } from "../lib/spotify";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => (res.error ? Promise.reject(res.error) : res));

export default function Spotify() {
  const { data, error, isLoading } = useSWR<UserResponse>(
    "https://spotify.diced.sh/user/pranaco_og",
    fetcher,
    {
      refreshInterval: 5000,
    },
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <img
        src={data.item.album.images[1].url}
        height={data.item.album.images[1].height}
        width={data.item.album.images[1].width}
        alt={data.item.album.name}
        className="my-2 rounded-md border-[1px] border-gray-300 dark:border-blue-800"
      />

      <a
        href={data.item.external_urls.spotify}
        className="my-2 text-blue-500 dark:text-blue-300 dark:hover:text-blue-400 hover:underline"
        target="_blank"
      >
        {data.item.name}
      </a>

      <div>
        <span>by </span>
        {data.item.artists.map((artist, i) => (
          <>
            <a
              key={i}
              href={artist.external_urls.spotify}
              className="text-blue-500 dark:text-blue-300 dark:hover:text-blue-400 hover:underline"
              target="_blank"
            >
              {artist.name}
            </a>
            {i === data.item.artists.length - 1 ? "" : ", "}
          </>
        ))}
      </div>

      <div>
        <span>on </span>
        <a
          href={data.item.album.external_urls.spotify}
          className="text-blue-500 dark:text-blue-300 dark:hover:text-blue-400 hover:underline"
          target="_blank"
        >
          {data.item.album.name}
        </a>
      </div>

      <div className="my-2 flex items-center justify-between">
        <div className="relative w-full bg-gray-200 dark:bg-blue-100 h-2 rounded-md">
          <div
            className="h-full bg-blue-300 dark:bg-blue-400 rounded-full"
            style={{
              width: `${(data.progress_ms / data.item.duration_ms) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="w-full flex justify-between">
        <p className="text-xs">
          {Math.floor(data.progress_ms / 1000 / 60)}:
          {Math.floor((data.progress_ms / 1000) % 60)
            .toString()
            .padStart(2, "0")}
        </p>
        <p className="text-xs">
          {Math.floor(data.item.duration_ms / 1000 / 60)}:
          {Math.floor((data.item.duration_ms / 1000) % 60)
            .toString()
            .padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
