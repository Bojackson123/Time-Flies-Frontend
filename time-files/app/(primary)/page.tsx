import AmazingWorks from "components/amazing-works";
import FAQ from "components/faq";
import Hero from "components/hero";
import HowItWorks from "components/how-it-works";
import ProductOverview from "components/product-overview";


export const metadata: Metadata = {
  title: "Home",
  datePublished: "1/1/2023",
  breadcrumbs: [{ name: "Home", href: "/" }],
};

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductOverview />
      <HowItWorks />
      <FAQ />
    </main>
  );
}
