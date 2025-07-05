// components/DiscoveryCategory.tsx
import Image from 'next/image';
import Link from 'next/link';

interface DiscoveryCategoryProps {
  bg: string;
  path: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export const DiscoveryCategory = ({
  bg,
  path,
  icon,
  title,
  description,
  tags
}: DiscoveryCategoryProps) => (
  <Link href={`/discover/${path}`} className={`${bg} group relative block h-full overflow-hidden rounded-xl border border-black p-6 no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_6px_0_#000]`}>
    <div className="relative z-10 flex h-full flex-col justify-between">
      <div>
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-black bg-white">
          <Image src={icon} width={32} height={32} alt="" />
        </div>
        <h3 className="mb-2 text-2xl font-bold">{title}</h3>
        <p className="mb-4">{description}</p>
      </div>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag} className="rounded-full bg-white/70 px-3 py-1 text-sm backdrop-blur-sm">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  </Link>
);