import { Landing } from "@/components/Landing";
import { en } from "@/content/en";
import { buildMetadata } from "@/lib/layout";

export const metadata = buildMetadata(en, "home");

export default function Page() {
  return <Landing dict={en} />;
}
