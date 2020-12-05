import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Header from './Header/Header'
import FolderList from './FolderList/FolderList'
import NoteList from './NoteList/NoteList'
import NoteDetail from './NoteDetail/NoteDetail'
import NotefulContext from './NotefulContext'
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
  deleteNote = noteId => {
    const notes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({notes})
  }
  renderFolderList() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
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
          path='/note/:noteId'
          component={NoteDetail}
        />
      </>
    )
  }
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    }
    return (
      <div>
        <Header title={'Noteful'} />   
        <NotefulContext.Provider value={contextValue}>
          <nav>{this.renderFolderList()}</nav>
          <main className='main'>{this.renderMain()}</main>
        </NotefulContext.Provider>
      </div>
    )
  }
}

export default App