import { Outlet, Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Layout = () => {
  return (
    <>
      <nav className="header-menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-category">Add Category</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
