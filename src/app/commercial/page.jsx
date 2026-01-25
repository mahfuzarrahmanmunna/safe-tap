import BusinessSolution from "../components/commercial-banner/BusinessSolution";
import Category from "../components/Category";
import ComparisonSection from "../components/commercial-banner/ComparisonSection";
import CustomIot from "../components/commercial-banner/CustomIot";
import Hero from "../components/commercial-banner/Hero";
import Testimonial from "../components/commercial-banner/Testimonial";
import WhyChooseUs from "../components/commercial-banner/WhyChooseUs";
import WaterJourney from "../components/WaterJourney";
import Trusted from "../components/commercial-banner/Trusted";

function Commercial() {
  return (
    <div>
      <Hero></Hero>
      <BusinessSolution></BusinessSolution>
      <CustomIot></CustomIot>
      <WhyChooseUs></WhyChooseUs>
      <ComparisonSection></ComparisonSection>
      <Trusted></Trusted>
      <Testimonial></Testimonial>
      <Category></Category>
      <WaterJourney></WaterJourney>
    </div>
  );
}

export default Commercial;
