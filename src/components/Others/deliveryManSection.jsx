import { useEffect, useState } from "react";
import TopDeliveryManCard from "../Card/deliveryManCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TopDeliveryManSection = () => {
    const [topDeliveryMen, setTopDeliveryMen] = useState()
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(import.meta.env.VITE_EXPRESS_API + "/users/get-users-details")
        .then(res => {
            console.log(res.data)
            setTopDeliveryMen(res.data)
        })
    },[axiosSecure])
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-4">Top Delivery Men</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {topDeliveryMen?.map((deliveryMan, index) => (
            <TopDeliveryManCard
              key={index}
              name={deliveryMan.name}
              image={deliveryMan.image}
              parcelsDelivered={deliveryMan.parcelsDelivered}
              averageRatings={deliveryMan.averageRatings}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default TopDeliveryManSection;