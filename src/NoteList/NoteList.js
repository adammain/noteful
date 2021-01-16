import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import NoteItem from '../NoteItem/NoteItem'
import NotefulContext from '../NotefulContext'

import './NoteList.css'

class NoteList extends Component {
  static contextType = NotefulContext

  render() {
    const { notes } = this.context
    console.log({notes})
    const { folderId } = this.props.match.params
    console.log({folderId})
    const notesForFolder = folderId ? notes.filter(note => note.folderId === folderId) : notes
    console.log({notesForFolder})
    return (
      <div className='note-list'>
        {folderId &&         
          <Link to={`/add-note/${folderId}`}>
            Add Note
          </Link>
        }
        <ul className='note-list__list' aria-live='polite'>
          {notesForFolder.map(note => 
            <NoteItem
              key={note.id}
              {...note}
            />
          )}
        </ul>
      </div>
    )
  }
}

NoteList.propTypes = {
  match: PropTypes.object
}

export default NoteList


