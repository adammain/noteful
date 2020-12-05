import React from 'react'
import { NavLink } from 'react-router-dom'

import './Folder.css'

export default function Folder(props) {  
  return (
    <li className='folder-list__folder'>
        <NavLink 
          to={`/folder/${props.folder.id}`} 
          className={`folder-list__folder--button`}>
            <h3>{props.folder.name}</h3>
        </NavLink>
    </li>
  )
}

Folder.defaultProps = {
  folder: {},
}
