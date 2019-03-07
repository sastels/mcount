/** @jsx jsx */
import { Component } from 'react';
import moment from 'moment'
import { css, jsx } from '@emotion/core'

const ministers = require("./ministers.json");

const appStyle = css`
  font-family: "Comic Sans MS", cursive, sans-serif;
  text-align: center;
  margin: 100px;
`

const headerStyle = css` 
  padding: 50px;
  font-weight: 400;
`

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
    const currentMinister = this.state.ministers.slice(-1)[0]
    const daysSinceChange = daysSince(currentMinister.startDate)

    return (
      <div css={appStyle}>
        <h1 css={headerStyle}>
          It has been {daysSinceChange} days since getting a new Minister.
        </h1>
      </div>
    );
  }
}

export default App;
