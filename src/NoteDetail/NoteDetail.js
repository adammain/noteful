import React, { Component } from 'react'
import NotefulContext from '../NotefulContext'
import './NoteDetail.css'

class NoteDetail extends Component {
  static contextType = NotefulContext

  render() {
    const { notes } = this.context
    const { noteId } = this.props.match.params
    const note = notes.find(note => note.id === noteId)
    let { content, modified, name } = note
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    }
    const dateModified = new Date(modified).toLocaleDateString('en-US', options)  
    return (
      <article>
        <div className='note-list__note-item'>
          <h3>{name}</h3>
          <span>Date modified on {dateModified} </span>
          <button className='note-item__button--delete'>Delete Note</button>
        </div>
        <div>
          <p>{content}</p>
        </div>
      </article>
    )
  }
}

export default NoteDetail

// notes={notes.find(note => note.id === routerProps.match.params.noteId)}
