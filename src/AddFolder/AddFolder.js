import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import config from '../config'
import NotefulContext from '../NotefulContext'
import ValidationError from '../ValidationError/ValidationError'

import './AddFolder.css'

class AddFolder extends Component {
  static contextType = NotefulContext

  state = {
    folder: {
      name: '',
      touched: false
    }
  }
  validateName() {
    const name = this.state.folder.name.trim()
    if (name.length === 0) {
      return "Name is required";
    } 
  }
  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      folder: {
        name: e.target.name.value,
        touched: true
      }
    })
    const { folder } = this.state
    folder['id'] = uuidv4()
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      body: JSON.stringify(folder),
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
        this.context.addFolder(data)
        this.props.history.push('/')
      })
      .catch(error => console.log({error}))
  }
  updateName = name => {
    this.setState({
      folder: {
        name: name
      }
    })
  }
  render() {
    const nameError = this.validateName()
    return (
      <section className='add-folder__section'>
        <form className='add-folder__form' onSubmit={e => this.handleSubmit(e)}>
          <h2>Add Folder</h2>
          <input 
            type='text'
            className='add-folder__form-input'
            name='name'
            id='name'
            placeholder='Folder name'
            onChange={e => this.updateName(e.target.value)} />
          {this.state.folder.name.touched && <ValidationError message={nameError} />}
          <button 
            type='submit' 
            className='add-folder__button'
            disabled={this.validateName()}>
            Add
          </button>
        </form>
      </section>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object
};

export default AddFolder