
import Advisement from "@/src/components/home/Advisement";
import Banner from "@/src/components/home/Banner";
import CustomerReviews from "@/src/components/home/CustomerReviews";
import Customized from "@/src/components/home/Customized";
import FeaturedBrands from "@/src/components/home/FeaturedBrands";
import FeaturedProducts from "@/src/components/home/FeaturedProducts";
import WhyChoose from "@/src/components/home/WhyChoose";

function MainPage() {
  return (
    <div>
      <Banner />
      <Advisement/>
      <FeaturedProducts />
      <FeaturedBrands />
      <CustomerReviews />
      <WhyChoose />
      <Customized />
    </div>
  );
}

export default MainPage;
