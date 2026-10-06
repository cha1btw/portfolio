import { CvPage } from "@/components/CvPage";
import { uk } from "@/content/uk";
import { buildMetadata } from "@/lib/layout";

export const metadata = buildMetadata(uk, "cv");

export default function Page() {
  return <CvPage dict={uk} />;
}
