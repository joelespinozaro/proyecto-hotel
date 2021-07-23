import { DocumentDownloadIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function LinkEditItem({ url }: { url: string }) {
  return (
    <Link href={url}>
      <a>
        <DocumentDownloadIcon height={20} color="orange" />
      </a>
    </Link>
  );
}
