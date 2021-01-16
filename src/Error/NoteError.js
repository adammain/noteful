import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NoteError extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {      
      return (
        <h2>Could not display folders.</h2>
      )
    }
    return this.props.children
  } 
}

NoteError.propTypes = {
  children: PropTypes.object
}



export default NoteError