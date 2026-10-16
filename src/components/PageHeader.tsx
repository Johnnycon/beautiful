import type { ReactNode } from "react";

export const container = "mx-auto max-w-[88rem] px-6 md:px-10";

// Opening block for interior pages: a large title with the intro set beside it
export default function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="pt-36 pb-16 md:pt-44 md:pb-24">
      <div className={`${container} grid gap-8 md:grid-cols-12 md:items-end`}>
        <h1 className="font-serif text-5xl leading-[1.02] tracking-[-0.015em] md:col-span-7 md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <div className="md:col-span-4 md:col-start-9">
          <p className="text-lg text-slate">{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
