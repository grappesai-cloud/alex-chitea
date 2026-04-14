import Nav from "./components/Nav";
import Hero from "./components/Hero";
import SartorialMarquee from "./components/SartorialMarquee";
import Intro from "./components/Intro";
import PullQuote from "./components/PullQuote";
import Shoots from "./components/Shoots";
import Measurements from "./components/Measurements";
import Reel from "./components/Reel";
import Clients from "./components/Clients";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <SartorialMarquee />
      <Intro />
      <PullQuote />
      <Shoots />
      <Measurements />
      <Reel />
      <Clients />
      <Contact />
    </main>
  );
}
