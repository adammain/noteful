import React, { Component } from  'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import NotefulContext from '../NotefulContext'
import config from '../config'
import './AddNote.css'

const Required = () => (
  <span className='AddNote__required'>*</span>
)

class AddNote extends Component {
  static contextType = NotefulContext

  state = {
    error: null
  }

  getFolderId(name) {
    let folder = this.context.folders.find(folder => folder.name === name)
    return folder.id
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, content, folder } = e.target
    const uuid = uuidv4()
    const note = {
      id: uuid,
      name: name.value,
      modified: new Date(),
      content: content.value,
      folder_id: this.getFolderId(folder.value),
    }
    this.setState({ error: null })
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        name.value = ''
        content.value = ''
        folder.value = ''
        this.context.addNote(data)
        this.props.history.goBack()
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  }

  renderFolderDropdownOptions(folder, key) {
    if (folder.id === this.props.match.params.folderId) {
      return <option key={key} selected>{folder.name}</option>
    } else {
      return <option key={key}>{folder.name}</option>
    }
  }

  render() {
    const { error } = this.state
    return (
      <section className='AddNote'>
        <h2>Add a Note</h2>
        <form
          className='AddNote__form'
          onSubmit={this.handleSubmit}
        >
          <div className='AddNote__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='name'>
              Name
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Work'
              required
            />
          </div>
          <div>
            <label htmlFor='content'>
              Content
            </label>
            <textarea
              name='content'
              id='content'
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Folder
              {' '}
              <Required />
            </label>
            <select
              type='number'
              name='folder'
              id='folder'
              required >
              {this.context.folders.map((folder, i) => 
                this.renderFolderDropdownOptions(folder, i)
              )}
            </select>
          </div>
          <div className='AddBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    )
  }
}

AddNote.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}

export default AddNote
