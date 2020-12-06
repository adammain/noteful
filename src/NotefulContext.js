import React from 'react'

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  addFolder: () => {},
  deleteNote: () => {},
  addNote: () => {},
})

export default NotefulContext