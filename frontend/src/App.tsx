import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Signup from './screens/Signup'
import Signin from './screens/Signin'
import './app.css'

function App () {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
