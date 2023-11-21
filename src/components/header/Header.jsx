import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import style from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, logout } from "../../redux/features/auth/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddensLink/hiddenLink";
import { primeiroNome } from "../../utils";


export const UserName = () => {
  const { user } = useSelector((state) => state.auth);
  const username = user?.name || "...";
  const url = user?.photo || "";
  const newURL = url.replace("/upload/", "/upload/w_20/");
 
  return (
    <>
      <img
        style={{
          borderRadius: "50%",
          marginBottom: "-5px",
          border: "1px solid 	#FF4500",
        }}
        src={newURL}
        alt="avatar"
      />
      <span style={{ color: "#ff7722" }}>Oi, {primeiroNome(username)} </span>
    </>
  );
};
export const logo = (
  <div className={style.logo}>
    <Link to="/">
      <h2>
        Q <span>Bonita</span>.
      </h2>
    </Link>
  </div>
);
const activeLink = ({ isActive }) => (isActive ? `${style.active}` : "");

export default function Header() {
  const [showMenu, setshowMenu] = useState(false);
  const [scrollPage, setScrollPage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const length = useSelector((state) => state.cart.length);
  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };
  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(true);
    }
  };
  window.addEventListener("scroll", fixNavbar);

  const toggleMenu = () => {
    setshowMenu(!showMenu);
  };
  const hideMenu = () => {
    setshowMenu(false);
  };

  const cart = (
    <span className={style.cart}>
      <Link to={"/cart"}>
        Carrinho
        <FaShoppingCart size={20} />
        <p>{length}</p>
      </Link>
    </span>
  );
  return (
    <header className={scrollPage ? `${style.fixed}` : null}>
      <div className={style.header}>
        {logo}
        <nav
          className={showMenu ? `${style["show-nav"]}` : `${style["hide-nav"]}`}
        >
          <div
            className={
              showMenu
                ? `${style["nav-wrapper"]} ${style["show-nav-wrapper"]}`
                : `${style["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>
          <ul>
            <li className={style["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/shop" className={activeLink}>
                Loja
              </NavLink>
            </li>
          </ul>

          <div className={style["header-right"]}>
            <span className={style.links}>
              <ShowOnLogin>
                <NavLink Link to="/login" className={activeLink}>
                  {/* <FaUserCircle size={16} color="#ff7722" /> */}
                  <UserName />
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogout>
                <NavLink Link to="/login" className={activeLink}>
                  Entrar
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogout>
                <NavLink to="/register" className={activeLink}>
                  Cadastrar
                </NavLink>
              </ShowOnLogout>
              <ShowOnLogin>
                <NavLink to="/order-history" className={activeLink}>
                  Meus Pedidos
                </NavLink>
              </ShowOnLogin>
              <ShowOnLogin>
                <NavLink to="/" onClick={logoutUser}>
                  Sair
                </NavLink>
              </ShowOnLogin>
            </span>
            {cart}
          </div>
        </nav>
        <div className={style["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
}
