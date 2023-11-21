import React, { useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { AiFillHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BiSolidStarHalf } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { useQuery } from "react-query";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import AliceCarousel from "react-alice-carousel";
import { GrPrevious, GrNext } from "react-icons/gr";
import "react-alice-carousel/lib/alice-carousel.css";
import "./galeria.css";
import { addItem, increaseItem } from "../../../redux/features/cart";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/product/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error("Erro ao buscar dados do produto...");
    }
  };

  const { data, error, isLoading } = useQuery("productData", fetchData);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return toast.error("Erro ao buscar dados do produto...");
  }

  const isNota = (nota) => data.ratings.some((item) => item.rating === Number(nota));

  const notaEsp = (nota) =>
    data.ratings.reduce((count, item) => (item.rating === Number(nota) ? count + 1 : count), 0);

  const widthBarra = (nota) => (notaEsp(nota) / data.ratings.length) * 100;

  const startCount = () => {
    const notasValidas = data.ratings.filter(
      (item) => item.hasOwnProperty("rating") && typeof item.rating === "number"
    );

    if (notasValidas.length > 0) {
      const totalNotas = notasValidas.reduce((total, item) => total + item.rating, 0);
      return totalNotas / notasValidas.length;
    } else {
      return 0;
    }
  };

  const addItemCart = (item) => {
    dispatch(addItem(item));
    dispatch(increaseItem(item._id));
    toast.success(`${item.name} adicionado ao carrinho`);
  };

  const items = data?.image?.map((item, i) => (
    <img src={item} key={i * 45} className={`item`} data-value={i + 1} />
  ));

  const thumbItems = (items, [setThumbIndex, setThumbAnimation]) =>
    items.map((item, i) => (
      <div
        key={i}
        className={`thumb`}
        onClick={() => (setThumbIndex(i), setThumbAnimation(true))}
      >
        {item}
      </div>
    ));

  const ProductImageGallery = () => {
    const [mainIndex, setMainIndex] = useState(0);
    const [mainAnimation, setMainAnimation] = useState(false);
    const [thumbIndex, setThumbIndex] = useState(0);
    const [thumbAnimation, setThumbAnimation] = useState(false);
    const [thumbs] = useState(thumbItems(items, [setThumbIndex, setThumbAnimation]));

    const slideNext = () => {
      if (!thumbAnimation && thumbIndex < thumbs.length - 1) {
        setThumbAnimation(true);
        setThumbIndex(thumbIndex + 1);
      }
    };

    const slidePrev = () => {
      if (!thumbAnimation && thumbIndex > 0) {
        setThumbAnimation(true);
        setThumbIndex(thumbIndex - 1);
      }
    };

    const syncMainBeforeChange = (e) => setMainAnimation(true);

    const syncMainAfterChange = (e) => {
      setMainAnimation(false);

      if (e.type === "action") {
        setThumbIndex(e.item);
        setThumbAnimation(false);
      } else {
        setMainIndex(thumbIndex);
      }
    };

    const syncThumbs = (e) => {
      setThumbIndex(e.item);
      setThumbAnimation(false);

      if (!mainAnimation) {
        setMainIndex(e.item);
      }
    };

    return [
      <div className="flex">
        <AliceCarousel
          animationDuration={800}
          animationType="fadeout"
          activeIndex={mainIndex}
          disableDotsControls
          disableButtonsControls
          items={items}
          mouseTracking={!thumbAnimation}
          onSlideChange={syncMainBeforeChange}
          onSlideChanged={syncMainAfterChange}
          touchTracking={!thumbAnimation}
        />
      </div>,
      <div className="thumbs">
        <div className="btn-prev" onClick={slidePrev}>
          <GrPrevious size={16} />
        </div>
        <AliceCarousel
          activeIndex={thumbIndex}
          autoWidth
          disableDotsControls
          disableButtonsControls
          items={thumbs}
          mouseTracking={false}
          onSlideChanged={syncThumbs}
          touchTracking={!mainAnimation}
        />
        <div className="btn-next" onClick={slideNext}>
          <GrNext size={16} />
        </div>
      </div>,
    ];
  };

  return (
    <div className="container">
      <section className={style.product}>
        <div className={style.card}>
          <h2>Detalhes do Produto</h2>
          <Link to="/shop">{"<-"} Voltar aos produtos</Link>
          <div className={style.details}>
            <div className={style.galeria}>
              <ProductImageGallery />
            </div>
            <div className={style.content}>
              <div className={style.title}>
                <h1>{data.name}</h1>
                {Array.from({ length: startCount() }).map((_, i) => (
                  <AiFillStar
                    key={i * 88}
                    size={20}
                    style={{ color: "var(--color-orange)" }}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={startCount().toFixed(1) + "/5"}
                  />
                ))}
                {!Number.isInteger(startCount()) && (
                  <BiSolidStarHalf
                    size={20}
                    style={{ color: "var(--color-orange)" }}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={startCount().toFixed(1) + "/5"}
                  />
                )}
              </div>
              <div className={style.property}>
                <h4>Preço:</h4>
                <p className={style.price}>{data.price}</p>
              </div>
              <div className={style.property}>
                <h4>SKU:</h4>
                <p>{data.sku}</p>
              </div>
              <div className={style.property}>
                <h4>Categoria:</h4>
                <p>{data.category}</p>
              </div>
              <div className={style.property}>
                <h4>Marca:</h4>
                <p>{data.brand}</p>
              </div>
              <div className={style.property}>
                <h4>Cor:</h4>
                <p>{data.color}</p>
              </div>
              <div className={style.flex}>
                <button
                  className="--btn --btn-primary"
                  onClick={() => addItemCart(data)}
                >
                  <BsCartCheck style={{ marginRight: "5px" }} size={16} />
                  Adcionar ao carrinhos
                </button>
                <button className="--btn --btn-danger">
                  <AiFillHeart style={{ marginRight: "5px" }} size={18} />
                  Adicionar a lista de desejos
                </button>
              </div>
              <p className={style.caracter}>Características do produto</p>
              <ul>
                {data.details.map((item, i) => (
                  <li key={i * 33}>{`${item}`}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={`${style.review} ${style.card}`}>
          <h2>Review do Produto</h2>
          {Array.from({ length: startCount() }).map((_, i) => (
            <AiFillStar
              key={i * 88}
              size={20}
              style={{ color: "var(--color-orange)" }}
              data-tooltip-id="my-tooltip"
              data-tooltip-content={startCount().toFixed(1) + "/5"}
            />
          ))}
          {!Number.isInteger(startCount()) && (
            <BiSolidStarHalf
              size={20}
              style={{ color: "var(--color-orange)" }}
              data-tooltip-id="my-tooltip"
              data-tooltip-content={startCount().toFixed(1) + "/5"}
            />
          )}
          ({data.ratings.length})
          <div className={style.grid}>
            <div className={style.graph}>
              {Array.from({ length: 5 }).map((item, index) => (
                <div key={index} className={style["graph-box"]}>
                  <div>
                    {Array.from({ length: index + 1 }).map((item) => (
                      <AiOutlineStar key={item} size={16} />
                    ))}
                  </div>
                  <div
                    className={style.barra}
                    style={{
                      width: `${isNota(index + 1) ? widthBarra(index + 1) : 0}%`,
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <div className={style.details}>
              {data.ratings.map((item, i) => (
                <div key={i * 66}>
                  <div>
                    {Array.from({ length: item.rating }).map((_, index) => (
                      <AiFillStar
                        key={index * 77}
                        size={20}
                        style={{ color: "var(--color-orange)" }}
                      />
                    ))}
                  </div>
                  <div>
                    <p className={style["review-coments"]}>{item.coment}</p>
                    <p className={style["review-date"]}>{item.date}</p>
                    <p className={style["review-user"]}>{item.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Tooltip id="my-tooltip" />
    </div>
  );
};

export default ProductDetail;
