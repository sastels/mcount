import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const ministerCount = 2
    const daysSinceChange = 4
    const startDate = "2018-02-12"
    return (
      <div className="App">
      <h1>
        I have had {ministerCount} Ministers since joining Treasury Board in {startDate}
        </h1>
        <h1>
          It has been {daysSinceChange} since getting a new Minister
        </h1>
      </div>
    );
  }
}

export default App;
