import React from "react";
import style from "./Loader.module.css";
import ReactDOM from "react-dom";
import loaderImg from "../../assets/loader.gif";


export const Spinner = ()=>{
    return (
        <div className="--center-all">
            <img src={loaderImg} alt="loading..." width={40} />
        </div>
    )
}

export default function Loader() {
  return (
    <>
      {ReactDOM.createPortal(
        <div className={style.wrapper}>
          <div className={style.loader}>
            <img src={loaderImg} alt="loading..." />
          </div>
        </div>,
        document.getElementById("loader")
      )}
    </>
  );
}
