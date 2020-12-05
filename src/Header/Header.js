import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

export default function Header(props) {
  return (
    <header className='header'>
      <Link to={'/'} className='header__title'>
        <h1>{props.title}</h1>
      </Link>
    </header>
  )
}