// DeliveryMenList.js
import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllDeliveryMen = () => {
  const axiosSecure = useAxiosSecure();
  const [deliveryMen, setDeliveryMen] = React.useState([]);

  React.useEffect(() => {
    // Fetch delivery men data from the server
    axiosSecure.get(import.meta.env.VITE_EXPRESS_API + '/users/delivery-men').then((response) => {
      setDeliveryMen(response.data);
    });
  }, [axiosSecure]);

  return (
    <div>
      <h1>All Delivery Men</h1>
      <table className="min-w-full bg-white border border-gray-300">
        {/* Table Header */}
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-r border-gray-300">Delivery Man's Name</th>
            <th className="py-2 px-4 border-r border-gray-300">Phone Number</th>
            <th className="py-2 px-4 border-r border-gray-300">Number of Parcels Delivered</th>
            <th className="py-2 px-4">Average Review</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {deliveryMen.map((deliveryMan) => (
            <tr key={deliveryMan._id} className="border-b border-gray-300">
              <td className="py-2 px-4 border-r border-gray-300">{deliveryMan.username}</td>
              <td className="py-2 px-4 border-r border-gray-300">{deliveryMan.phone}</td>
              <td className="py-2 px-4 border-r border-gray-300">{deliveryMan.numberOfParcelsDelivered}</td>
              <td className="py-2 px-4">{deliveryMan.averageReview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDeliveryMen;
