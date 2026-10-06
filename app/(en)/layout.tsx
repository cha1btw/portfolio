import "../globals.css";
import { RootShell } from "@/lib/layout";

export { viewport } from "@/lib/layout";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
