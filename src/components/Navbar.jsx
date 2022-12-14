import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../modules/authcontext";
import { Home, Profile, Login, About } from "./../pages/index";
import "./../styles/components/navbar.css";
import { BiLogOut } from "react-icons/bi";

//test
import { ConfirmationModal } from "./index";

const Navbar = () => {
  const { user, setUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser("");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="links-container">
      {user ? (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "link")}
            to="/"
            element={<Home />}
          >
            {" "}
            Home
          </NavLink>{" "}
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "link")}
            to="/about"
            element={<About />}
          >
            About{" "}
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "link")}
            to="/profile"
            element={<Profile />}
          >
            {" "}
            Profile
          </NavLink>{" "}
          <ConfirmationModal
            title="Confirm"
            description="Are you sure?"
            callbackFunction={logout}
          >
            {(confirm) => (
              <div className="logout-container">
                <button className="logout-btn" onClick={confirm(logout)}>
                  <BiLogOut className="logout-icon" />
                </button>
              </div>
            )}
          </ConfirmationModal>
        </>
      ) : (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "link")}
            to="/"
            element={<Home />}
          >
            {" "}
            Home
          </NavLink>{" "}
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "link")}
            to="/about"
            element={<About />}
          >
            About{" "}
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "link")}
            to="/login"
            element={<Login />}
          >
            {" "}
            Login
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
