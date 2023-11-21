import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logoImg from "../../assets/shopito_logo.png";
import stily from "./FooterLinks.css";

export default function FooterLinks() {
  return (
    <>
      <section className="contact-section">
        <div className="container contact">
          <div className="contact-icon">
            <FaFacebookF className="i" />
            <FaTwitter className="i" />
            <FaInstagram className="i" />
            <FaYoutube className="i" />
          </div>
          <h2>Vamos Conversar?</h2>
        <a href="#home" className="btn btn-dark">Faça uma pergunta</a>
        </div>
        
      </section>
      <section className="footer-section">
        <div className="container footer">
          <div className="footer-logo">
            <img src={logoImg} alt="logo" />
          </div>
          <div className="footer-menu">
            <p className="link-heading">Características</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Link shortening</a>
              </li>
              <li>
                <a href="#home">Brands Link</a>
              </li>
              <li>
                <a href="#home">Analitics</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Resouces</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Link shortening</a>
              </li>
              <li>
                <a href="#home">Brands Link</a>
              </li>
              <li>
                <a href="#home">Analitics</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Company</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Link shortening</a>
              </li>
              <li>
                <a href="#home">Brands Link</a>
              </li>
              <li>
                <a href="#home">Analitics</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Paternrs</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Link shortening</a>
              </li>
              <li>
                <a href="#home">Brands Link</a>
              </li>
              <li>
                <a href="#home">Analitics</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
