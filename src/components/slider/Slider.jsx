import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import "./Slider.css";
export default function Slider() {
  const [currentSlider, setcurrentSlider] = useState(0);
  const navigate = useNavigate();

  const slideLength = sliderData.length;
  const autoScroll = true;
  let slideInterval
  const internvalTime = 5000

  const prevSlide = () => {
    setcurrentSlider(
      currentSlider === 0 ? currentSlider - 1 : currentSlider - 1
    );
  };
  const nextSlide = () => {
    setcurrentSlider(currentSlider === slideLength - 1 ? 0 : currentSlider + 1);
  };
useEffect(()=>{
setcurrentSlider(0)
},[])
useEffect(()=>{
    if(autoScroll){
        const auto =()=>{
            slideInterval = setInterval(nextSlide,internvalTime)
        }
        auto()
    }
    return ()=>clearInterval(slideInterval)
},[currentSlider,internvalTime,autoScroll])
  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, i) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={i}
            className={i === currentSlider ? "slide current" : "slide"}
          >
            {i === currentSlider && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <span className="span1"></span>
                  <span className="span2"></span>

                  <span className="span3"></span>
                  <span className="span4"></span>
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <button
                    className="--btn --btn-primary"
                    onClick={() => navigate("/shop")}
                  >
                    Ver mais
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
