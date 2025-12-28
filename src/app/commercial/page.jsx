import Category from "../components/Category"
import ComparisonSection from "../components/commercial-banner/ComparisonSection"
import CustomIot from "../components/commercial-banner/CustomIot"
import Hero from "../components/commercial-banner/Hero"
import Testimonial from "../components/commercial-banner/Testimonial"
import WhyChooseUs from "../components/commercial-banner/WhyChooseUs"
import WaterJourney from "../components/WaterJourney"


function Commercial() {
  return (
    <div>
        <Hero></Hero>
        <CustomIot></CustomIot>
        <WhyChooseUs></WhyChooseUs>
        <ComparisonSection></ComparisonSection>
         <Testimonial></Testimonial>
         <Category></Category>
         <WaterJourney></WaterJourney>
    </div>
  )
}

export default Commercial