import style from "./auth.module.css";
import loginImg from "../../../assets/login.png";
import Card from "../../card/Card";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../../utils";
import { toast } from "react-toastify";
import { RESET_AUTH, login } from "../../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import React from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginForm = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Todos os campos são obrigatórios");
    }
    if (password.length < 6) {
      return toast.error("A senha deve ter o mínimo de 6 caracteres...");
    }
    if (!validateEmail(email)) {
      return toast.error("Digite um email válido...");
    }

    const userData = {
      email,
      password,
    };
    await dispatch(login(userData));

    setEmail("");
    setPassword("");
  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
      dispatch(RESET_AUTH());
    }
  }, [isSuccess, isLoggedIn, dispatch, navigate]);
  return (
    <>
      {isLoading && <Loader />}

      <section className={`container ${style.auth}`}>
        <div className={style.img}>
          <img src={loginImg} alt="login" width={"400"} />
        </div>
        <Card children={undefined} cardClass={undefined}>
          <div className={style.form}>
            <h2>Entrar</h2>
            <form onSubmit={loginForm}>
              <input
                type="text"
                placeholder="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Entrar
              </button>
            </form>
            <span className={style.register}>
              <p>Não tem uma conta?{` `} </p>
              <Link to="/register">Cadastrar</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
}
