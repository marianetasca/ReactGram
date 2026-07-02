import "./Navbar.css";

// components
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { HiOutlineHome, HiOutlineCamera, HiOutlineUser } from "react-icons/hi";

// hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// redux
import { logout, reset } from "../slices/authSlice";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav id="nav" className="">
      <div className="logo-container">
        <Link to="/" id="logo">
          ReactGram <div className="logo-dot"></div>
        </Link>
      </div>

      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch className="" />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <ul id="nav-links" className="">
        {auth ? ( //autenticado
          <>
            <li className="">
              <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "nav-link"}>
                <HiOutlineHome/>
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink to={`/users/${user._id}`} className={({ isActive }) => isActive ? "active-link" : "nav-link"}>
                  <HiOutlineCamera />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile" className={({ isActive }) => isActive ? "active-link" : "nav-link"}>
                <HiOutlineUser/>
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout} className="logout">
                Sair
              </span>
            </li>
          </>
        ) : (
          // nao autenticado
          <>
            <li className="">
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li className="">
              <NavLink to="/register">Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
