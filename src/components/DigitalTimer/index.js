// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {time: 25, timerStarted: false, seconds: 0}

  increaseMin = () => {
    const {timerStarted} = this.state
    if (timerStarted === false) {
      this.setState(prevState => ({
        time: prevState.time + 1,
      }))
    }
  }

  startOrstop = () => {
    const {timerStarted, time, seconds} = this.state
    const isTimeCompleted = seconds === time * 60

    if (isTimeCompleted) {
      this.setState({seconds: 0})
    }
    if (timerStarted) {
      clearInterval(this.stopClock)
    } else {
      this.timer = setInterval(this.stopClock, 1000)
    }
    this.setState(prevState => ({
      timerStarted: !prevState.timerStarted,
    }))
  }

  componentWillUnmount = () => {
    this.stopTimer()
  }

  stopTimer = () => {
    clearInterval(this.timer)
  }

  stopClock = () => {
    const {time, seconds, timerStarted} = this.state
    const isTimeCompleted = seconds === time * 60
    if (isTimeCompleted) {
      this.setState({
        timerStarted: false,
      })
      this.stopTimer()
    } else if (timerStarted === true) {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1,
      }))
    } else {
      this.stopTimer()
    }
  }

  decreaseMin = () => {
    const {time, timerStarted} = this.state
    if (time > 1 && timerStarted === false) {
      this.setState(prevState => ({
        time: prevState.time - 1,
      }))
    }
  }

  resetClock = () => {
    this.setState({
      time: 25,
      seconds: 0,
      timerStarted: false,
    })
    this.stopTimer()
  }

  gettingTime = () => {
    const {time, seconds} = this.state
    const totalRemainingSeconds = time * 60 - seconds
    const resultminutes = Math.floor(totalRemainingSeconds / 60)
    const resultseconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes =
      resultminutes > 9 ? resultminutes : `0${resultminutes}`
    const stringifiedSeconds =
      resultseconds > 9 ? resultseconds : `0${resultseconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {time, timerStarted} = this.state
    const buttonStatus = timerStarted ? 'Pause' : 'Start'
    const buttonImage = timerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png '
    const altIs = timerStarted ? 'pause icon' : 'play icon'
    const timeStatus = timerStarted ? 'Running' : 'Paused'
    return (
      <div className="digital-timer-bg-container">
        <h1 className="digital-timer-heading">Digital Timer</h1>
        <div className="digital-timer-bg-img-container">
          <div className="digital-timer-bg-img">
            <div className="digital-timer-time-bg">
              <h1 className="digital-timer-time">{this.gettingTime()}</h1>
              <p className="digital-timer-time-status">{timeStatus}</p>
            </div>
          </div>
          <div>
            <div className="button-status-container">
              <div>
                <button
                  className="button buttons-container"
                  type="button"
                  onClick={this.startOrstop}
                >
                  <img src={buttonImage} alt={altIs} className="button-img" />
                  <p className="status-is">{buttonStatus}</p>
                </button>
              </div>
              <div>
                <button
                  className="button buttons-container"
                  type="button"
                  onClick={this.resetClock}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                    alt="reset icon"
                    className="button-img"
                  />
                  <p className="status-is">Reset</p>
                </button>
              </div>
            </div>
            <div className="time-limit-container">
              <p className="time-limit-heading">Set Timer limit</p>
              <div className="time-button-container">
                <button
                  className="symbol-button"
                  type="button"
                  onClick={this.decreaseMin}
                >
                  -
                </button>
                <p className="text-button" type="button">
                  {timerStarted === false ? time : '25'}
                </p>
                <button
                  className="symbol-button"
                  type="button"
                  onClick={this.increaseMin}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
