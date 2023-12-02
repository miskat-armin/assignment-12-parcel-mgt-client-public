import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer/footer";
import Header from "../components/Nav/navBar";

const Layout = () => {
  return (
    <div>
      <Header/>
      <div className="mx-auto min-h-screen">
        <Outlet/>
        <ToastContainer />
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;