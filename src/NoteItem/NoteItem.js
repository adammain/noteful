import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NotefulContext from '../NotefulContext'

import './NoteItem.css'

class NoteItem extends Component {
  static contextType = NotefulContext
  static defaultProps = {
    name: '',
    modified: ''
  }

  handleDeleteNote = e => {
    const noteId = this.props.id
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        } else {
          return res.json()
        }
      })
      .then(data => {
        this.context.deleteNote(noteId)
      })
      .catch(err => console.log('there has been an error.', err))
  }
  
  render() {
    // const { deleteNote } = this.context
    const { name, modified } = this.props
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    }
    const dateModified = new Date(modified).toLocaleDateString('en-US', options)
    return (
      <li className='note-list__note-item'>
        <Link to={`/note/${this.props.id}`}>
          <h3>{name}</h3>
          <span>Date modified on {dateModified} </span>
        </Link>
        <button 
            className='note-item__button--delete'
            onClick={this.handleDeleteNote}
          >
            Delete Note
          </button>
      </li>
    )
  }
}

export default NoteItem
