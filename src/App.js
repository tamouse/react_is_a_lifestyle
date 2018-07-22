import React, { Component } from "react"
import "./App.css"
import Counter from "./components/Counter"
import AppCounter from "./AppCounter"
import TickCounter from "./TickCounter"

export default class App extends Component {
  state = {
    bumps: "",
    bumpChar: "*",
    tickerStep: 7,
    tickerStepInput: "7"
  }
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <Counter>
            {(c, inc, reset) => (
              <AppCounter currentValue={c} incrementer={inc} reset={reset} />
            )}
          </Counter>
        </div>
        <div style={{ paddingTop: 15 }}>
          {/* Here's another little counter, implementing a ticker */}
          Step:{" "}
          <input
            id="tickerStep"
            value={this.state.tickerStepInput}
            onChange={e => this.setState({ tickerStepInput: e.target.value })}
            onBlur={() =>
              this.setState({
                tickerStep: parseInt(this.state.tickerStepInput, 10)
              })
            }
          />
          <Counter initialValue={13}>
            {(c, inc, reset) => (
              <TickCounter
                c={c}
                inc={inc}
                reset={reset}
                step={this.state.tickerStep}
              />
            )}
          </Counter>
        </div>
        <div style={{ paddingTop: 45 }}>
          {/* Also, the children function doesn't have to call another component.
              This one is built in the same component. It's also using the counter
              in a slightly different way.
            */}
          <Counter onChange={bumps => this.setState({ bumps })}>
            {(c, inc) => (
              <span>
                <button onClick={() => inc()}>bump</button>
                {c > 0 ? (
                  <span>
                    {this.state.bumpChar.repeat(c)}{" "}
                    <button onClick={() => inc(-1)}>debump</button>
                  </span>
                ) : (
                  ""
                )}
              </span>
            )}
          </Counter>
          <input
            id="bumpCharInput"
            value={this.state.bumpChar}
            onChange={e => this.setState({ bumpChar: e.target.value })}
            style={{ width: 20, textAlign: `center` }}
          />
          <span> bumps so far: {this.state.bumps}</span>
        </div>
      </div>
    )
  }
}
