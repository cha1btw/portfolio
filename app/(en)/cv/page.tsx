import { CvPage } from "@/components/CvPage";
import { en } from "@/content/en";
import { buildMetadata } from "@/lib/layout";

export const metadata = buildMetadata(en, "cv");

export default function Page() {
  return <CvPage dict={en} />;
}
