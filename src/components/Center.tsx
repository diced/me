export default function Center({
  children,
  className,
  ...other
}: {
  children: any;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div
      className={`flex justify-center${
        className ? ` ${className}` : ""
      }`}
      {...other}
    >
      {children}
    </div>
  );
}
