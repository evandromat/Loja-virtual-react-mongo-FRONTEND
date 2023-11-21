import React, { useEffect } from "react";
import Slider from "../../slider/Slider";
import HomeInfoBox from "./HomeInfoBox";
import { CgAddR } from "react-icons/cg";
import "./Home.css";
import { productData } from "../../corousel/data";
import CorouselItem from "../../corousel/CorouselItem";
import ProductCorousel from "../../corousel/Corousel";
import ProductCategory from "./ProductCategory";
import FooterLinks from "../../footer/FooterLinks";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/features/auth/authSlice";


const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <div className="--flex-between">
        <h2 className="--fw-thin">{heading}</h2>
        <button className="--btn">
          {btnText}
          <CgAddR className="bt-icon" />
        </button>
      </div>
      <div className="--hr"></div>
    </>
  );
};

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const productss = productData.map((item, i) => {
    return (
      <div key={item.id}>
        <CorouselItem
        id={item.id}
          name={item.name}
          url={item.imageurl}
          price={item.price}
          description={item.description}
        />
      </div>
    );
  });
  // const token = localStorage.getItem("token");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user === null || user === "undefined") {
      if (token !== null) {
        dispatch(getUser(token));
      }
    }
  }, [dispatch, user]);
  return (
    <>
      <Slider />
      <section>
        <div className="container">
          <HomeInfoBox />
          <PageHeading heading={"Ultimos produtos"} btnText={"Ver Mais"} />
          <ProductCorousel products={productss} />
        </div>
      </section>
      <section className="--bt-grey">
        <div className="container">
          <PageHeading heading={"Categorias"} btnText={"Ver Mais"} />
          <ProductCategory />
        </div>
      </section>
      <FooterLinks />
    </>
  );
};

export default Home;
