import type { Dict } from "@/content/types";

export function Footer({ dict }: { dict: Dict }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-8 text-sm text-muted md:px-8">
        <p>
          © {new Date().getFullYear()} {dict.name}
        </p>
        <p>{dict.footer.note}</p>
      </div>
    </footer>
  );
}
