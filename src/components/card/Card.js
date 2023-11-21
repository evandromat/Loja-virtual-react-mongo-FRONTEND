import style from "./Card.module.css";
export default function Card({ children, cardClass }) {
  return (
    <div className={`${style.card} ${cardClass ? cardClass : ""}`}>
      {children}
    </div>
  );
}
