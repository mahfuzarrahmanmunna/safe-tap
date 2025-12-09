import Image from "next/image";
import HeroBanner from "./components/Banner/page";
import Community from "./components/Community";

export default function Home() {
  return (
   <>
   <HeroBanner/>
   <Community></Community>
   </>
  );
}
