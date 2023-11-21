import React from 'react'
import './Carousel.css'
import { Link } from 'react-router-dom'
import { shortenText } from '../../utils'
export default function CorouselItem({url,name,price,desc,description,id}) {
  return (
    <div className='carouselItem'>
        <Link to={`/product-details/${id}`}>
            <img src={url} className='product--image' alt="product" />
            <p className="price">{`R$${price}`}</p>
            <h4>{shortenText(name,18)}</h4>
            <p className="--mb">{shortenText(description,26)}</p>
        </Link>
        <button className='--btn --btn-primary --btn-block'>
            Adcionar ao Carrinho
        </button>
    </div>
  )
}
