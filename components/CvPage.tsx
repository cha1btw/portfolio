import type { Dict } from "@/content/types";
import { Cv } from "./Cv";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function CvPage({ dict }: { dict: Dict }) {
  return (
    <>
      <Header dict={dict} page="cv" />
      <main id="main">
        <Cv dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
