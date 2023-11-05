
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import { featured, propertyType } from "../data/data";
import FeaturedCard from "../components/FeaturedCard"
import PropertyTypeCard from "../components/PropertyTypeCard";
import Footer from "../components/Footer";

const Home = () => {

  return (
    <>
      <NavBar />
      <Header />

      {/* featured property section */}
      <div className="max-w-6xl mx-auto mt-40 lg:mt-24 mb-12 px-4 lg:px-0">
        <h1 className="text-slate-800 mb-4 text-2xl font-bold">
          Featured Property
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured?.map((item) => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </div>
      </div>

     {/* property type section */} 

     <div className="max-w-6xl mx-auto mt-24 mb-16 px-4 2xl:px-0">
        <h1 className="text-slate-800 mb-4 text-2xl font-bold">
         Browse by property type
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {propertyType?.map((item) => (
            <PropertyTypeCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Footer />

    </>
  );
};

export default Home;
