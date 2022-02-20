import Spring from "./Spring";

export default function CenterFull({ children }) {
  return (
    <Spring className='flex items-center justify-center h-screen'>
      <div>
        {children}
      </div>
    </Spring>
  );
}