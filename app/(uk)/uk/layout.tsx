import "../../globals.css";
import { RootShell } from "@/lib/layout";

export { viewport } from "@/lib/layout";

export default function UkLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="uk">{children}</RootShell>;
}
