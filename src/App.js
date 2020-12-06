import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './Header/Header'
import FolderList from './FolderList/FolderList'
import NoteList from './NoteList/NoteList'
import NoteDetail from './NoteDetail/NoteDetail'
import NotefulContext from './NotefulContext'
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'
import FolderError from './Error/FolderError'
import NoteError from './Error/NoteError'
import config from './config';

import './App.css'

class App extends Component {
  state = {
    folders: [],
    notes: [],
  }
  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/folders`),
      fetch(`${config.API_ENDPOINT}/notes`)
    ])
      .then(([foldersRes, notesRes]) => {
        if (!foldersRes.ok) {
          return foldersRes.json().then(e => Promise.reject(e))
        }
        if (!notesRes.ok) {
          return notesRes.json().then(e => Promise.reject(e))
        } 
          return Promise.all([foldersRes.json(), notesRes.json()])
      })
      .then(([folders, notes]) => {
        this.setState({folders, notes})
      })
      .catch(err => console.log({err}))
  }
  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder ]
    })
  }
  addNote = note => {
    console.log({note})
    this.setState({
      notes: [...this.state.notes, note ]
    })
  }
  deleteNote = noteId => {
    const notes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({notes})
  }
  renderFolderList() {
    return (
      <>
        {['/', '/add-note', '/add-note/:folderId', '/folder/add-folder', '/folder/:folderId'].map(path => (
            <Route 
              exact 
              path={path}
              key={path}
              component={FolderList}
            />  
        ))}
        <Route 
          path={'/note/:noteId'}
          component={FolderList}
        />
      </>
    )
  }
  renderMain() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact 
            path={path}
            key={path}
            component={NoteList}
          />
        ))}
        <Route
          exact
          path='/note/:noteId'
          component={NoteDetail}
        />
        <Route
          exact
          path='/folder/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note/:folderId'
          component={AddNote}
        />
      </>
    )
  }
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addFolder: this.addFolder,
      addNote: this.addNote,
      deleteNote: this.deleteNote
    }
    return (
      <div>
        <Header title={'Noteful'} />   
        <NotefulContext.Provider value={contextValue}>
          <FolderError>
            <nav>{this.renderFolderList()}</nav>
          </FolderError>
          <NoteError>
            <main className='main'>{this.renderMain()}</main>
          </NoteError>
        </NotefulContext.Provider>
      </div>
    )
  }
}

export default App