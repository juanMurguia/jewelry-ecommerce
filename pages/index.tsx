import FeaturedProducts from "@/components/featured-products/FeaturedProducts";
import HeroSection from "@/components/hero/HeroSection";
import Layout from "@/components/layout";
import SearchBar from "@/components/searchBar/SearchBar";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
    </Layout>
  );
}
