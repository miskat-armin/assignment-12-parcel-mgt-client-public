import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/authContext";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isAdmin,
    isPending: isAdminLoading,
    isError,
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      console.log("asking or checking is admin", user);
      const res = await axiosSecure.get(
        import.meta.env.VITE_EXPRESS_API + `/users/admin/${user.email}`
      );
      return res.data?.admin;
    },
  });
  if (isError) {
    console.error("Error fetching isAdmin:", isError);
  }
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
