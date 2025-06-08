import Nav from "./components/common/nav";
import Section1 from "./components/landing/components/section1";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 z-0">
      <Nav />
      <Section1 />
    </div>
  );
}
