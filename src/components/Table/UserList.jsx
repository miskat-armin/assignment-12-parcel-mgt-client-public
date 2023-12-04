// UserList.js

import React from "react";

const UserList = ({ users, makeDeliveryMen, makeAdmin }) => {
  return (
    <div className="container mx-auto my-10">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Number of Parcel Booked</th>
            <th className="py-2 px-4 border-b">Total Spent Amount</th>
            <th className="py-2 px-4 border-b">Make Delivery Men</th>
            <th className="py-2 px-4 border-b">Make Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">
                {user.phone || "Not found"}
              </td>
              <td className="py-2 px-4 border-b">
                {user.parcelCount || "No orders"}
              </td>
              <td className="py-2 px-4 border-b">{user.totalAmountSpent}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => makeDeliveryMen(user._id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Make Delivery Men
                </button>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                 
                  onClick={() => makeAdmin(user._id)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
