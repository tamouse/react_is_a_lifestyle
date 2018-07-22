import React from "react"
import PropTypes from "prop-types"
import "./AppCounter.css"

/*

   Discussion
   ==========

   When the currentValue prop is changed in the parent component, we want
   to do something to indicate that it changed. Testing the new property
   value against the previous property value, we can set a state variable
   to "true", and after state has been changed, call a timeout function
   in 500 milliseconds to return that this.state.tate variable to false.

   The display update is handled by adding a classname to the result
   container, just like was done in the jQuery example. It's added
   with a ternary expression that tests the boolean in state, adding
   the class when true, and nothing when false.

   The cool thing here is that all the control for display of the counter
   value, all the interaction provided, is handled within the display
   component, AppCounter, while dealing with the business of keeping
   track of the count and providing the mechanism to change it is handled
   in the Counter component. This lets the Counter functionality be used
   by other counting display components in the app.

 */

export default class AppCounter extends React.Component {
  // STATICS

  static propTypes = {
    currentValue: PropTypes.number.isRequired,
    incrementer: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }

  // INSTANCE VARIABLES

  state = {
    resultChanged: false
  }

  // INSTANCE METHODS

  handleResultUpdate = () => {
    this.setState({ resultChanged: true }, () => {
      setTimeout(() => {
        this.setState({ resultChanged: false })
      }, 500)
    })
  }

  // LIFECYCLE METHODS

  componentDidUpdate(prevProps, prevState) {
    if (this.props.currentValue !== prevProps.currentValue) {
      this.handleResultUpdate()
    }
  }

  render() {
    const { currentValue, incrementer, reset } = this.props
    return (
      <div className="counter">
        <div className={`result ${this.state.resultChanged ? "changing" : ""}`}>
          {currentValue}
        </div>
        <div>
          <button
            id="dbldecbtn"
            className="counter-button"
            onClick={() => incrementer(-10)}
          >
            --
          </button>{" "}
          <button
            id="decbtn"
            className="counter-button"
            onClick={() => incrementer(-1)}
          >
            -
          </button>{" "}
          <button id="resetbtn" className="counter-button" onClick={reset}>
            C
          </button>{" "}
          <button
            id="incbtn"
            className="counter-button"
            onClick={() => incrementer(+1)}
          >
            +
          </button>{" "}
          <button
            id="dblincbtn"
            className="counter-button"
            onClick={() => incrementer(+10)}
          >
            ++
          </button>
        </div>
      </div>
    )
  }
}
