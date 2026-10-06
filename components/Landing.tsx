import type { Dict } from "@/content/types";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Process } from "./Process";
import { Services } from "./Services";
import { Showcase } from "./Showcase";
import { Work } from "./Work";

export function Landing({ dict }: { dict: Dict }) {
  return (
    <>
      <Header dict={dict} page="home" />
      <main id="main">
        <Hero dict={dict} />
        <Showcase dict={dict} />
        <Work dict={dict} />
        <Services dict={dict} />
        <Process dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
