
import './App.css';
import "./Styles.css";
import {Component} from 'react';
import {Switch, Route} from "react-router";
import Home from './components/Home';
import Movie from './components/Movie';

class App extends Component {

  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/movie/:title" component={Movie}/>
        </Switch>
      </div>
    );
  }
}

export default App;
