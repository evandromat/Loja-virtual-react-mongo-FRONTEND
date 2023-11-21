import React from 'react'
import style from './Footer.module.css'


export default function Footer() {

const date = new Date()
const year = date.getFullYear()

  return (
        <div className={style.footer}>&copy; {year+" "} 
        Todos os direitos reservados</div>
  )
}
