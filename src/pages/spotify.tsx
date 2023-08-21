import Center from "@/components/Center";
import { UserResponse } from "@/lib/spotify";
import { IconPlayerPauseFilled, IconRepeatOnce } from "@tabler/icons-react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { IconArrowsShuffle2, IconRepeat } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json()).then((res) => res.error ? Promise.reject(res.error) : res);

export function TimedProgress({
  progress,
  className,
}: {
  progress: number;
  className: string;
}) {
  return (
    <div className={`mx-2 relative w-full h-2 rounded-md ${className}`}>
      <div className="absolute w-full h-full bg-gray-200 dark:bg-black-800 rounded-md" />
      <div
        className="absolute h-full dark:bg-white bg-black rounded-md"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function Spotify() {
  const { data, error, isLoading } = useSWR<UserResponse>(
    "https://spotify.diced.sh/user/pranaco_og",
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  return (
    <Center className="flex-col md:px-24 px-5">
      <div>
        <h1 className="text-5xl font-extrabold text-center mt-32">Spotify</h1>
        <div className="my-6 text-center items-center">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Not listening to anything right now!</p>
          ) : (
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-center">
                <Image
                  src={data!.item.album.images[1].url}
                  height={data!.item.album.images[1].height}
                  width={data!.item.album.images[1].width}
                  alt={data!.item.album.name}
                  className="rounded-md border-[1px] border-gray-300 dark:border-black-700"
                />
              </div>

              <Link
                href={data!.item.external_urls.spotify}
                className="mt-4 text-2xl text-center font-bold dark:hover:underline decoration-gray-400"
                target="_blank"
              >
                {data!.item.name}
              </Link>

              <div className="flex flex-row items-center justify-center">
                {data!.item.artists.map((artist, i) => (
                  <Link
                    key={i}
                    href={artist.external_urls.spotify}
                    className="text-lg text-center dark:hover:underline decoration-gray-400"
                    target="_blank"
                  >
                    {artist.name}
                    {i !== data!.item.artists.length - 1 ? (
                      <span className="mr-1">, </span>
                    ) : (
                      ""
                    )}
                  </Link>
                ))}
              </div>

              <div className="flex flex-row items-center justify-center mt-4 space-x-5">
                <IconArrowsShuffle2
                  className={`w-6 h-6 mx-2 ${
                    data!.shuffle_state ? "" : "text-black-400"
                  }`}
                />

                <div className="p-2 dark:bg-white bg-black text-white dark:text-black rounded-full">
                  {data!.is_playing ? (
                    <IconPlayerPauseFilled className="w-6 h-6" />
                  ) : (
                    <IconPlayerPlayFilled className="w-6 h-6" />
                  )}
                </div>

                {data!.repeat_state === "track" ? (
                  <IconRepeatOnce className="w-6 h-6 mx-2" />
                ) : data!.repeat_state === "context" ? (
                  <IconRepeat className="w-6 h-6 mx-2" />
                ) : (
                  <IconRepeat className="w-6 h-6 mx-2 text-black-400" />
                )}
              </div>

              <div className="flex flex-row items-center px-0 md:px-32 lg:px-96">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.floor(data!.progress_ms / 1000 / 60)}:
                  {Math.floor(data!.progress_ms / 1000) % 60 < 10 ? "0" : ""}
                  {Math.floor(data!.progress_ms / 1000) % 60}
                </p>

                <TimedProgress
                  progress={(data!.progress_ms / data!.item.duration_ms) * 100}
                  className="my-4"
                />

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.floor(data!.item.duration_ms / 1000 / 60)}:
                  {Math.floor(data!.item.duration_ms / 1000) % 60 < 10
                    ? "0"
                    : ""}
                  {Math.floor(data!.item.duration_ms / 1000) % 60}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Center>
  );
}
