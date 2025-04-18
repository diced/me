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

  if (error) return <div>Error: {error}</div>;
  return (
    <div className="max-w-[300px] w-[300px]">
      {isLoading ? (
        <div className="flex h-[300px] w-[300px] items-center justify-center my-2 rounded-md border-[1px] border-gray-300 dark:border-blue-800">
          <span className="text-3xl bg-blue-800/30 rounded-md h-[300px] w-[300px] flex items-center justify-center">
            <span className="animate-spin">😭</span>
          </span>
        </div>
      ) : (
        <img
          src={data.item.album.images[1].url}
          height={data.item.album.images[1].height}
          width={data.item.album.images[1].width}
          alt={data.item.album.name}
          className="my-2 rounded-md border-[1px] border-gray-300 dark:border-blue-800"
        />
      )}

      {isLoading ? (
        <span className="flex h-4 my-2 w-full animate-pulse rounded-md bg-gray-300 dark:bg-blue-800" />
      ) : (
        <a
          href={data.item.external_urls.spotify}
          className="my-2 text-blue-500 dark:text-blue-300 dark:hover:text-blue-400 hover:underline"
          target="_blank"
          title={`Listen to ${data.item.name} on Spotify`}
        >
          {data.item.name.length > 28 ? (
            <span>{data.item.name.substring(0, 28)}...</span>
          ) : (
            <span>{data.item.name}</span>
          )}
        </a>
      )}

      <div className="flex items-center break-words whitespace-normal">
        <span className="mr-2 flex-shrink-0">by </span>
        {isLoading ? (
          <span className="flex h-4 w-full animate-pulse rounded-md bg-gray-300 dark:bg-blue-800" />
        ) : (
          // data.item.artists.map((artist, i) => (
          //   <>
          //     <a
          //       key={i}
          //       href={artist.external_urls.spotify}
          //       className="text-blue-500 dark:text-blue-300 dark:hover:text-blue-400 hover:underline"
          //       target="_blank"
          //     >
          //       {artist.name}
          //     </a>
          //     {i === data.item.artists.length - 1 ? "" : <>,&nbsp;</>}
          //   </>
          // ))
          <span>
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
                {i < data.item.artists.length - 1 && ", "}
              </>
            ))}
          </span>
        )}
      </div>

      <div className="flex items-center">
        <span className="mr-2">on </span>
        {isLoading ? (
          <span className="flex h-4 w-full animate-pulse rounded-md bg-gray-300 dark:bg-blue-800" />
        ) : (
          <a
            href={data.item.album.external_urls.spotify}
            className="text-blue-500 dark:text-blue-300 dark:hover:text-blue-400 hover:underline"
            target="_blank"
          >
            {data.item.album.name}
          </a>
        )}
      </div>

      <div className="my-2 flex items-center justify-between">
        <div className="relative w-full bg-gray-200 dark:bg-blue-100 h-2 rounded-md">
          <div
            className="h-full bg-blue-300 dark:bg-blue-400 rounded-full"
            style={{
              width: `${((data?.progress_ms ?? 0) / (data?.item?.duration_ms || 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="w-full flex justify-between">
        {isLoading ? (
          <>
            <span className="flex h-4 w-1/6 animate-pulse rounded-md bg-gray-300 dark:bg-blue-800" />
            <span className="flex h-4 w-1/6 animate-pulse rounded-md bg-gray-300 dark:bg-blue-800" />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
