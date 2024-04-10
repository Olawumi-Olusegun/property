
import Hero from "../../components/Hero";
import InfoBoxes from "../../components/InfoBoxes";
import HomeProperties from "../../components/HomeProperties";
import FeaturedProperties from "../../components/FeaturedProperties";
import { fetchProperties } from "./../../../utils/request";

export default async function Home() {

  const properties = await fetchProperties();

  // const recentProperties = properties.sort(() => Math.random() - Math.random()).slice(0, 3);
  const recentProperties = properties.slice(0, 3);

  if(!recentProperties) {
    return null;
  }

  return (
    <>
     <Hero />
     <InfoBoxes />    
     <FeaturedProperties />
     <HomeProperties properties={recentProperties} />
    </>
  );
}
