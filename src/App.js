import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import LogIn from './components/Login';
import CreateAcc from './components/CreateAccount';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CreateCollection from './components/CreateCollection';
import Settings from './components/Settings';
import CollectionInfo from './components/CollectionInfo';
import CraftPlace from './components/CraftPlace';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/users" exact component={Dashboard} />
          <Route path="/users/login" exact component={LogIn} />
          <Route path="/users/register" exact component={CreateAcc} />
          <Route path="/users/add" exact component={CreateCollection} />
          <Route path="/users/settings" exact component={Settings} />
          <Route path="/users/collection/:coll_id" exact component={CollectionInfo} />
          <Route path="/craft/:coll_id" exact component={CraftPlace} />
        </Router>
      </div>
    );
  }
}

export default App;
