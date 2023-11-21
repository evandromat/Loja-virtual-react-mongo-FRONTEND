import React, { useState } from "react";
import style from "./Cart.module.css";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  increaseItem,
  decreaseItem,
  removeAllItems,
} from "../../../redux/features/cart";
import { toast } from "react-toastify";

export default function Cart() {
  const [cupom, setCupom] = useState(false);
  const dispatch = useDispatch();
  const produto = useSelector((state) => state.cart);
  const length = useSelector((state) => state.cart.length);
  const removeItemCart = (id) => {
    dispatch(removeItem(id));
  };

  const increItem = (id) => {
    dispatch(increaseItem(id));
  };
  const decreItem = (id) => {
    dispatch(decreaseItem(id));
  };
  const liparCarrinho = () => {
    dispatch(removeAllItems());
    toast.success("Ítens removidos do carrinho");
  };
  const calcularTotal = () => {
    return produto
      .reduce((total, item) => total + item.price * item.qtd, 0)
      .toFixed(2)
      .toLocaleString("pt-BR", {
        currency: "BRL",
        style: "currency",
        minimumFractionDigits: 2,
      });
  };
  const validaCumpom = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <section>
        <div className={style.card}>
          <div className={style.table}>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Total</th>
                  <th>Ação</th>
                </tr>
              </thead>
              {length === 0 && (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Seu carrinho está vazio...</td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              {produto.map((item, i) => {
                return (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>
                      <tr style={{ borderBottom: "none" }}>{item.name}</tr>
                      <tr
                        style={{
                          backgroundColor: "transparent",
                          borderBottom: "none",
                        }}
                      >
                        <img
                          src={item.image[0]}
                          style={{ width: "60px", height: "60px" }}
                          alt=""
                        />
                      </tr>
                    </td>
                    <td>1</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "row",
                        }}
                      >
                        <button
                          onClick={() => decreItem(item._id)}
                          className={`--btn ${style["-btn"]}`}
                        >
                          -
                        </button>
                        <input
                          style={{ marginRight: "5px", textAlign: "center" }}
                          value={item.qtd}
                          type="text"
                        />
                        <button
                          onClick={() => increItem(item._id)}
                          className={`--btn ${style["-btn"]}`}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>1</td>
                    <td>
                      <FaTrashAlt
                        onClick={() => removeItemCart(item._id)}
                        className={style.icons}
                      />
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
        <div className={style["btn-clear"]}>
          {length !== 0 ? (
            <button
              onClick={() => liparCarrinho()}
              className="--btn --btn-danger"
            >
              Limpar carrinho
            </button>
          ) : (
            <Link style={{ marginTop: "10px" }} to="/shop">
              {`<-- `}Continuar na loja
            </Link>
          )}
        </div>
        <div className={style["card-div"]}>
          <div className={style["card-sub"]}>
            <div className={style.card}>
              <h4>Íten(s) no carrinho: {length}</h4>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>Sub-Total:</h4>
                <h3 className={style.text}>{calcularTotal()}</h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>Tem Cumpom?</p>
                <p>
                  <Link
                    onClick={() => setCupom(!cupom)}
                    className={style.linkCumpon}
                    to={"#"}
                  >
                    Adcione aqui
                  </Link>
                </p>
              </div>
              {cupom && (
                <form
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "10px",
                  }}
                  className="--form-control"
                >
                  <input type="text" />
                  <button
                    className="--btn --btn-primary"
                    onClick={(e) => validaCumpom(e)}
                  >
                    Verificar
                  </button>
                </form>
              )}
              <div>
                <p>Por favor escolha o modo de pagamento</p>
                <form>
                  <div className={`${style.card} ${style.pag}`}>
                    <input type="radio" name="pagamento-metodo" />
                    <p>Stripe</p>
                    <br />
                  </div>
                  <div className={`${style.card} ${style.pag}`}>
                    <input type="radio" name="pagamento-metodo" />
                    <p>PIX</p>
                    <br />
                  </div>
                  <div className={`${style.card} ${style.pag}`}>
                    <input type="radio" name="pagamento-metodo" />
                    <p>Cartão</p>
                    <br />
                  </div>
                  <div className={`${style.card} ${style.pag}`}>
                    <input type="radio" name="pagamento-metodo" />
                    <p>Paypal</p>
                    <br />
                  </div>
                  <button
                    style={{ marginTop: "15px" }}
                    className="--btn --btn-primary --btn-block"
                  >
                    Continuar com pagamento
                  </button>
                </form>
                <p style={{ marginTop: "5px" }}>
                  *Frete e taxas na próxima página.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
