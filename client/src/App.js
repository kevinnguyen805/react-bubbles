import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import BubblePage from './components/BubblePage'
import Login from "./components/Login";
import ColorList from './components/ColorList'
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/protected" component={BubblePage}/>

        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
         
        </Switch>
      </div>
    </Router>
  );
}

export default App;
