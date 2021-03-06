import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import * as api from '../api'

import Code from './Code'


export default class Topic extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.match.params.topic,
      topic: {},
      code: [],
      active: []
    }
  }

  componentDidMount () {
    console.log(this.state.name)
    api.getTopic(this.state.name, (error, topic) => {
      if (error) {
        console.log(error)
      } else {
        this.setState({topic})
      }
    })
    api.listCode(this.state.name, (error, code) => {
      if (error) {
        console.log(error)
      } else {
        this.setState({code})
      }
    })
  }

  componentWillReceiveProps () {
    window.location.reload()
  }

  toggleActive (id) {
    var index = this.state.active.indexOf(id)
    if (index === -1) {
      this.state.active.push(id)
    } else {
      this.state.active.pop(index)
    }
  }

  isActive (id) {
    return this.state.active.indexOf(id) > -1
  }

  listCode () {
    return (
      this.state.code.map((code) => {
         return <Code key={code.code_id} id={code.code_id} toggle={this.toggleActive.bind(this)} isActive={this.isActive.bind(this)} />
      })
    )
  }

  renderList () {
    return (
      <div>
        {this.listCode()}
      </div>
    )
  }

  render () {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h3>{this.state.topic.description}</h3>
        {this.renderList()}
      </div>
    )
  }

}
