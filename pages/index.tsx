import AboutUs from "@/components/about-us/AboutUs";
import FeaturedProducts from "@/components/featured-products/FeaturedProducts";
import HeroSection from "@/components/hero/HeroSection";
import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <AboutUs />
    </Layout>
  );
}
