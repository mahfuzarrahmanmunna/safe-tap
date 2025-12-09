import Image from "next/image";
import HeroBanner from "./components/Banner/page";
<<<<<<< Updated upstream
import Community from "./components/Community";

export default function Home() {
  return (
   <>
   <HeroBanner/>
   <Community></Community>
   </>
=======
import SafeTapSection from "./components/SafeTapSection/SafeTapSection";
import SafeTapProducts from "./components/SafeTapProducts/SafeTapProducts";
import SafeTapBanner from "./components/SafeTapBanner/SafeTapBanner";
import DrinkPrimeAdvantage from "./components/DrinkPrimeAdvantage/DrinkPrimeAdvantage";

export default function Home() {
  return (
    <>
      <figure>
        <img
          src="https://i.ibb.co/99PK2r48/Gemini-Generated-Image-h1urwjh1urwjh1ur.png"
          alt="SafeTap Hero Image" />
      </figure>
      <SafeTapBanner />
      {/* <HeroBanner /> */}
      <SafeTapSection />
      <SafeTapProducts />
      <DrinkPrimeAdvantage />
    </>
>>>>>>> Stashed changes
  );
}
