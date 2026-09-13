import Image from "next/image";
import { initials } from "@/lib/format";

/**
 * Circular headshot. Falls back to a neutral gray tile with the member's
 * initials when no photo has been added to /public/team yet.
 */
export default function Avatar({
  src,
  name,
  sizes,
  className = "",
}: {
  src: string | null;
  name: string;
  sizes: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-full bg-[#eceae6] ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={`${name}, headshot`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          aria-hidden="true"
        >
          <span className="font-display text-[clamp(1.5rem,4vw,2.25rem)] tracking-wide text-muted">
            {initials(name)}
          </span>
        </div>
      )}
    </div>
  );
}
