import React from "react";
import {
  BsCartCheck,
  BsClockHistory,
  BsFillCreditCardFill,
} from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";

const data = [
  {
    icon: <FaShippingFast size={30} color="#8cb4f5" />,
    heading: "Frete grátis",
    text: "Oferecemos frete grátis em produtos especiais",
  },
  {
    icon: <BsFillCreditCardFill size={30} color="#f7d272" />,
    heading: "Pagamento seguro",
    text: "Faça o pagamento seguro do seu produto.",
  },
  {
    icon: <BsCartCheck size={30} color="#fa82ea" />,
    heading: "Produtos de qualidade",
    text: "Vendemos produtos apenas de marcas testadas e comprovadas.",
  },
  {
    icon: <BsClockHistory size={30} color="#82fa9e" />,
    heading: "Suporte 24/7",
    text: "Obtenha acesso ao suporte de nossa equipe de suporte especializada",
  },
];

const HomeInfoBox = ({ icon, heading, text }) => {
  return (
    <div className="infoboxes --mb2">
      {data.map((item, index) => {
        return (
          <div className="infobox" key={index}>
            <div className="icon">{item.icon}</div>
            <div className="text">
              <h4>{item.heading}</h4>
              <p className="--text-sm">{item.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeInfoBox;
