import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {isStarted: false, count: 25, clockCount: 25 * 60}

  onClickReset = () => {
    clearInterval(this.timerID)
    this.setState({
      isStarted: false,
      count: 25,
      clockCount: 25 * 60,
    })
  }

  onDecrease = () => {
    const {isStarted} = this.state

    if (isStarted === false) {
      this.setState(prevState => ({
        count: prevState.count - 1,
        clockCount: prevState.clockCount - 60,
      }))
    }
  }

  onIncrease = () => {
    const {isStarted} = this.state
    if (isStarted === false) {
      this.setState(prevState => ({
        count: prevState.count + 1,
        clockCount: prevState.clockCount + 60,
      }))
    }
  }

  tick = () => {
    this.setState(prevState => ({clockCount: prevState.clockCount - 1}))
  }

  onChangeStatus = () => {
    const {isStarted} = this.state
    this.setState(prevState => ({isStarted: !prevState.isStarted}))

    if (isStarted === false) {
      this.timerID = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerID)
    }
  }

  onTimeEnd = time => {
    if (time === '00:00') {
      clearInterval(this.timerID)
    }
  }

  minutes = () => {
    const {clockCount} = this.state
    const valueMinute = Math.floor(clockCount / 60)

    if (valueMinute > 10) {
      return valueMinute
    }

    return `0${valueMinute}`
  }

  seconds = () => {
    const {clockCount} = this.state
    const valueSeconds = Math.floor(clockCount % 60)

    if (valueSeconds > 10) {
      return valueSeconds
    }

    return `0${valueSeconds}`
  }

  render() {
    const {isStarted, count} = this.state
    const time = `${this.minutes()}:${this.seconds()}`
    this.onTimeEnd(time)

    return (
      <div className="bg-container">
        <h1 className="Main-heading">Digital Timer</h1>
        <div className="sub-container">
          <div className="image-container">
            <div className="sub-container-time">
              <h1 className="time-heading">{time}</h1>
              <p className="time-status">{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="buttons-container">
            <div className="start-reset-button-container">
              <button
                className="pass-btn"
                onClick={this.onChangeStatus}
                type="button"
              >
                {isStarted ? (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                    className="play-image-resize"
                  />
                ) : (
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                    className="play-image-resize"
                  />
                )}
                <p className="play-start-para">
                  {isStarted ? 'Pause' : 'Start'}
                </p>
              </button>
              <button
                className="reset-btn"
                onClick={this.onClickReset}
                type="button"
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="play-image-resize"
                />
                <p className="play-start-para">Reset</p>
              </button>
            </div>
            <p className="set-timer-para">Set Timer limit</p>
            <div className="plus-minus-container">
              <button
                onClick={this.onIncrease}
                type="button"
                className="plus-button"
              >
                +
              </button>
              <p className="set-time-container">{count}</p>
              <button
                className="plus-button"
                type="button"
                onClick={this.onDecrease}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
