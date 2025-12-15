"use client";
import Image from "next/image";
import HeroBanner from "./components/Banner/page";
import Community from "./components/Community";
import SafeTapBanner from "./components/SafeTapBanner/SafeTapBanner";
import SafeTapSection from "./components/SafeTapSection/SafeTapSection";
import SafeTapAdvantage from "./components/DrinkPrimeAdvantage/DrinkPrimeAdvantage";

export default function Home() {
  return (
    <>
      {/* <HeroBanner/> */}
      <SafeTapBanner />
      <Community></Community>
      <SafeTapSection />
      <SafeTapAdvantage />
    </>
  );
}
