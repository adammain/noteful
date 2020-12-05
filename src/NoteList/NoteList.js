import React, { Component } from 'react'
import NoteItem from '../NoteItem/NoteItem'
import NotefulContext from '../NotefulContext'

import './NoteList.css'

class NoteList extends Component {
  static contextType = NotefulContext

  render() {
    const { notes } = this.context
    const { folderId } = this.props.match.params
    const noteForFolder = folderId ? notes.filter(note => note.folderId === folderId) : notes
    return (
      <div className='note-list'>
        <ul className='note-list__list' aria-live='polite'>
          {noteForFolder.map(note => 
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

export default NoteList


  // const {folderId} = routerProps.match.params
  // const notesForFolder = 
  //   folderId 
  //     ? notes.filter(note => note.folderId === folderId) 
  //     : notes
  // return <NoteList 
  //   notes={notesForFolder} />

