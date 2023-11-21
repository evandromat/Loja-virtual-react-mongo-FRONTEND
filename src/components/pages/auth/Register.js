import { useDispatch, useSelector } from "react-redux";
import style from "./auth.module.css";
import loginImg from "../../../assets/login.png";
import Card from "../../card/Card";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../../utils";
import { RESET_AUTH, register } from "../../../redux/features/auth/authSlice";
import Loader from "../../loader/Loader";

const initialState = {
  name: "",
  email: "",
  password: "",
  cPassword: "",
};

export default function Register() {
  
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cPassword } = formData;
  const { isLoading, isLoggedIn, isSuccess } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !cPassword) {
      return toast.error("Todos os campos são obrigatórios");
    }
    if (password.length < 6) {
      return toast.error("A senha deve ter o mínimo de 6 caracteres...");
    }
    if (!validateEmail(email)) {
      return toast.error("Digite um email válido...");
    }
    if (password !== cPassword) {
      return toast.error("As senhas devem ser iguais...");
    }

    const userData = {
      name,
      email,
      password,
    };
    await dispatch(register(userData));
    setFormData(initialState);
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
        <Card>
          <div className={style.form}>
            <h2>Cadastrar</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Nome"
                required
                name={"name"}
                value={name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="email"
                required
                name={"email"}
                value={email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="senha"
                required
                name={"password"}
                value={password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="senha novamente"
                required
                name={"cPassword"}
                value={cPassword}
                onChange={handleInputChange}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Entrar
              </button>
            </form>
            <span className={style.register}>
              <p>Já tem uma conta?</p>
              <Link to="/login"> Login</Link>
            </span>
          </div>
        </Card>
        <div className={style.img}>
          <img src={loginImg} alt="login" width={"400"} />
        </div>
      </section>
    </>
  );
}
