import { ArrowUpRight, TelegramLogo } from "@phosphor-icons/react/dist/ssr";
import { primaryContactUrl } from "@/lib/site";

/*
  Shape rule for the whole site: buttons are rounded-lg, icon buttons are circles,
  tags are pills, images and panels use rounded-2xl.
  - `compact` is the header version: a round Telegram icon on phones so the header fits.
  - `inverted` is for dark panels, where the normal ink-coloured button would vanish.
*/
export function ContactButton({
  label,
  compact = false,
  inverted = false,
}: {
  label: string;
  compact?: boolean;
  inverted?: boolean;
}) {
  const sizing = compact
    ? "size-9 justify-center rounded-full text-sm sm:size-auto sm:h-9 sm:rounded-lg sm:px-4"
    : "h-12 rounded-lg px-6 text-[15px]";
  const colors = inverted ? "bg-bg text-ink" : "bg-accent text-on-accent";
  return (
    <a
      href={primaryContactUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={compact ? label : undefined}
      className={`inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap font-medium shadow-[0_8px_24px_-12px_rgb(0_0_0/0.45)] transition-[transform,opacity] duration-200 hover:-translate-y-px hover:opacity-90 active:scale-[0.98] ${colors} ${sizing}`}
    >
      <TelegramLogo size={compact ? 18 : 18} weight="fill" aria-hidden className={compact ? "sm:hidden" : undefined} />
      <span className={compact ? "hidden sm:inline" : undefined}>{label}</span>
      {compact && <ArrowUpRight size={14} weight="bold" aria-hidden className="hidden sm:block" />}
    </a>
  );
}
