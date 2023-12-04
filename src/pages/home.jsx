import { useEffect, useState } from "react";
import Banner from "../components/Banner/banner";
import FeatureSection from "../components/Others/feature";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useDocumentTitle from "../hooks/useDocumentTitle";
import TopDeliveryManSection from "../components/Others/deliveryManSection";

const Home = () => {
  useDocumentTitle("Home");
  const [data, setData] = useState({
    numberOfBookedParcels: 0,
    numberOfDeliveredParcels: 0,
    numberOfUsers: 0,
  });
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(import.meta.env.VITE_EXPRESS_API + "/statistics")
      .then((res) => {
        setData(res.data);
        setLoading(false)
      });
  }, [axiosSecure]);
  return (
  <div className="flex flex-col gap-10">
      <Banner />

      { loading === false ? <FeatureSection data={data}/> : ""}
     {/* {could not complete top manager due to time shortage} */}
    </div>
  );
};
export default Home;
