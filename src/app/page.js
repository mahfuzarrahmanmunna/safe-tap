"use client";
import Image from "next/image";
import HeroBanner from "./components/Banner/page";
import Community from "./components/Community";
import HowItWorks from "./components/HowItWorks";
import Category from "./components/Category";
import WaterJourney from "./components/WaterJourney";
import FaqData from "./components/FaqData";

export default function Home() {
  return (
   <>
   <HeroBanner/>
   <Community></Community>
   <HowItWorks></HowItWorks>
   <Category></Category>
    <WaterJourney></WaterJourney>
    <FaqData></FaqData>
   </>
  );
}
