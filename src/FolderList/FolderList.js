import React, { Component } from 'react'
import NotefulContext from '../NotefulContext'
import Folder from '../Folder/Folder'

import './FolderList.css'

class FolderList extends Component {
  static contextType = NotefulContext

  renderFolderList(folders) {
    return (
      <ul className='sidebar__folder-list'>
        {folders.map(folder => 
          <Folder 
            key={folder.id} 
            folder={folder} />
        )}
      </ul>
    )

  }
  renderSingleFolder(folder) {
    return (
      <>
        <button onClick={() => this.props.history.goBack()}>BACK</button>
        <Folder folder={folder} />
      </>
    )
  }
  render() {
    let { folders, notes } = this.context
    let singleFolder
    if (this.props.match.params) {
      const { noteId } = this.props.match.params
      const note = noteId ? notes.find(note => note.id === noteId) : {}
      singleFolder = folders.find(folder => folder.id === note.folderId)
    }
    return (
      <section className='sidebar'>
        {singleFolder && this.renderSingleFolder(singleFolder)}
        {!singleFolder && this.renderFolderList(folders)}
        <button className='folder-list__button--Add'>
          Add Folder
        </button>
      </section>
    )
  }
}

export default FolderList