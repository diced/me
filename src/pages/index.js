import CenterFull from '../components/CenterFull';
import Link from '../components/Link';
import Spring, { SpringChildren } from '../components/Spring';

export default function Index() {
  return (
    <CenterFull>
      <SpringChildren><h1 className="text-6xl font-bold">dicedtomato</h1></SpringChildren>
      <SpringChildren><p className="text-xl">I create random stuff.</p></SpringChildren>
      <Spring>
        <SpringChildren><Link href='/projects'>projects</Link></SpringChildren>
        <SpringChildren><Link href='/github'>github</Link></SpringChildren>
        <SpringChildren><Link href='/spotify'>spotify</Link></SpringChildren>
      </Spring>
    </CenterFull>
  );
}

Index.title = 'dicedtomato';
Index.description = 'I create random stuff.';