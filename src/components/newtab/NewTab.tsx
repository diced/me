import { useEffect, useState } from 'preact/hooks';
import NewTabLink from './NewTabLink';

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default function NewTab() {
  const [links, setLinks] = useState([]);
  const [clock, setClock] = useState(formatDate(new Date()));
  const [dragIndex, setDragIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('customLinks');
    if (stored) setLinks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const interval: number = setInterval(() => {
      setClock(formatDate(new Date()));
    }, 1000) as unknown as number;

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('customLinks', JSON.stringify(links));
  }, [links]);

  function handleDrop(index: number) {
    if (dragIndex === null || dragIndex === index) return;
    const updated = [...links];
    const [dragged] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, dragged);
    setLinks(updated);
    setDragIndex(null);
  }

  function handleAdd() {
    const url = prompt('Enter site URL:');
    if (!url) return;

    try {
      new URL(url);
    } catch {
      alert('Invalid URL');
      return;
    }

    const label = prompt('Enter label:') || new URL(url).hostname;
    setLinks([...links, { url, label }]);
  }

  return (
    <main className='p-6 max-w-7xl mx-auto flex flex-col items-center gap-8'>
      <div className='text-6xl font-bold mt-12'>{clock}</div>

      <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 max-w-[32rem]'>
        {links.map((link, index) => (
          <NewTabLink
            key={index}
            link={link}
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={() => handleDrop(index)}
          />
        ))}

        <button
          onClick={handleAdd}
          className='flex flex-col items-center justify-center text-center aspect-square dark:text-white p-2 md:p-1 bg-white dark:bg-blue-950 dark:border-blue-800 border-gray-300 border-[1px] rounded-md hover:bg-gray-100 dark:hover:bg-blue-900 transition duration-200'
        >
          +
        </button>
      </div>
    </main>
  );
}
