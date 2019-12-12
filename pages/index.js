import React from 'react'
import Link from 'next/link'
import Router from 'next/router';

class Home extends React.Component {
  componentDidMount() {
    Router.push('/dashboard')
  }
  render() {
    return (
      <div></div>
    )
  }
}

export default Home
