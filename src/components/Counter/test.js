import React from "react"
import { shallow } from "enzyme"
import Counter from "./index"

describe("test Counter component", () => {
  let MockChildren, wrapper

  beforeEach(() => {
    MockChildren = jest.fn()
    wrapper = shallow(<Counter children={MockChildren} />)
  })

  it("renders the Counter", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("calls the children", () => {
    expect(MockChildren).toHaveBeenCalled()
  })

  it("the children are called twice", () => {
    expect(MockChildren.mock.calls.length).toBe(2) // first mount, then lifecycle run
  })

  it("the first time, the counter is set to the ridiculous value from the state definition", () => {
    expect(MockChildren.mock.calls[0][0]).toBe(-9999) // this was the state value for counter
  })

  it("the second time, the counter is set to the default props value", () => {
    expect(MockChildren.mock.calls[1][0]).toBe(0) // after default props applied
  })

  describe("ensure calling the incrementer works", () => {
    let inc

    beforeEach(() => {
      // Let's catch the second prop passed in the call, which should be our incrementor, and run it
      inc = MockChildren.mock.calls[1][1]
    })

    it("Call it without a step", () => {
      inc()
      expect(MockChildren.mock.calls.length).toBe(3) // it should have been called again
      expect(MockChildren.mock.calls[2][0]).toBe(1) // incremented by 1
    })

    it("Call it with a step of 10", () => {
      inc(10)
      expect(MockChildren.mock.calls.length).toBe(3) // it should have been called again
      expect(MockChildren.mock.calls[2][0]).toBe(10) // incremented by 10
    })
  })

  it("ensure reset works", () => {
    const wrapper = shallow(
      <Counter initialValue={7} children={MockChildren} />
    )
    expect(argsFromLastMockCall(MockChildren)[0]).toBe(7)
    const inc = argsFromLastMockCall(MockChildren)[1]
    inc()
    inc()
    inc()
    expect(argsFromLastMockCall(MockChildren)[0]).toBe(10)
    wrapper.instance().reset()
    expect(argsFromLastMockCall(MockChildren)[0]).toBe(7)
  })

  describe("testing Counter onChange ", () => {
    it("calls the onChange callback every time the counter state changes", () => {
      const MockChildren = jest.fn()
      const MockOnChange = jest.fn()
      const wrapper = shallow(
        <Counter children={MockChildren} onChange={MockOnChange} />
      )
      expect(wrapper.instance().props.onChange).toEqual(MockOnChange)
      argsFromLastMockCall(MockChildren)[1]() // inc
      expect(argsFromLastMockCall(MockChildren)[0]).toBe(1)
      expect(MockOnChange).toHaveBeenCalled()
      expect(argsFromLastMockCall(MockOnChange)[0]).toBe(1)
    })
  })
})
