import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Signup from './screens/Signup'
import './app.css'

function App () {
  return (
    <div className='container'>
      <Router>
        <Switch>
          <Route path='/signup'>
            <Signup />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
