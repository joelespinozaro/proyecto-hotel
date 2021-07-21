import { PencilIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function LinkEditItem({ url }: { url: string }) {
  return (
    <Link href={url}>
      <a>
        <PencilIcon height={20} />
      </a>
    </Link>
  );
}
