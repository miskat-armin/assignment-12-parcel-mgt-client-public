import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer/footer";
import Header from "../components/Nav/navBar";

const Layout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <div>
      {noHeaderFooter || <Header />}
      <div className="mx-auto min-h-screen">
        <Outlet />
        <ToastContainer />
      </div>
      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default Layout;
