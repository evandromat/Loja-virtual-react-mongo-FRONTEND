import React from "react";
import { NavLink } from "react-router-dom";
import "./PageMenu.css";
export default function PageMenu() {
  return (
    <div>
      <nav className="--bg-primary --p --mb">
        <ul className="home-links">
          <li>
            <NavLink to="/profile">Perfil</NavLink>
          </li>
          <li>
            <NavLink to="/wallet">Meus Pedidos</NavLink>
          </li>
          <li>
            <NavLink to="/wishlist">Lista de Desejos</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
