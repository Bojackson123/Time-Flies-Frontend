import AboutHero from "components/about-hero";
import AIFeatures from "components/ai-features";
import FAQ from "components/faq";
import HowItWork from "components/how-it-work";

export const metadata: Metadata = {
  title: "About Us",
  datePublished: "1/1/2023",
  breadcrumbs: [{ name: "About", href: "/about" }],
};

export default function Home() {
  return (
    <main>
      <AboutHero />
      <AIFeatures />
      <HowItWork />
      <FAQ />
    </main>
  );
}
