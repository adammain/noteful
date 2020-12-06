import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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

Header.defaultProps = {
  title: ''
}

Header.propTypes = {
  title: PropTypes.string
}