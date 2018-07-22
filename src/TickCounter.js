import React from "react"
import PT from "prop-types"

export default class TickCounter extends React.Component {
  /*

     This shows that you don't need to expose the incrementer function to
     the user, you can use something else to call it, in this case, we're
     using a timer that calls the incrementer function every 3
     seconds. Pretty cool

   */

  static propTypes = {
    c: PT.number.isRequired,
    inc: PT.func.isRequired,
    reset: PT.func.isRequired,
    step: PT.number
  }

  static defaultProps = {
    step: 7
  }

  tick = () => {
    setTimeout(() => {
      this.props.inc(this.props.step) // <<-- just another random event
      this.tick()
    }, 3000)
  }

  componentDidMount() {
    this.tick()
  }

  render() {
    const { c } = this.props
    return (
      <div>
        Current Tick: {c}{" "}
        <small
          onClick={this.props.reset}
          style={{ backgroundColor: `black`, color: `white` }}
        >
          [reset]
        </small>
      </div>
    )
  }
}
