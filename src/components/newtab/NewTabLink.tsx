import type { DragEvent } from 'preact/compat';

function getFavicon(url: string) {
  try {
    const { hostname } = new URL(url);
    return `https://www.google.com/s2/favicons?sz=128&domain=${hostname}`;
  } catch {
    return '';
  }
}

export default function NewTabLink({
  link,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  link: { url: string; label: string };
  onDragStart: (e: DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: DragEvent<HTMLDivElement>) => void;
  onDrop: (e: DragEvent<HTMLDivElement>) => void;
}) {
  return (
    <a href={link.url} rel='noreferrer'>
      <div
        draggable
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className='flex flex-col items-center justify-center text-center aspect-square dark:text-white p-2 md:p-1 bg-white dark:bg-blue-950 dark:border-blue-800 border-gray-300 border-[1px] rounded-md hover:bg-gray-100 dark:hover:bg-blue-900 transition duration-200'>
          <img
            src={getFavicon(link.url)}
            alt={link.label}
            className='w-6 h-6'
          />
        </div>

        <p className='text-sm text-center truncate mt-0.5'>{link.label}</p>
      </div>
    </a>
  );
}
