import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/authContext";
import useAxiosSecure from "./useAxiosSecure";


const useType = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: type,
    isPending: isTypeLoading,
    isError,
  } = useQuery({
    queryKey: [user?.email, "type"],
    enabled: !loading,
    queryFn: async () => {
      console.log("asking for type", user);
      const res = await axiosSecure.get(
        import.meta.env.VITE_EXPRESS_API + `/users/get-user-type/${user.email}`
      );
      return res.data?.type;
    },
  });
  if (isError) {
    console.error("Error fetching type:", isError);
  }
  return [type, isTypeLoading];
};

export default useType;
