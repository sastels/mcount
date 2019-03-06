import React, { Component } from 'react';
import './App.css';

const ministers = require("./ministers.json");
const treasuryBoardStartDate = "2018-02-12"

const daysSince = (dateString) => {
  return Math.floor((new Date() - new Date(dateString)) / (1000*60*60*24))
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { ministers }
  }

  render() {
    const ministerCount = this.state.ministers.length
    const currentMinister = this.state.ministers.slice(-1)[0]
    const daysSinceChange = daysSince(currentMinister.startDate)

    return (
      <div className="App">
        <h1>
          I have had {ministerCount} Ministers since joining Treasury Board
          on {treasuryBoardStartDate}.
        </h1>
        
        <h1>
          It has been {daysSinceChange} days since getting a new Minister.
        </h1>
      </div>
    );
  }
}

export default App;
