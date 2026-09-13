import type { ReactNode } from "react";

export default function SectionHeading({
  label,
  title,
  align = "left",
  children,
}: {
  label?: string;
  title: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const alignment = align === "center" ? "text-center items-center" : "text-left";

  return (
    <div className={`flex flex-col ${alignment}`}>
      {label ? <p className="section-label mb-4">{label}</p> : null}
      <h2 className="font-display text-3xl leading-[1.15] tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <div
          className={`mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}
