import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import News from './screens/News'
import Submit from './screens/Submit'
import Signin from './screens/Signin'
import Signup from './screens/Signup'
import './app.css'

function App () {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <News />
        </Route>
        <Route path='/submit'>
          <Submit />
        </Route>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/news/:page'>
          <News />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
