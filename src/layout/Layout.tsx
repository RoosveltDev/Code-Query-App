import "./layout.css";
import Header from "../components/Menu/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className='layout-container'>
      {<Header />}
      <main>{<Outlet />}</main>
    </div>
  );
};

export default Layout;
