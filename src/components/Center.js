export default function Center({ children }) {
  return (
    <div className='flex items-center justify-center mt-12'>
      <div>
        {children}
      </div>
    </div>
  );
}