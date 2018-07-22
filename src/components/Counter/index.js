import React from "react"
import PropTypes from "prop-types"

/*

   Discussion
   ==========

   Counter is a React component class that contains the functionality for
   setting and incrementing a counter, and passing that information onto
   it's children.

   This provides a declartive functionality that can be used in many
   places in our app, while still allowing complete control of display.

   Usage
   -----

       <Counter initialValue={10}>
         {(counter, inc, reset) => {
           return(
             <div>
               <h1>{counter}</h1>
               <button onClick={inc}>add one</button>
               <button onClick={reset}>reset</button>
             </div>
           )
         }
       </Counter>

   Children Function Signature
   ---------------------------

   The function signature for the children render function is:

   function (counterValue, incrementerFunc, resetFunc) {}

   - counterValue [number] current value of counter state
   - incrementFunc [func] function to increment counter, the signuture is:

         function (step) {}

   - resetFunc [func] resets the counter to the initial value property

 */

export default class Counter extends React.Component {
  // ----------------------------------------
  // STATICS
  // ----------------------------------------

  static propTypes = {
    // Allow the caller to set an initial value for the counter
    initialValue: PropTypes.number,

    // Use children as a render prop, taking in the current state of the
    // counter, and the incrementing function.
    children: PropTypes.func.isRequired,

    onChange: PropTypes.func
  }

  static defaultProps = {
    initialValue: 0 /* Start at zero by default */
  }

  // ----------------------------------------
  // INSTANCE VARIABLES
  // ----------------------------------------

  state = {
    _myCounterNotYourCounter: -9999 /* funky long name to indicate that this
                                       state variable is not available to the
                                       outside. */

    /*
       Setting it here to some ridiculous value to show how defaultProps
       works. When the component is first loaded, it will passthis value to
       the children.

       When the lifecycle is complete, the default value has been set in the
       state, and the compoent is rendered again.

       (You don't have to do this in real life)

     */
  }

  // ----------------------------------------
  // INSTANCE METHODS
  // ----------------------------------------

  inc = (step = 1) => {
    // Incrementing function, with a default step of 1
    this.setState(
      state => ({
        _myCounterNotYourCounter: state._myCounterNotYourCounter + step
      }),
      this.afterUpdate
    )
  }

  reset = () => {
    this.setState(
      state => ({
        _myCounterNotYourCounter: this.props.initialValue
      }),
      this.afterUpdate
    )
  }

  afterUpdate = () => {
    // This was the weirdest thing. Apparently, I can't use the name `updater` for a function in a class.
    this.props.onChange &&
      this.props.onChange(this.state._myCounterNotYourCounter)
  }

  // ----------------------------------------
  // LIFECYCLE METHODS
  // ----------------------------------------

  componentDidMount() {
    // Stuff to do when the component is "mounted", i.e., placed into the ShadowDom
    this.setState(state => ({
      _myCounterNotYourCounter: this.props.initialValue
    }))
  }

  render() {
    // Since this is not a display component, there isn't much happening here.
    //
    // What's key, is that we pass the current state and our incrementing
    // function into the children render property function we passed in from
    // above in the component tree.

    const { children } = this.props
    return (
      <React.Fragment>
        {/* a Fragment doesn't add anything to the DOM */}
        {children(this.state._myCounterNotYourCounter, this.inc, this.reset)}
      </React.Fragment>
    )
  }
}
