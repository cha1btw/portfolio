import { Landing } from "@/components/Landing";
import { uk } from "@/content/uk";
import { buildMetadata } from "@/lib/layout";

export const metadata = buildMetadata(uk, "home");

export default function Page() {
  return <Landing dict={uk} />;
}
