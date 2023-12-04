import React from "react";
import { FaShieldAlt, FaTruck, FaUsers } from "react-icons/fa";
import FeatureCard from "../Card/featureCard";

const FeatureSection = ({ data }) => {
  return (
    <div>
      {/* Features Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "30px",
        }}
      >
        <FeatureCard
          title="Real-Time Parcel Tracking"
          description="Stay connected with your shipments using our cutting-edge real-time tracking feature, providing users with instant updates on their parcel's journey from booking to delivery."
          count={data.numberOfBookedParcels}
          icon="1.png"
          countText={"Number of booked parcels"}
        />

        {/* Feature Card 2 - Super Fast Delivery */}
        <FeatureCard
          title="Super Fast Delivery"
          description="
          Experience lightning-fast deliveries with our Super Fast Delivery feature, ensuring your parcels reach their destination swiftly and efficiently."
          icon="2.png"
          count={data.numberOfDeliveredParcels}
          countText={"Number of Delivered Parcels"}
        />

        {/* Feature Card 3 - Another Feature */}
        <FeatureCard
          title="Community-Powered Parcel Network"
          description={
            "Join a dynamic community of users leveraging our platform for secure and efficient parcel management, contributing to a reliable network that prioritizes safety, speed, and seamless user experiences."
          }
          icon="3.png"
          count={data.numberOfUsers}
          countText={"Number of users"}
        />
      </div>
    </div>
  );
};

export default FeatureSection;
