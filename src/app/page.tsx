import BrowseByDress from "../components/layout/browse-by-dress";
import HomePageFindClothes from "../components/layout/home-page-find-clothes";
import NewArrivalsAndTopSelling from "../components/layout/newarrivals-and-top-selling";
import OurCustomers from "../components/layout/our-customers";

export default function Home() {
  return (
    <main>
      <HomePageFindClothes/>
      <NewArrivalsAndTopSelling/>
      <BrowseByDress/>
      <OurCustomers/>
    </main>
  );
}
