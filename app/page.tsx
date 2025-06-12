import Nav from "./components/common/nav";
import About from "./components/landing/components/about";
import Bundle from "./components/landing/components/bundle";
import Hero from "./components/landing/components/hero";
import LibraryGrid from "./components/landing/components/library";
import Newsletter from "./components/landing/components/newsletter";
import Product from "./components/landing/components/product";
import Team from "./components/landing/components/team";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 z-0">
      <Nav />
      <div className="h-[700vh]">
        <Hero />
      </div>
      <Product />
      <LibraryGrid />
      <Bundle />

      <About />

      <Team />
      <Newsletter />
    </div>
  );
}
