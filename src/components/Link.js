import NextLink from 'next/link';

export default function Link({ href, children }) {
  return (
    <NextLink href={href}>
      <a className='btn btn-sm w-full mt-2'>{children}</a>
    </NextLink>
  );
}