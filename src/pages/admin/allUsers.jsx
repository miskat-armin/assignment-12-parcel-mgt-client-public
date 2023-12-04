import React, { useEffect, useState } from 'react';

import UserList from '../../components/Table/UserList';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosSecure.get(import.meta.env.VITE_EXPRESS_API  + '/users/get-all-users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const makeDeliveryMen = (userId) => {
    Swal.fire({
      title: 'Make Delivery Man',
      text: 'Are you sure you want to make this user a Delivery Man?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make him a Delivery Man!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.put(import.meta.env.VITE_EXPRESS_API + `/users/update-user-type/${userId}`, { type: 'deliveryMen' }).then(() => {
          Swal.fire('Success!', 'User has been made a Delivery Man.', 'success');
        });
      }
    });
  };

  const makeAdmin = (userId) => {
    Swal.fire({
      title: 'Make Admin',
      text: 'Are you sure you want to make this user an Admin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, make him an Admin!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.put(import.meta.env.VITE_EXPRESS_API + `/users/update-user-type/${userId}`, { type: 'admin' }).then(() => {
          Swal.fire('Success!', 'User has been made an Admin.', 'success');
        });
      }
    });
  };

  return <UserList users={users} makeDeliveryMen={makeDeliveryMen} makeAdmin={makeAdmin} />;
};

export default AllUsers;
