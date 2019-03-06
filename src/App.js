import React, { Component } from 'react';
import moment from 'moment'
import './App.css';

const ministers = require("./ministers.json");
const treasuryBoardStartDate = "2018-02-12"

const daysSince = (dateString) => {
  const diff = moment().diff(moment(dateString))
  const duration = moment.duration(diff).asDays()
  return Math.floor(duration)
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
