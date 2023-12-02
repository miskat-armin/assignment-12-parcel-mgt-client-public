import Banner from "../components/Banner/banner";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("Home");
  return (
    <div>
      <Banner />
    </div>
  );
};
export default Home;
