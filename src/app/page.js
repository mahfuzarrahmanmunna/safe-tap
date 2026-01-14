"use client";
import Image from "next/image";
import HeroBanner from "./components/Banner/page";
import Community from "./components/Community";
import SafeTapBanner from "./components/SafeTapBanner/SafeTapBanner";
import SafeTapSection from "./components/SafeTapSection/SafeTapSection";
// import SafeTapAdvantage from "./components/SafeTapAdvantage/SafeTapAdvantage";
import HowItWorks from "./components/HowItWorks";
import WaterJourney from "./components/WaterJourney";
import Category from "./components/Category";
import FaqData from "./components/FaqData";
import SafeTapAdvantage from "./components/DrinkPrimeAdvantage/DrinkPrimeAdvantage";

export default function Home() {
  return (
    <>
      {/* <HeroBanner/> */}
      <SafeTapBanner />
      
      <SafeTapSection />
      <SafeTapAdvantage />
      <Community></Community>
      <HowItWorks></HowItWorks>
      <Category></Category>
   <WaterJourney></WaterJourney>
   <FaqData></FaqData>

    </>
  );
}
