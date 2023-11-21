import React from "react";
import Corousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./data";

export default function ProductCorousel({ products }) {
  return (
    <div>
      <Corousel
        showDots={false}
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={3000}
        customTransition="all 500ms ease"
        transitionDuration={1000}
      >{products}</Corousel>
    </div>
  );
}
